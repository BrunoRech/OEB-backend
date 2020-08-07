const DisapproveActService = require("../services/DisapproveActService")

class DisapproveActsController {

  async update(req, res) {
    const { institutionId, actId } = req.params;
    const { message } = req.body;

    const approveAct = new DisapproveActService()
    const act = await approveAct.execute({ institutionId, actId, message })

    return res.json(act)
  }

}

module.exports = DisapproveActsController;
