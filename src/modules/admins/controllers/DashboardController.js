const ShowDashboardService = require('../services/ShowDashboardService');

class PasswordController {

  async show(req, res) {
    const showDashboard = new ShowDashboardService()
    const {
      allActs,
      approvedActs,
      disapprovedActs
    } = await showDashboard.execute()

    return res.json({
      allActs,
      approvedActs,
      disapprovedActs
    })
  }

}

module.exports = PasswordController;
