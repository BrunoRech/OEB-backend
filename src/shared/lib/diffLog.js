const empty = require('deep-empty-object');
const pick = require('lodash.pick');
const mongoose = require('mongoose');
const { assign } = require('power-assign');
const omit = require('omit-deep');

const objectHash = (obj, idx) => obj._id || obj.id || `$$index: ${idx}`;
const diffPatcher = require('jsondiffpatch').create({ objectHash });

const Log = require('../entities/Log');

let userId;

const defineUserId = id => {
  userId = id;
};

const isValidCb = cb => {
  return cb && typeof cb === 'function';
};

function checkRequired(opts, queryObject, updatedObject) {
  if (queryObject && !queryObject.options && !updatedObject) {
    return;
  }
  const { __user: user, __reason: reason } =
    (queryObject && queryObject.options) || updatedObject;
  if (
    opts.required &&
    ((opts.required.includes('user') && !user) ||
      (opts.required.includes('reason') && !reason))
  ) {
    return true;
  }
}

function saveDiffObject(currentObject, original, updated, opts, queryObject) {
  const { __reason: reason, __session: session } =
    (queryObject && queryObject.options) || currentObject;

  let diff = diffPatcher.diff(
    JSON.parse(JSON.stringify(original)),
    JSON.parse(JSON.stringify(updated))
  );

  if (opts.omit) {
    omit(diff, opts.omit, { cleanEmpty: true });
  }

  if (opts.pick) {
    diff = pick(diff, opts.pick);
  }

  if (!diff || !Object.keys(diff).length || empty.all(diff)) {
    return;
  }

  const collectionId = currentObject._id;
  const collectionName =
    currentObject.constructor.modelName || queryObject.model.modelName;

  return Log.findOne({ collectionId, collectionName })
    .sort('-version')
    .then(lastLog => {
      const log = new Log({
        collectionId,
        collectionName,
        diff,
        user: userId,
        reason,
        version: lastLog ? lastLog.version + 1 : 0
      });
      if (session) {
        return log.save({ session });
      }
      return log.save();
    });
}

const saveDiffLog = (queryObject, currentObject, opts) => {
  const update = JSON.parse(JSON.stringify(queryObject._update));
  const updateParams = Object.assign(
    ...Object.keys(update).map(function (key) {
      if (typeof update[key] === 'object') {
        return update[key];
      }
      return update;
    })
  );
  delete queryObject._update.$setOnInsert;
  const dbObject = pick(currentObject, Object.keys(updateParams));
  return saveDiffObject(
    currentObject,
    dbObject,
    assign(dbObject, queryObject._update),
    opts,
    queryObject
  );
};

const saveDiffs = (queryObject, opts) =>
  queryObject
    .find(queryObject._conditions)
    .lean(false)
    .cursor()
    .eachAsync(result => saveDiffLog(queryObject, result, opts));

const getVersion = (model, id, version, queryOpts, cb) => {
  if (typeof queryOpts === 'function') {
    cb = queryOpts;
    queryOpts = undefined;
  }

  return model
    .findById(id, null, queryOpts)
    .then(latest => {
      latest = latest || {};
      return Log.find(
        {
          collectionName: model.modelName,
          collectionId: id,
          version: { $gte: parseInt(version, 10) }
        },
        { diff: 1, version: 1 },
        { sort: '-version' }
      )
        .lean()
        .cursor()
        .eachAsync(history => {
          diffPatcher.unpatch(latest, history.diff);
        })
        .then(() => {
          if (isValidCb(cb)) return cb(null, latest);
          return latest;
        });
    })
    .catch(err => {
      if (isValidCb(cb)) return cb(err, null);
      throw err;
    });
};

const getDiffs = (modelName, id, opts, cb) => {
  opts = opts || {};
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  return Log.find({ collectionName: modelName, collectionId: id }, null, opts)
    .lean()
    .then(logs => {
      if (isValidCb(cb)) return cb(null, logs);
      return logs;
    })
    .catch(err => {
      if (isValidCb(cb)) return cb(err, null);
      throw err;
    });
};

const getLogs = (modelName, id, expandableFields, cb) => {
  expandableFields = expandableFields || [];
  if (typeof expandableFields === 'function') {
    cb = expandableFields;
    expandableFields = [];
  }

  const logs = [];

  return Log.find({ collectionName: modelName, collectionId: id })
    .lean()
    .cursor()
    .eachAsync(log => {
      const changedValues = [];
      const changedFields = [];
      for (const key in log.diff) {
        if (log.diff.hasOwnProperty(key)) {
          if (expandableFields.indexOf(key) > -1) {
            const oldValue = log.diff[key][0];
            const newValue = log.diff[key][1];
            changedValues.push(`${key} from ${oldValue} to ${newValue}`);
          } else {
            changedFields.push(key);
          }
        }
      }
      const comment = `modified ${changedFields
        .concat(changedValues)
        .join(', ')}`;
      logs.push({
        changedBy: log.user,
        changedAt: log.createdAt,
        updatedAt: log.updatedAt,
        reason: log.reason,
        comment
      });
    })
    .then(() => {
      if (isValidCb(cb)) return cb(null, logs);
      return logs;
    })
    .catch(err => {
      if (isValidCb(cb)) return cb(err, null);
      throw err;
    });
};

const plugin = function lastModifiedPlugin(schema, opts = {}) {
  if (opts.uri) {
    const mongoVersion = parseInt(mongoose.version);
    if (mongoVersion < 5) {
      mongoose.connect(opts.uri, { useMongoClient: true }).catch(e => {
        console.error('mongoose-diff-history connection error:', e);
      });
    } else {
      mongoose.connect(opts.uri, { useNewUrlParser: true }).catch(e => {
        console.error('mongoose-diff-history connection error:', e);
      });
    }
  }

  if (opts.omit && !Array.isArray(opts.omit)) {
    if (typeof opts.omit === 'string') {
      opts.omit = [opts.omit];
    } else {
      const errMsg = `opts.omit expects string or array, instead got '${typeof opts.omit}'`;
      throw new TypeError(errMsg);
    }
  }

  schema.pre('save', function (next) {
    if (this.isNew) return next();
    this.constructor
      .findOne({ _id: this._id })
      .then(original => {
        if (checkRequired(opts, {}, this)) {
          return;
        }
        return saveDiffObject(
          this,
          original,
          this.toObject({ depopulate: true }),
          opts
        );
      })
      .then(() => next())
      .catch(next);
  });

  schema.pre('findOneAndUpdate', function (next) {
    if (checkRequired(opts, this)) {
      return next();
    }
    saveDiffs(this, opts)
      .then(() => next())
      .catch(next);
  });

  schema.pre('update', function (next) {
    if (checkRequired(opts, this)) {
      return next();
    }
    saveDiffs(this, opts)
      .then(() => next())
      .catch(next);
  });

  schema.pre('updateOne', function (next) {
    if (checkRequired(opts, this)) {
      return next();
    }
    saveDiffs(this, opts)
      .then(() => next())
      .catch(next);
  });

  schema.pre('remove', function (next) {
    if (checkRequired(opts, this)) {
      return next();
    }
    saveDiffObject(this, this, {}, opts)
      .then(() => next())
      .catch(next);
  });
};

module.exports = {
  plugin,
  getVersion,
  getDiffs,
  getLogs,
  defineUserId
};
