# API - Avaliação

### Objeto

```javascript
avaliacao = {
    versao: {
        type: Number,
        min: 0,
        required: true
    },
    corpoAdministrativo: {
        type: Number,
        min: 0,
        required: true
    },
    corpoDocente: {
        type: Number,
        min: 0,
        required: true
    },
    corpoOutros: {
        type: Number,
        min: 0,
        required: true
    },
    participouEducasenso: {
        type: Boolean
    },
    comissao: {
        type: comissaoSchema
    },
    dadoEducacional: {
        type: dadoEducacionalSchema
    },
    infraestrutura: {
        type: infraestruturaSchema
    },
    dimensao: {
        type: dimensaoSchema
    },
    cnpjInstituicao: defaultCnpj
}
```

### Atributos

* [comissao](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/models/avaliacao/comissao.js)
* [dadoEducacional](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/models/avaliacao/dadoEducacional.js)
* [infraestrutura](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/models/avaliacao/infraestrutura.js)
* [dimensao](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/models/avaliacao/dimensao.js)
* [defaultCnpj](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/validators/db/cnpj.js)

### Rotas

* GET - Obter todos<br/>
http://localhost:3000/api/avaliacoes

* GET - Obter um<br/>
http://localhost:3000/api/avaliacoes/:id

* POST<br/>
http://localhost:3000/api/avaliacoes

* PUT<br/>
http://localhost:3000/api/avaliacoes/:id
