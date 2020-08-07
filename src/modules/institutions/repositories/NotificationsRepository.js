const Notification = require("../entities/Notification")

class NotificationsRepository {

  async findById(id) {
    const notifications = await Notification.findById(id)
    return notifications
  }

  async findByInstitutionId(institutionId) {
    const notifications = await Notification.find().where({ instituicao: institutionId })
      .sort({ createdAt: 'desc' });
    return notifications
  }

  async create(data) {
    const notification = await Notification.create(data)
    return notification
  }

  async findByIdAndUpdate(id, data) {
    const notification = await Notification.findByIdAndUpdate(id, data, { new: true })
    return notification
  }

  async findByIdAndDelete(id) {
    await Notification.findByIdAndDelete(id);
  }

  async save(notification) {
    await notification.save()
  }

}

module.exports = new NotificationsRepository()
