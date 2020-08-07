<h1 align="center">OEB - Backend</h1>

<p align="center">Servidor do Observatório de Educação Básica</p>

---

## Dependências

- [Node.js](https://nodejs.org/en/) 8.0.0 ou >
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)

## Instalação e execução

1. Faça um clone do repositório `https://gitlab.com/escritorio-modelo/observatorio-de-educacao-basica/backend.git`
2. Navegue até a pasta do projeto: `cd backend`.
3. Crie um arquivo chamado `.env` na raiz do projeto.
4. Rode `yarn` para instalar as dependências do projeto.
5. Rode `yarn dev` para iniciar o servidor em modo de desenvolvimento.

## Testes

Para rodar todos os testes execute o seguinte comando:

- `yarn test`

## Módulos

### Instituições

###### Institution

```javascript
{
  "cnpjMantenedora": string,
  "razaoSocialMantenedora": string,
  "email": string,
  "cnpj": string,
  "razaoSocial": string,
  "nomeFantasia": string,
  "cep": string,
  "endereco": string,
  "numero": number,
  "municipio": [
    "id": number,
    "nome":
  ],
  "site": string,
  "telefoneFixo": string,
  "telefoneCelular": string,
  "responsavelDados": string,
  "telefoneResponsavel": string,
  "emailResponsavel": string,
  "secretario": string,
  "telefoneSecretario": string,
  "emailSecretario": string,
  "diretor": string,
  "telefoneDiretor": string,
  "emailDiretor": string,
  "dependenciaAdministrativa": string,
  "senha": string,
  "ativa": boolean,
  "updatedAt": date,
  "createdAt": date,
}
```

###### Notification

```javascript
{
  "titulo": string,
  "tipo": number,
  "conteudo": string,
  "instituicao": string,
  "dadosEntidade": object,
  "lida": boolean,
  "createdAt": date
}
```
---

###### Visualiza notificações
```http
GET /notifications
```
###### Altera estado da notificação
```http
PUT /notifications/:id
```
- Altera o estado da notificação para lida

###### Deletar notificação
```http
DELETE /notifications/:id
```

### Administradores

###### Admin

```javascript
{
  "nome": string,
  "cpf": string,
  "email": string,
  "telefone": string,
  "senha": string,
  "createdAt": date
}
```

### Arquivos

###### File

```javascript
{
  "name": string,
  "size": number,
  "key": string,
  "field": string,
  "idFile": string,
  "createdAt": date
}
```

###### Manter arquivos

```http
GET /files/:id
```

```http
POST /files
```

```http
PUT /files/:id
```

### Atos Legais

###### Acts

```javascript
{
  "instituicao": string
  "etapasEnsino": string,
  "tipoMediacao": string,
  "curso": string,
  "tipoCurriculo": string,
  "parecer": string,
  "curriculo": string,
  "tipoAto": string,
  "numeroAto": string,
  "validadeCurriculo": date,
  "validadeTipoAto": date,
  "validadeParecer": date,
  "arquivoCurriculo": string,
  "arquivoParecer": string,
  "arquivoAto": string,
  "preparadoParaAvaliacao": boolean,
  "isApproved": boolean,
  "wasSeen": boolean,
  "createdAt": date
}
```

###### Pole

```javascript
{
  "instituicao": string,
  "emailResponsavel": string,
  "endereco": string,
  "numero": number,
  "municipio": [
    "id": number,
    "nome": string,
  ],
  "telefoneFixo": string,
  "createdAt": date
}
```

###### ActPole

```javascript
{
  "numeroAto": string,
  "arquivoAto": string,
  "validadeAto": date,
  "ato": string,
  "polo": string,
  "createdAt": date
}
```

---

###### Manter atos
```http
GET /acts
```
```http
GET /acts/:id
```
```http
POST /acts
```
```http
PUT /acts/:id
```

```javascript
{
  "etapasEnsino" : string,
  "tipoMediacao" : string,
  "curso" : string,
  "tipoCurriculo" : string,
  "parecer" : string,
  "tipoAto" : string,
  "numeroAto" : string,
  "curriculo" : string,
  "validadeTipoAto" : date,
  "validadeParecer" : date,
  "validadeCurriculo" :  date,
  "arquivoParecer" : string,
  "arquivoAto" : string,
  "arquivoCurriculo" : string
}
```

```http
DELETE /acts/:id
```


###### Visualizar Atos para validação

```http
GET /validate-act
```

###### Aprovar Ato

```http
PUT /validate-act/:institutionId/approve/:actId
```

###### Reprovar Ato

```http
PUT /validate-act/:institutionId/disapprove/:actId
```
```javascript
{
  "message": string
}
```
### Avaliação Institucional

###### Form

```javascript
{
  "titulo": string,
  "anoAplicacao": string,
  "situacao": string,
  "dataLimite": date,
  "createdAt": date
}
```

###### Dimension

```javascript
{
  "titulo": string,
  "descricao": string,
  "formulario": string,
  "createdAt": date
}
```

###### Indicator

```javascript
{
  "titulo": string,
  "dimensao": string,
  "createdAt": date
}
```

###### Criterion

```javascript
{
  "titulo": string,
  "indicador": string,
  "createdAt": date
}
```

###### LegalRequirements

```javascript
{
  "titulo": string,
  "formulario": string,
  "createdAt": date
}

```

###### CriterionDescriptor

