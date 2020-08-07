module.exports = {
  validateName(institution, nome) {
    return !nome || nome === ''
      ? true
      : institution.nomeFantasia.toLowerCase().includes(nome.toLowerCase());
  },

  validateCity(institution, municipio) {
    return !municipio || municipio === ''
      ? true
      : institution.municipio.nome
        .toLowerCase()
        .includes(municipio.toLowerCase());
  },

  validateAddress(institution, endereco) {
    return !endereco || endereco === ''
      ? true
      : institution.endereco.toLowerCase().includes(endereco.toLowerCase());
  },

  validateCourse(act, curso) {
    if (act.etapasEnsino === 'Profissional') {
      return !curso || curso === ''
        ? true
        : act.curso.toLowerCase().includes(curso.toLowerCase());
    }
    return !curso || curso === ''
      ? true
      : act.etapasEnsino.toLowerCase().includes(curso.toLowerCase());
  },

  filterBySelection(act, selection) {
    switch (selection) {
      default:
        return true;
      case 'approved':
        return act.isApproved && act.wasSeen;
      case 'disapproved':
        return !act.isApproved && act.wasSeen;
      case 'notSeen':
        return !act.wasSeen;
    }
  }
};
