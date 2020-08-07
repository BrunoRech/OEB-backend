const ListApprovedActsService = require('../services/ListApprovedActsService');


class ComunitiesController {
  async list(req, res) {
    const { nome, municipio, endereco, curso } = req.query;

    const pageOptions = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10
    };

    const listActs = new ListApprovedActsService()
    const acts = await listActs.execute({ nome, municipio, endereco, curso }, pageOptions);

    res.json(acts);
  }
}

module.exports = ComunitiesController;
