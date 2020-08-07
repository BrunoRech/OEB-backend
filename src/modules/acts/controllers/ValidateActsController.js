const ListActsWithPaginationService = require("../services/ListActsWithPaginationService")

class ApproveActsController {

  async list(req, res) {
    const { nome, municipio, endereco, curso, actFilter } = req.query;

    const pageOptions = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10
    };

    const listActsWithPagination = new ListActsWithPaginationService()
    const acts = await listActsWithPagination.execute(
      {
        nome,
        municipio,
        endereco,
        curso,
        actFilter
      }, pageOptions)

    return res.json(acts)
  }


}

module.exports = ApproveActsController;
