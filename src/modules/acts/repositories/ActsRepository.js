const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const Act = require("../entities/Act")

class ActsRepository {

  async findByInstitutionId(institutionId) {
    const acts = await Act.aggregate([
      { $match: { instituicao: ObjectId(institutionId) } },
      {
        $lookup: {
          from: 'atopolos',
          let: { ato: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$ato', '$$ato'] }
              }
            },

            {
              $lookup: {
                from: 'polos',
                localField: 'polo',
                foreignField: '_id',
                as: 'polo'
              }
            },
            { $unwind: '$polo' }
          ],
          as: 'polosVinculados'
        }
      }
    ]);

    return acts
  }

  async findByIdWithPoles(id) {
    const act = await Act.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $lookup: {
          from: 'atopolos',
          let: { ato: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$ato', '$$ato'] }
              }
            },

            {
              $lookup: {
                from: 'polos',
                localField: 'polo',
                foreignField: '_id',
                as: 'polo'
              }
            },
            { $unwind: '$polo' }
          ],
          as: 'polosVinculados'
        }
      }
    ]);

    return act[0];
  }

  async findById(id) {
    const act = await Act.findById(id);
    return act
  }

  async findAllWithPagination(pageOptions) {
    const myAggregate = Act.aggregate([
      {
        $lookup: {
          from: 'atopolos',
          let: { ato: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$ato', '$$ato'] }
              }
            },

            {
              $lookup: {
                from: 'polos',
                localField: 'polo',
                foreignField: '_id',
                as: 'polo'
              }
            },
            { $unwind: '$polo' }
          ],
          as: 'polosVinculados'
        }
      },
      {
        $lookup: {
          from: 'institutions',
          localField: 'instituicao',
          foreignField: '_id',
          as: 'instituicao'
        }
      },
      { $unwind: '$instituicao' },
      { $unset: ['polosVinculados.ato', 'instituicao.senha'] }
    ]);

    const acts = await Act.aggregatePaginate(myAggregate, pageOptions);
    return acts
  }

  async countAllActs() {
    const actsCount = await Act.countDocuments()
    return actsCount
  }

  async countAllApprovedActs() {
    const approvedActs = await Act.countDocuments({
      $and: [{ isApproved: true }, { wasSeen: true }]
    });
    return approvedActs
  }

  async countAllDisapprovedActs() {
    const disapprovedActs = await Act.countDocuments({
      $and: [{ isApproved: false }, { wasSeen: true }]
    });
    return disapprovedActs
  }

  async create(data) {
    const act = await Act.create(data)
    return act
  }

  async findByIdAndUpdate(id, data) {
    const act = await Act.findByIdAndUpdate(id, data, { new: true })
    return act
  }

  async delete(id) {
    await Act.findByIdAndDelete(id)
  }

  async save(act) {
    await act.save()
  }

}

module.exports = new ActsRepository()
