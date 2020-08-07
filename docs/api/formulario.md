# API - Formulário

### Objeto

```javascript
formulario = {
    versao: {
        type: Number,
        required: true
    },
    dimensoes: {
        type: [dimensaoSchema]
    }
}
```

### Atributos

* [dimensoes](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/models/formulario/dimensao.js)
    * [indicador](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/models/formulario/indicador.js)
        * [conceito](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/models/formulario/conceito.js)
        * [criterios](https://github.com/VilsonJrCorrea/backendObservatorio/blob/master/src/models/formulario/criterio.js)

### Rotas

* GET - Obter todos<br/>
http://localhost:3000/api/formularios

* GET - Obter um<br/>
http://localhost:3000/api/formularios/:id

* POST<br/>
http://localhost:3000/api/formularios

* PUT<br/>
http://localhost:3000/api/formularios/:id
