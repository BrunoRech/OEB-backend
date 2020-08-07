const mongoose = require('mongoose');

const Admin = require('./src/shared/seeders/admin.seeder');
const Criterion = require('./src/shared/seeders/criterion.seeder');
const DescriptionCriterion = require('./src/shared/seeders/descriptionCriterion.seeder');
const Dimension = require('./src/shared/seeders/dimension.seeder');
const Form = require('./src/shared/seeders/form.seeder');
const Indicator = require('./src/shared/seeders/indicator.seeder');
const Institution = require('./src/shared/seeders/institution.seeder');
const LegalRequirements = require('./src/shared/seeders/legalRequirements.seeder');

const mongoURL = 'mongodb://localhost/oeb';

const seedersList = {
  Admin,
  Institution,
  Form,
  Dimension,
  LegalRequirements,
  Indicator,
  DescriptionCriterion,
  Criterion
};

const connect = async () =>
  mongoose.connect(mongoURL, { useNewUrlParser: true });

const dropdb = async () => mongoose.connection.db.dropDatabase();
module.exports = { seedersList, connect, dropdb };
