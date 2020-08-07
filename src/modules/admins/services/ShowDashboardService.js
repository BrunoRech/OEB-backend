const ActsRepository = require("../../acts/repositories/ActsRepository")

class ShowDashboardService {

  async execute() {
    const allActs = await ActsRepository.countAllActs();
    const approvedActs = await ActsRepository.countAllApprovedActs()
    const disapprovedActs = await ActsRepository.countAllDisapprovedActs()

    return {
      allActs,
      approvedActs,
      disapprovedActs
    }
  }
}

module.exports = ShowDashboardService
