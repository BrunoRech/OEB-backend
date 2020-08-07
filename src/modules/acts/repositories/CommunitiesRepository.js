const Act = require("../entities/Act")

class CommunitiesRepository {

  async findAllActsWithPagination(pageOptions) {
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

}

module.exports = new CommunitiesRepository()
