# API - Instituição

### Objeto

```javascript
instituicao = {
    cnpjMantenedora: defaultCnpj,
    razaoSocialMantenedora: defaultRazaoSocial,
    cnpj: defaultCnpj,
    razaoSocial: defaultRazaoSocial,
    nomeFantasia: defaultNomeFantasia,
    cep: defaultCep,
    endereco: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    municipio: {
        type: Number,
        required: true
    },
    site: {
        type: String,
        minlength: 5,
        maxlength: 100
    },
    email: defaultEmail,
    telefoneFixo: defaultTelefone,
    telefoneCelular: defaultCelular,
    responsavelDados: defaultNomePessoa,
    telefoneResponsavel: defaultTelefone,
    secretario: defaultNomePessoa,
    telefoneSecretario: defaultTelefone,
    diretor: defaultNomePessoa,
    telefoneDiretor: defaultTelefone,
    dependenciaAdministrativa: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
    atos: [atoSchema]
}
```

### Atributos

* [defaultCnpj](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/validators/db/cnpj.js)
* [defaultRazaoSocial](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/validators/db/razaoSocial.js)
* [defaultNomeFantasia](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/validators/db/nomeFantasia.js)
* [defaultCep](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/validators/db/cep.js)
* [defaultEmail](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/validators/db/email.js)
* [defaultTelefone](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/validators/db/telefone.js)
* [defaultCelular](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/validators/db/celular.js)
* [defaultNomePessoa](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/validators/db/nomePessoa.js)
* [atoSchema](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/models/avaliacao/ato.js)

### Rotas

* GET - Obter todos<br/>
http://localhost:3000/api/instituicoes

* GET - Obter um<br/>
http://localhost:3000/api/instituicoes/:id

* POST<br/>
http://localhost:3000/api/instituicoes

* PUT<br/>
http://localhost:3000/api/instituicoes/:id
