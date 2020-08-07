const InstitutionsRepository = require('../repositories/InstitutionsRepository');
const CreateInstitutionService = require('../services/CreateInstitutionService');
const ListInstitutionsService = require('../services/ListInstitutionsService');
const ShowInstitutionService = require('../services/ShowInstitutionService');
const UpdateInstitutionService = require('../services/UpdateInstitutionService');

class InstitutionController {
  async list(req, res) {
    const { nomeFantasia, email, endereco, municipio } = req.query;
    const pageOptions = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10
    };

    const listInstitutions = new ListInstitutionsService()
    const institutions = await listInstitutions.execute({
      nomeFantasia, email, endereco, municipio
    }, pageOptions)

    return res.json(institutions)
  }

  async show(req, res) {
    const { id } = req.params

    const showInstitution = new ShowInstitutionService()
    const institution = await showInstitution.execute(id)
    delete institution.senha

    return res.json(institution)
  }

  async create(req, res) {
    const { body } = req

    const createInstitution = new CreateInstitutionService()
    const institution = await createInstitution.execute(body)
    delete institution.senha

    return res.json(institution)
  }

  async update(req, res) {
    const { id } = req.params
    const { body } = req

    delete body.cnpj;
    delete body.cnpjMantenedora;

    const updateInstitution = new UpdateInstitutionService()
    const institution = await updateInstitution.execute(id, body)
    delete institution.senha

    return res.json(institution)
  }

  async delete(req, res) {
    const { id } = req.params;

    await InstitutionsRepository.findByIdAndDelete(id)

    return res.status(204).send();
  }


}

module.exports = InstitutionController;
