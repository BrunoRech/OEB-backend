

module.exports = {
  root: 'value',
  key: '{{label}} ',
  any: {
    unknown: 'não é permitido',
    invalid: 'contém um valor inválido',
    empty: 'não pode estar vazio',
    required: 'é obrigatório',
    allowOnly: 'deve conter um dos seguintes valores: {{valids}}',
    default: 'lançou um erro ao executar o método padrão'
  },
  alternatives: {
    base: 'não corresponde às alternativas permitidas'
  },
  array: {
    base: 'deve ser uma lista',
    includes:
      'o valor na posição {{pos}} não corresponde à nenhum dos tipos permitidos',
    includesSingle:
      'valor único do "{{!key}}" não corresponde à nenhum dos tipos permitidos',
    includesOne: 'o valor na posição {{pos}} falhou porque {{reason}}',
    includesOneSingle: 'valor único do "{{!key}}" falhou porque {{reason}}',
    includesRequiredUnknowns:
      'não contém {{unknownMisses}} o(s) valor(es) obrigatório(s)',
    includesRequiredKnowns: 'não contém {{knownMisses}}',
    includesRequiredBoth:
      'não contém {{knownMisses}} e {{unknownMisses}} outro(s) valor(es) obrigatório(s)',
    excludes: 'o valor na posição {{pos}} contém um valor excluído',
    excludesSingle: 'valor único do "{{!key}}" contém um valor excluído',
    min: 'deve conter pelo menos {{limit}} Polo',
    max: 'deve conter {{limit}} ou menos itens',
    length: 'deve conter exatamente {{limit}} itens',
    ordered: 'o valor na posição {{pos}} falhou porque {{reason}}',
    orderedLength:
      'o valor na posição {{pos}} falhou porque o array pode ter no máximo {{limit}} itens',
    sparse: 'não deve ter valores vazios ou que representem um valor "falso"',
    unique: 'a posição {{pos}} contém um valor duplicado'
  },
  boolean: {
    base: 'deve ser um boleano'
  },
  binary: {
    base: 'deve ser um buffer ou uma string',
    min: 'deve ter no mínimo {{limit}} bytes',
    max: 'deve ter no máximo {{limit}} bytes',
    length: 'deve ter exatamente {{limit}} bytes'
  },
  date: {
    base:
      'deve ter um número de milissegundos ou uma sequência de datas válida',
    format: 'deve ser uma string com um destes formatos {{format}}',
    strict: 'está em um formato inválido',
    min: 'deve ser maior ou igual a "{{limit}}"',
    max: 'deve ser menor ou igual a "{{limit}}"',
    isoDate: 'deve ser um formato ISO 8601 válido',
    timestamp: {
      javascript: 'deve ser um timestamp válido',
      unix: 'deve ser timestamp de números ou segundos'
    },
    ref: 'referência "{{ref}}" não é uma data'
  },
  function: {
    base: 'deve ser uma função',
    arity: 'must have an arity of {{n}}',
    minArity: 'must have an arity greater or equal to {{n}}',
    maxArity: 'must have an arity lesser or equal to {{n}}',
    ref: 'must be a Joi reference'
  },
  lazy: {
    base: '!!schema error: lazy schema must be set',
    schema: '!!schema error: lazy schema function must return a schema'
  },
  object: {
    base: 'deve ser um objeto',
    child: '!!child "{{!child}}" fails because {{reason}}',
    min: 'must have at least {{limit}} children',
    max: 'must have less than or equal to {{limit}} children',
    length: 'must have {{limit}} children',
    allowUnknown: '!!"{{!child}}" is not allowed',
    with: 'missing required peer "{{peer}}"',
    without: 'conflict with forbidden peer "{{peer}}"',
    missing: 'must contain at least one of {{peers}}',
    xor: 'contains a conflict between exclusive peers {{peers}}',
    or: 'must contain at least one of {{peers}}',
    and: 'contains {{present}} without its required peers {{missing}}',
    nand: '!!"{{main}}" must not exist simultaneously with {{peers}}',
    assert:
      '!!"{{ref}}" validation failed because "{{ref}}" failed to {{message}}',
    rename: {
      multiple:
        'cannot rename child "{{from}}" because multiple renames are disabled and another key was already renamed to "{{to}}"',
      override:
        'cannot rename child "{{from}}" because override is disabled and target "{{to}}" exists'
    },
    type: 'must be an instance of "{{type}}"',
    schema: 'must be a Joi instance'
  },
  number: {
    base: 'deve ser um número',
    min: 'deve ser maior ou igual a {{limit}}',
    max: 'deve ser menor ou igual a {{limit}}',
    less: 'deve ser menor que {{limit}}',
    greater: 'deve ser maior que {{limit}}',
    float: 'deve ser um float ou double',
    integer: 'deve ser um inteiro',
    negative: 'deve ser um número negativo',
    positive: 'deve ser um número positivo',
    precision: 'must have no more than {{limit}} decimal places',
    ref: 'references "{{ref}}" which is not a number',
    multiple: 'deve ser um multiplo de {{multiple}}'
  },
  string: {
    base: 'deve ser uma string',
    min: 'deve ter pelo menos {{limit}} caracteres',
    max: 'deve ser menor ou igual a {{limit}} caracteres',
    length: 'deve conter exatamente {{limit}} characters',
    alphanum: 'must only contain alpha-numeric characters',
    token: 'must only contain alpha-numeric and underscore characters',
    regex: {
      base:
        'with value "{{!value}}" fails to match the required pattern: {{pattern}}',
      name: '{{name}}',
    },
    email: 'deve ser um email válido',
    uri: 'deve ser uma uri',
    uriCustomScheme:
      'deve ser uri with a scheme matching the {{scheme}} pattern',
    isoDate: 'deve ser ISO 8601 date',
    guid: 'deve ser GUID',
    hex: 'must only contain hexadecimal characters',
    hostname: 'deve ser hostname',
    lowercase: 'must only contain lowercase characters',
    uppercase: 'must only contain uppercase characters',
    trim: 'must not have leading or trailing whitespace',
    creditCard: 'must be a credit card',
    ref: 'references "{{ref}}" which is not a number',
    ip: 'deve ser ip address with a {{cidr}} CIDR',
    ipVersion:
      'deve ser ip address of one of the following versions {{version}} with a {{cidr}} CIDR'
  }
};
