const { Seeder } = require('mongoose-data-seed');

const Admin = require('../../modules/admins/entities/Admin');

const data = [
  {
    nome: 'Admin',
    cpf: '08125535942',
    email: 'admin@gmail',
    telefone: '47992100081',
    senha: '$2a$08$vgnsqb/XPAfcMGSabC9f4.n2smysOlD/wiIKDw5WavUPqIcYparUG'
  }
];

class AdminsSeeder extends Seeder {
  async shouldRun() {
    return Admin.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Admin.create(data);
  }
}

module.exports = AdminsSeeder;
