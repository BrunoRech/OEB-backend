const NotificationsRepository = require('../repositories/NotificationsRepository');
const UpdateNotificationService = require('../services/UpdateNotificationService');

class InstitutionController {
  async list(req, res) {
    const { userId: institutionId } = req

    const notifications = await NotificationsRepository.findByInstitutionId(
      institutionId
    )

    return res.json(notifications)
  }

  async update(req, res) {
    const { id } = req.params

    const updateNotification = new UpdateNotificationService()
    const notification = await updateNotification.execute(id)

    return res.json(notification)
  }

  async delete(req, res) {
    const { id } = req.params

    await NotificationsRepository.findByIdAndDelete(id);

    return res.status(204).send();

  }

}

module.exports = InstitutionController;
