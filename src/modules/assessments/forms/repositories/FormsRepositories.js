const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const Form = require("../entities/Form")

class FormsRepositories {

  async findAll() {
    const forms = await Form.find()
    return forms
  }

  async findById(id) {
    const form = await Form.findById(id);
    return form
  }

  async findAllWithSituationTwo() {
    const forms = await Form.aggregate([
      { $match: { situacao: '2' } },
      {
        $lookup: {
          from: 'dimensions',
          let: { formulario: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$formulario', '$$formulario'] } } },
            {
              $lookup: {
                from: 'indicators',
                let: { dimensao: '$_id' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$dimensao', '$$dimensao'] } } },
                  {
                    $lookup: {
                      from: 'criterions',
                      let: { indicador: '$_id' },
                      pipeline: [
                        {
                          $match: {
                            $expr: { $eq: ['$indicador', '$$indicador'] }
                          }
                        }
                      ],
                      as: 'criterios'
                    }
                  }
                ],
                as: 'indicadores'
              }
            }
          ],
          as: 'dimensoes'
        }
      },
      {
        $unset: [
          'dimensoes.formulario',
          'dimensoes.indicadores.dimensao',
          'dimensoes.indicadores.criterios.indicador'
        ]
      }
    ]);
    return forms
  }

  async findAddregateById(id) {
    const form = await Form.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $lookup: {
          from: 'dimensions',
          let: { formulario: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$formulario', '$$formulario'] } } },
            {
              $lookup: {
                from: 'indicators',
                let: { dimensao: '$_id' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$dimensao', '$$dimensao'] } } },
                  {
                    $lookup: {
                      from: 'criterions',
                      let: { indicador: '$_id' },
                      pipeline: [
                        {
                          $match: {
                            $expr: { $eq: ['$indicador', '$$indicador'] }
                          }
                        }
                      ],
                      as: 'criterios'
                    }
                  },
                  {
                    $lookup: {
                      from: 'descriptioncriterions',
                      let: { indicador: '$_id' },
                      pipeline: [
                        {
                          $match: {
                            $expr: { $eq: ['$indicador', '$$indicador'] }
                          }
                        }
                      ],
                      as: 'descritores'
                    }
                  }
                ],
                as: 'indicadores'
              }
            }
          ],
          as: 'dimensoes'
        }
      }
    ]);
    return form[0];
  }

  async create(data) {
    const form = await Form.create(data)
    return form
  }

  async findByIdAndUpdate(id, data) {
    const form = await Form.findByIdAndUpdate(id, data, { new: true })
    return form
  }

  async findByIdAndDelete(id) {
    await Form.findByIdAndDelete(id)
  }

  async delete(id) {
    await Form.findByIdAndDelete(id)
  }

  async save(form) {
    await form.save()
  }

}

module.exports = new FormsRepositories()
