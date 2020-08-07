const NotificationsRepository = require("../repositories/NotificationsRepository")

class UpdateNotificationService {

  async execute(id) {
    const notification = await NotificationsRepository.findById(id)

    notification.lida = true;

    await NotificationsRepository.save(notification)

    return notification
  }
}

module.exports = UpdateNotificationService