```javascript
{
  "conceito": number,
  "descricao": string,
  "valorMinimo": number,
  "valorMaximo": number,
  "indicador": string,
  "createdAt": date
}
```

###### FormInstitution

```javascript
{
  "formulario": string,
  "instituicao": string,
  "conceitoGlobal": number,
  "relatoFinal": string,
  "respondido": bool,
  "requisitosLegais": [
    {
      "atende": number,
      "requisitoExistente": string,
    },
  ],
  "dimensoes": [
    {
      "relatoGlobal": string,
      "situacao": number,
      "conceitoFinal": number,
      "criteriosAtendidos": number,
      "criteriosAvaliados": number,
      "indicadoresAvaliados": number,
      "criteriosTotais": number,
      "indicadoresTotais": number,
      "dimensaoExistente": string,
      "indicadores": [
        {
          "criteriosAtendidos": string,
          "conceito": number,
          "indicadorExistente": string,
          "respostasCriterios": [
            {
              "criterioExistente": string,
              "atende": number
            },
          ]
        }
      ]
    }
  ],
}
```
---

###### Manter Formulários

```http
GET /forms
```

```http
GET /forms/:id
```

```http
POST /forms
```

```javascript
{
  "titulo" : string,
  "anoAplicacao" : string,
  "dataLimite": date
}
```

```http
PUT /forms/:id
```

```javascript
{
  "titulo" : string,
  "anoAplicacao" : string,
  "dataLimite": date
}
```

```http
DELETE /forms/:id
```

###### Manter Dimensões

```http
GET /forms/:formId/dimensions
```

```http
GET /forms/:formId/dimensions/:id
```

```http
POST /forms/:formId/dimensions
```

```javascript
{
  "titulo" : string,
  "descricao" : string
}
```

```http
PUT /forms/:formId/dimensions/:id
```

```javascript
{
  "titulo" : string,
  "descricao" : string
}
```

```http
DELETE /forms/:formId/dimensions/:id
```

###### Manter Requisitos Legais

```http
GET /forms/:formId/legal-requirements
```

```http
GET /forms/:formId/legal-requirements/:id
```

```http
POST /forms/:formId/legal-requirements
```

```javascript
{
  "titulo" : string
}
```

```http
PUT /forms/:formId/legal-requirements/:id
```

```javascript
{
  "titulo" : string
}
```

```http
DELETE /forms/:formId/legal-requirements/:id
```

###### Manter Indicadores

```http
GET /dimensions/:dimensionId/indicators
```

```http
GET /dimensions/:dimensionId/indicators/:id
```

```http
POST /dimensions/:dimensionId/indicators
```

```javascript
{
  "titulo" : string
}
```

```http
PUT /dimensions/:dimensionId/indicators/:id
```

```javascript
{
  "titulo" : string
}
```

```http
DELETE /dimensions/:dimensionId/indicators/:id
```

###### Manter Descritores

```http
GET /indicators/:indicatorId/criteria-descriptors
```

```http
GET /indicators/:indicatorId/criteria-descriptors/:id
```

```http
POST /indicators/:indicatorId/criteria-descriptors
```

```javascript
{
  "conceito": number,
  "descricao": string,
  "valorMinimo": number,
  "valorMaximo": number
}
```

```http
PUT /indicators/:indicatorId/criteria-descriptors/:id
```

```javascript
{
  "conceito": number,
  "descricao": string,
  "valorMinimo": number,
  "valorMaximo": number
}
```

```http
DELETE /indicators/:indicatorId/criteria-descriptors/:id
```

###### Manter Critrérios

```http
GET /indicators/:indicatorId/criteria
```

```http
GET /indicators/:indicatorId/criteria/:id
```

```http
POST /indicators/:indicatorId/criteria
```

```javascript
{
  "titulo": number
}
```

```http
PUT /indicators/:indicatorId/criteria/:id
```

```javascript
{
  "titulo": number
}
```

```http
DELETE /indicators/:indicatorId/criteria/:id
```

###### Alterar a situação do formulário

- Estados possíveis
  - Aberto - "1"
  - Em aplicação - "2"
  - Cancelada - "3"

```http
 PUT /change-form-state/:formId
```

```javascript
{
  "situacao": string
}
```

###### Clonar Formulário

```http
POST /clone-form/:formId
```

```javascript
{
  "titulo" : string,
  "anoAplicacao" : string,
  "dataLimite": date
}
```

###### Visualizar formulários já respondidos

```http
GET /form-admin
```

###### Visualizar formulários ativos da instituição

```http
GET /institutions-self-assessment
```

###### Responder formulário

```http
GET /self-assessment-response
```

- Retorna uma lista de todos os formulários com suas devidas respotas. (Caso a Instituição não tenha respondido nenhum critério, a e mesma ira retornar uma lista vazia).

```http
GET /self-assessment-response/:formId
```

```http
POST /self-assessment-response
```

```javascript
{
  "criterios" : [
    {
      "criterio": string",
      "atende": number
    }
  ]
}
```

###### Responder Requisito Legal

```http
POST /legal-requirements-response/:formId
```

```javascript
{
  "requisitos" : [
    {
      "requisito": string,
      "atende": number
    }
  ]
}
```

###### Definir Relato Global da Dimensão

```http
POST /evaluate-dimension/:dimensionId
```

```javascript
{
  "relatoGlobal" : string
}
```

###### Enviar formulário para o Conselho

```http
POST /send-self-assessment/:formId
```

```javascript
{
  "relatoFinal" : string
}
```
