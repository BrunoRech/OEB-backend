const ApproveActService = require("../services/ApproveActService")

class ApproveActsController {

  async update(req, res) {
    const { institutionId, actId } = req.params;

    const approveAct = new ApproveActService()
    const act = await approveAct.execute({ institutionId, actId })

    return res.json(act)
  }

}

module.exports = ApproveActsController;
