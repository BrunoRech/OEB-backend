const EvaluateDimensionsService = require("../services/EvaluateDimensionsService")

class EvaluateDimensionsController {

  async create(req, res) {
    const { userId: institutionId } = req;
    const { dimensionId } = req.params
    const { relatoGlobal } = req.body


    const evaluateDimensions = new EvaluateDimensionsService()
    const evaluateResponse = await evaluateDimensions.execute(institutionId, dimensionId, {
      relatoGlobal
    });

    return res.json(evaluateResponse);
  }

}

module.exports = EvaluateDimensionsController
