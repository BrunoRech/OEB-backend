const InstitutionsRepository = require("../../../institutions/repositories/InstitutionsRepository")
const NotificationsRepository = require("../../../institutions/repositories/NotificationsRepository")
const FormInstitution = require("../entities/FormInstitution")

class NotifyAllInstitutionService {
  async execute({ form, title }) {
    const institutions = await InstitutionsRepository.findAll();
    const institutionsPromise = institutions.map(async institution => {
      await NotificationsRepository.create({
        titulo: title,
        tipo: 2,
        instituicao: institution._id,
        dadosEntidade: form
      });

      await FormInstitution.create({
        formulario: form._id,
        instituicao: institution._id
      });
    });

    await Promise.all(institutionsPromise);

  }
}

module.exports = NotifyAllInstitutionService
