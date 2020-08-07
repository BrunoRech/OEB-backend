const FormsRepositories = require("../repositories/FormsRepositories")

class FormsController {
  async list(req, res) {
    const forms = await FormsRepositories.findAll()
    return res.json(forms);
  }

  async show(req, res) {
    const { id } = req.params;

    const form = await FormsRepositories.findAddregateById(id);

    return res.json(form);
  }

  async create(req, res) {
    const { body } = req;

    const form = await FormsRepositories.create(body);

    return res.json(form);
  }

  async update(req, res) {
    const { id } = req.params;
    const { titulo } = req.body;

    const form = await FormsRepositories.findByIdAndUpdate(id, { titulo });

    return res.json(form);
  }

  async delete(req, res) {
    const { id } = req.params;

    await FormsRepositories.findByIdAndDelete(id);

    return res.status(204).send();
  }
}

module.exports = FormsController;
