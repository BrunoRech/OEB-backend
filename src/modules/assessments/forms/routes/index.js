const { Router } = require('express');

const assessmentResponseRoutes = require("./assessmentResponse.routes")
const changeFormStateRoutes = require("./changeFormState.routes")
const cloneFormRoutes = require("./cloneForm.routes")
const evaluateFormRoutes = require("./evaluateForm.routes")
const formsRoutes = require("./forms.routes")
const sendAssessmentRoutes = require("./sendAssessment.routes")

const routes = new Router();

routes.use('/forms', formsRoutes)
routes.use('/clone-form', cloneFormRoutes)
routes.use('/change-form-state', changeFormStateRoutes)
routes.use('/evaluate-form', evaluateFormRoutes)
routes.use('/send-self-assessment', sendAssessmentRoutes)
routes.use('/self-assessment-response', assessmentResponseRoutes)

module.exports = routes;
