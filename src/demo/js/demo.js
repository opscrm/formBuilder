function titleCase(str) {
  const lowers = [
    'a',
    'an',
    'and',
    'as',
    'at',
    'but',
    'by',
    'for',
    'for',
    'from',
    'in',
    'into',
    'near',
    'nor',
    'of',
    'on',
    'onto',
    'or',
    'the',
    'to',
    'with',
  ].map(lower => `\\s${lower}\\s`)
  const regex = new RegExp(`(?!${lowers.join('|')})\\w\\S*`, 'g')
  return `${str}`.replace(
    regex,
    txt => txt.charAt(0).toUpperCase() + txt.slice(1).replace(/[A-Z]/g, word => ` ${word}`),
  )
}

const insertStyle = srcs => {
  srcs = Array.isArray(srcs) ? srcs : [srcs]
  srcs.forEach(({ src, id }) => {
    if (id && document.getElementById(id)) {
      return
    }

    const link = document.createElement('link')
    link.href = src
    link.rel = 'stylesheet'
    if (id) {
      link.id = id
    }
    document.head.insertBefore(link, document.head.firstChild)
  })
}

const removeStyle = id => {
  const elem = document.getElementById(id)
  if (elem && elem.parentElement) {
    elem.parentElement.removeChild(elem)
  }
}

const setCurrentFieldIdValues = value => {
  const currentFieldIds = document.querySelectorAll('.current-field-id')
  currentFieldIds.forEach(field => {
    field.value = value
  })
}

const builderActions = {
  showData: () => $('.build-wrap').formBuilder('showData'),
  clearFields: () => $('.build-wrap').formBuilder('clearFields'),
  getData: () => {
    console.log($('.build-wrap').formBuilder('getData'))
  },
  setData: () => {
    const fb = $('.build-wrap').formBuilder
    const dataInput = fb('markup', 'textarea', fb('getData', 'json', true), {
      id: 'setData-value',
      rows: 30,
      style: 'width: 100%',
    })
    const click = () => $('.build-wrap').formBuilder('setData', dataInput.value)
    const setDataButton = fb('markup', 'button', 'Set Data', { events: { click } })
    const dialogContents = fb('markup', 'div', [dataInput, setDataButton])
    fb('showDialog', dialogContents, null, 'data-dialog')
  },
  save: () => {
    $('.build-wrap').formBuilder('save')
  },
  addField: () => {
    const field = {
      type: 'text',
      class: 'form-control',
      label: 'Text Field added at: ' + new Date().getTime(),
    }
    $('.build-wrap').formBuilder('addField', field)
  },
  removeField: () => {
    const currentFieldId = $('.build-wrap').formBuilder('getCurrentFieldId')
    setCurrentFieldIdValues('')
    $('.build-wrap').formBuilder('removeField', currentFieldId)
  },
  getXML: () => {
    alert($('.build-wrap').formBuilder('getData', 'xml'))
  },
  getJSON: () => {
    alert($('.build-wrap').formBuilder('getData', 'json', true))
  },
  getJS: () => {
    alert('check console')
    console.log($('.build-wrap').formBuilder('getData'))
  },
  toggleEdit: () => {
    const currentFieldId = $('.build-wrap').formBuilder('getCurrentFieldId')
    $('.build-wrap').formBuilder('toggleFieldEdit', currentFieldId)
  },
  toggleAllEdit: () => $('.build-wrap').formBuilder('toggleAllFieldEdit'),
  getFieldTypes: () => console.log($('.build-wrap').formBuilder('getFieldTypes')),
}

const defaultFormData =
  '[{"type":"autocomplete","label":"Autocomplete","className":"form-control","name":"autocomplete-1526094918549","requireValidOption":true,"values":[{"label":"Option 1","value":"option-1"},{"label":"Option 2","value":"option-2"},{"label":"Option 3","value":"option-3"}],"userData":["option-1"]},{"type":"checkbox-group","label":"Checkbox Group","name":"checkbox-group-1526095813035","other":true,"values":[{"label":"Option 1","value":"option-1"},{"label":"Option 2","value":"option-2"}],"userData":["option-1","Bilbo \\"baggins\\""]},{"type":"text","label":"Color Field","name":"text-1526099104236","subtype":"color","userData":["#00ff00"]},{"type":"text","label":"Text Field","name":"text-1526099104236","subtype":"tel","userData":["123-456-7890"]},{"type":"date","label":"Date Field","className":"form-control","name":"date-1526096579821","userData":["2018-01-01"]},{"type":"number","label":"Number","className":"form-control","name":"number-1526099204594","min":"1","max":"3","step":".2","userData":["1.1"]},{"type":"textarea","label":"Text Area","className":"form-control","name":"textarea-1526099273610","subtype":"textarea","userData":["Tennessee Welcomes You!"]},{"type":"textarea","subtype":"summernote","label":"Summernote","className":"form-control","name":"textarea-1526099273610","userData":["&lt;p&gt;&lt;span style=&quot;color: #339966;&quot;&gt;It&#39;s a great place&lt;/span&gt;&lt;/p&gt;"]}]'

const renderActions = {
  loadUserForm: () => {
    const formRenderOptions = {
      controlConfig: {
        'textarea.summernote': {
          dialogsInBody: true,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture', 'table']],
            ['view', ['codeview']],
          ],
        },
      },
      formData: defaultFormData,
    }
    $('.render-wrap').formRender(formRenderOptions)
  },
  clearUserForm: () => {
    $('.render-wrap').formRender('clear')
  },
  renderUserForm: () => {
    const formData =
      '[{"type":"text","label":"Color picker","name":"text-1526099104236","subtype":"color","userData":["#00ff00"]},{"type":"text","label":"Text Field","name":"text-1526099104236","subtype":"tel","userData":["123-456-7890"]},{"type":"date","label":"Date Field","className":"form-control","name":"date-1526096579821","userData":["2018-01-01"]},{"type":"number","label":"Number","className":"form-control","name":"number-1526099204594","min":"1","max":"3","step":".2","userData":["1.1"]},{"type":"textarea","label":"Text Area","className":"form-control","name":"textarea-1526099273610","subtype":"textarea","userData":["Tennessee Welcomes You!"]},{"type":"textarea","subtype":"summernote","label":"Summernote","className":"form-control","name":"textarea-1526099273610","userData":["&lt;p&gt;&lt;span style=&quot;color: #339966;&quot;&gt;It&#39;s a great place&lt;/span&gt;&lt;/p&gt;"]}]'
    $('.render-wrap').formRender('render', formData)
  },
  getHTML: () => {
    console.log($('.render-wrap').formRender('html'))
  },
  setData: () => {
    $('.render-wrap').formRender('setData', defaultFormData)
  },
  render: () => {
    $('.render-wrap').formRender('render')
  },
  showUserData: () => {
    alert(JSON.stringify($('.render-wrap').formRender('userData')))
  },
}

const demoActionsApi = {
  testSubmit: () => {
    const form = document.querySelector('.render-wrap')
    const formData = new FormData(form)
    console.log('Can submit: ', form.checkValidity())
    console.log('FormData:')
    for (const [key, val] of formData.entries()) {
      console.log(`${key}: ${val}`)
    }
  },
  resetDemo: () => {
    window.sessionStorage.removeItem('formData')
    location.reload()
  },
}

const processCell = cellData => {
  let cell = cellData
  if (typeof cell === 'string') {
    cell = { attrs: { scope: 'col' }, content: titleCase(cellData) }
  }

  if (typeof cell.content === 'string') {
    cell.content = document.createTextNode(cell.content)
  }

  return { attrs: {}, ...cell }
}

const generateTr = (columns, isHeader = false) =>
  columns.reduce((acc, cur) => {
    const column = processCell(cur)
    const type = isHeader ? 'th' : 'td'
    const td = document.createElement(type)
    td.appendChild(column.content)
    Object.entries(column.attrs).forEach(([key, val]) => {
      td.setAttribute(key, val)
    })
    acc.appendChild(td)
    return acc
  }, document.createElement('tr'))

const apiBtns = {
  ...builderActions,
  ...renderActions,
  ...demoActionsApi,
}

const generateActionTable = (actions, columns) => {
  const fragment = document.createDocumentFragment()
  const thead = document.createElement('thead')
  thead.appendChild(generateTr(columns, true))
  const actionApiRows = Object.entries(actions).reduce((acc, [key, content]) => {
    const description = { content }
    const code = document.createElement('code')
    code.appendChild(document.createTextNode(key))
    const action = { content: code }
    let actionDemoTrigger = document.getElementById(key)
    if (!actionDemoTrigger && apiBtns[key]) {
      actionDemoTrigger = document.createElement('button')
      actionDemoTrigger.id = key
      actionDemoTrigger.textContent = titleCase(key)
      actionDemoTrigger.addEventListener('click', e => apiBtns[key](e))
    } else if (actionDemoTrigger) {
      const trigger = actionDemoTrigger.querySelector('.trigger')
      if (trigger && apiBtns[key]) {
        trigger.addEventListener('click', e => apiBtns[key](e))
      }
    }
    const demo = { content: actionDemoTrigger }
    acc.appendChild(generateTr([action, description, demo]))
    return acc
  }, document.createDocumentFragment())
  const tbody = document.createElement('tbody')
  tbody.appendChild(actionApiRows)

  fragment.appendChild(thead)
  fragment.appendChild(tbody)
  return fragment
}

const localeSessionKey = 'formBuilder-locale'
const defaultLocale = 'en-US'

const demoTranslations = {
  [defaultLocale]: {
    builderStudio: 'Builder Studio',
    livePreview: 'Live Form Preview',
    render: 'Render',
    edit: 'Edit',
    builderActions: 'Builder Actions',
    renderActions: 'Render Actions',
    footerNote: 'Switch languages, toggle grid mode, and validate output instantly.',
    cta: 'Add fields in Builder Studio, then render and test them here.',
    addOption: 'Add Option +',
    allFieldsRemoved: 'All fields were removed.',
    clear: 'Clear',
    close: 'Close',
    label: 'Label',
    name: 'Name',
    number: 'Number',
    text: 'Text',
    textarea: 'Text Area',
    checkbox: 'Checkbox',
    checkboxGroup: 'Checkbox Group',
    select: 'Select',
    button: 'Button',
    dateField: 'Date Field',
    getStarted: 'Drag a field from the right to this area',
    cannotBeEmpty: 'This field cannot be empty',
  },
  'es-ES': {
    builderStudio: 'Estudio del constructor',
    livePreview: 'Vista previa en vivo',
    render: 'Renderizar',
    edit: 'Editar',
    builderActions: 'Acciones del constructor',
    renderActions: 'Acciones de renderizado',
    footerNote: 'Cambia de idioma, activa el modo de cuadrícula y valida la salida al instante.',
    cta: 'Agrega campos en el estudio del constructor y luego renderízalos y pruébalos aquí.',
    addOption: 'Agregar opción +',
    clear: 'Limpiar',
    close: 'Cerrar',
    label: 'Etiqueta',
    name: 'Nombre',
    number: 'Número',
    text: 'Texto',
    textarea: 'Área de texto',
    checkbox: 'Casilla',
    checkboxGroup: 'Grupo de casillas',
    select: 'Seleccionar',
    button: 'Botón',
    dateField: 'Campo de fecha',
    getStarted: 'Arrastra un campo desde la derecha a esta área',
    cannotBeEmpty: 'Este campo no puede estar vacío',
  },
  'fr-FR': {
    builderStudio: 'Studio de construction',
    livePreview: 'Aperçu en direct',
    render: 'Rendre',
    edit: 'Modifier',
    builderActions: 'Actions du constructeur',
    renderActions: 'Actions de rendu',
    footerNote: 'Changez de langue, activez le mode grille et validez la sortie instantanément.',
    cta: 'Ajoutez des champs dans le studio de construction, puis rendez et testez-les ici.',
    addOption: 'Ajouter une option +',
    clear: 'Effacer',
    close: 'Fermer',
    label: 'Étiquette',
    name: 'Nom',
    number: 'Nombre',
    text: 'Texte',
    textarea: 'Zone de texte',
    checkbox: 'Case à cocher',
    checkboxGroup: 'Groupe de cases',
    select: 'Sélectionner',
    button: 'Bouton',
    dateField: 'Champ de date',
    getStarted: 'Faites glisser un champ de la droite vers cette zone',
    cannotBeEmpty: 'Ce champ ne peut pas être vide',
  },
  'de-DE': {
    builderStudio: 'Builder Studio',
    livePreview: 'Live-Vorschau',
    render: 'Rendern',
    edit: 'Bearbeiten',
    builderActions: 'Builder-Aktionen',
    renderActions: 'Render-Aktionen',
    footerNote: 'Wechseln Sie die Sprache, schalten Sie den Rastermodus ein und validieren Sie die Ausgabe sofort.',
    cta: 'Fügen Sie Felder im Builder Studio hinzu, rendern Sie sie dann hier und testen Sie sie.',
    addOption: 'Option hinzufügen +',
    clear: 'Leeren',
    close: 'Schließen',
    label: 'Beschriftung',
    name: 'Name',
    number: 'Nummer',
    text: 'Text',
    textarea: 'Textbereich',
    checkbox: 'Kontrollkästchen',
    checkboxGroup: 'Kontrollkästchen-Gruppe',
    select: 'Auswählen',
    button: 'Schaltfläche',
    dateField: 'Datumsfeld',
    getStarted: 'Ziehen Sie ein Feld von rechts in diesen Bereich',
    cannotBeEmpty: 'Dieses Feld darf nicht leer sein',
  },
  'pt-BR': {
    builderStudio: 'Estúdio do construtor',
    livePreview: 'Pré-visualização ao vivo',
    render: 'Renderizar',
    edit: 'Editar',
    builderActions: 'Ações do construtor',
    renderActions: 'Ações de renderização',
    footerNote: 'Altere o idioma, ative o modo de grade e valide a saída instantaneamente.',
    cta: 'Adicione campos no estúdio do construtor e depois renderize e teste-os aqui.',
    addOption: 'Adicionar opção +',
    clear: 'Limpar',
    close: 'Fechar',
    label: 'Rótulo',
    name: 'Nome',
    number: 'Número',
    text: 'Texto',
    textarea: 'Área de texto',
    checkbox: 'Caixa de seleção',
    checkboxGroup: 'Grupo de caixas',
    select: 'Selecionar',
    button: 'Botão',
    dateField: 'Campo de data',
    getStarted: 'Arraste um campo da direita para esta área',
    cannotBeEmpty: 'Este campo não pode ficar vazio',
  },
  'zh-CN': {
    builderStudio: '构建器工作室',
    livePreview: '实时预览',
    render: '渲染',
    edit: '编辑',
    builderActions: '构建器操作',
    renderActions: '渲染操作',
    footerNote: '切换语言，切换网格模式，并立即验证输出。',
    cta: '在构建器工作室中添加字段，然后在此处渲染并测试它们。',
    addOption: '添加选项 +',
    clear: '清除',
    close: '关闭',
    label: '标签',
    name: '名称',
    number: '数字',
    text: '文本',
    textarea: '文本区域',
    checkbox: '复选框',
    checkboxGroup: '复选框组',
    select: '选择',
    button: '按钮',
    dateField: '日期字段',
    getStarted: '将字段从右侧拖到此区域',
    cannotBeEmpty: '此字段不能为空',
  },
  
}

const localeOverrides = Object.entries(demoTranslations).reduce((acc, [locale, values]) => {
  acc[locale] = { ...demoTranslations[defaultLocale], ...values }
  return acc
}, {})

const applyDemoLanguage = locale => {
  const resolvedLocale = locale || defaultLocale
  const translations = demoTranslations[resolvedLocale] || demoTranslations[defaultLocale]

  const builderHeading = document.querySelector('#features .panel-heading h3')
  if (builderHeading) {
    builderHeading.textContent = translations.builderStudio
  }

  const previewHeading = document.querySelector('.panel:nth-of-type(2) .panel-heading h3')
  if (previewHeading) {
    previewHeading.textContent = translations.livePreview
  }

  const builderButtons = document.querySelectorAll('#features .editForm')
  if (builderButtons.length) {
    builderButtons[0].textContent = translations.render
  }

  const previewButtons = document.querySelectorAll('.panel:nth-of-type(2) .editForm')
  if (previewButtons.length) {
    previewButtons[0].textContent = translations.edit
  }

  const builderActionsHeading = document.querySelector('.formbuilder-actions h2')
  if (builderActionsHeading) {
    builderActionsHeading.textContent = translations.builderActions
  }

  const renderActionsHeading = document.querySelector('.formrender-actions h2')
  if (renderActionsHeading) {
    renderActionsHeading.textContent = translations.renderActions
  }

  const helperText = document.querySelector('.cta')
  if (helperText) {
    helperText.textContent = translations.cta
  }

  const footerNote = document.querySelector('.demo-footer-note')
  if (footerNote) {
    footerNote.textContent = translations.footerNote
  }
}

const dataTypes = document.querySelectorAll('.demo-dataType')
const dataType = window.sessionStorage.getItem('dataType') || 'json'
const changeDataType = ({ target }) => {
  window.sessionStorage.setItem('dataType', target.value)
  demoActionsApi.resetDemo()
}
for (const typeRadio of dataTypes) {
  if (typeRadio.value === dataType) {
    typeRadio.checked = true
  }
  typeRadio.addEventListener('click', changeDataType, false)
}

const getSafeStoredFormData = currentDataType => {
  const storedFormData = window.sessionStorage.getItem('formData')
  if (!storedFormData || typeof storedFormData !== 'string') {
    return null
  }

  const trimmedFormData = storedFormData.trim()
  if (!trimmedFormData) {
    return null
  }

  if (currentDataType === 'xml') {
    if (trimmedFormData.startsWith('<')) {
      return trimmedFormData
    }
    window.sessionStorage.removeItem('formData')
    return null
  }

  try {
    window.JSON.parse(trimmedFormData)
    return trimmedFormData
  } catch (err) {
    window.sessionStorage.removeItem('formData')
    return null
  }
}

jQuery(function ($) {
  const fields = [
    {
      type: 'autocomplete',
      label: 'Custom Autocomplete',
      required: true,
      values: [
        { label: 'SQL' },
        { label: 'C#' },
        { label: 'JavaScript' },
        { label: 'Java' },
        { label: 'Python' },
        { label: 'C++' },
        { label: 'PHP' },
        { label: 'Swift' },
        { label: 'Ruby' },
      ],
    },
    {
      label: 'Star Rating',
      attrs: {
        type: 'starRating',
      },
      icon: '🌟',
    },
    {
      label: 'Email',
      type: 'text',
      subtype: 'email',
      icon: '✉'
    },
    {
      type: 'textarea',
      label: 'Text Area',
      icon: '📝',
    },
    {
      type: 'textarea',
      subtype: 'summernote',
      label: 'Summernote',
      icon: '📝',
    },
    {
      type: 'checkbox-group',
      subtype: 'custom',
      label: 'Custom Checkbox Group w/Sub Type',
      required: true,
      values: [{ label: 'Option 1' }, { label: 'Option 2' }],
    },
  ]

  const replaceFields = [
    {
      type: 'textarea',
      subtype: 'summernote',
      datatype: 'custom-summernote',
      label: 'Summernote',
      required: true,
    },
  ]

  const actionButtons = [
    {
      id: 'smile',
      className: 'btn btn-success',
      label: '😁',
      type: 'button',
      events: {
        click: () => {
          // @todo toggle options editor instead
          alert('😁😁😁 !SMILE! 😁😁😁')
        },
      },
    },
    'save',
  ]

  const templates = {
    starRating: function (fieldData) {
      return {
        field: '<span id="' + fieldData.name + '">',
        onRender: () => {
          $(document.getElementById(fieldData.name)).rateYo({ rating: 3.6 })
        },
      }
    },
  }

  const inputSets = [
    {
      label: 'User Details',
      icon: '👨',
      name: 'user-details', // optional
      showHeader: true, // optional
      fields: [
        {
          type: 'text',
          label: 'First Name',
          className: 'form-control',
        },
        {
          type: 'select',
          label: 'Profession',
          className: 'form-control',
          values: [
            {
              label: 'Street Sweeper',
              value: 'option-2',
              selected: false,
            },
            {
              label: 'Brain Surgeon',
              value: 'option-3',
              selected: false,
            },
          ],
        },
        {
          type: 'textarea',
          label: 'Short Bio:',
          className: 'form-control',
        },
      ],
    },
    {
      label: 'User Agreement',
      fields: [
        {
          type: 'header',
          subtype: 'h3',
          label: 'Terms & Conditions',
          className: 'header',
        },
        {
          type: 'paragraph',
          label:
            'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.',
        },
        {
          type: 'paragraph',
          label:
            'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.',
        },
        {
          type: 'checkbox',
          label: 'Do you agree to the terms and conditions?',
        },
      ],
    },
  ]

  const typeUserDisabledAttrs = {
    autocomplete: ['access'],
  }

  const typeUserAttrs = {
    text: {
      shape: {
        label: 'Class',
        multiple: true,
        options: {
          'red form-control': 'Red',
          'green form-control': 'Green',
          'blue form-control': 'Blue',
        },
        style: 'border: 1px solid red',
      },
      readonly: {
        label: 'readonly',
        value: false,
      },
    },
    number: {
      volume: {
        label: 'Volume Level',
        value: 1,
        max: 11,
      },
    },
    'checkbox-group-custom': {
      customInput: {
        label: 'Custom Text Field',
        value: 'This field is added only to checkbox with specific subtype',
        type: 'text',
      },
    },
  }

  // test disabledAttrs
  const disabledAttrs = ['placeholder', 'name']

  const fbOptions = {
    defaultFields: [
      {
        className: 'form-control',
        label: 'Default Field',
        placeholder: 'Enter your default field value',
        name: 'default-field-1',
        type: 'text',
      },
    ],
    persistDefaultFields: true,
    disabledSubtypes: {
      text: ['password'],
    },
    // disableHTMLLabels: true,
    disabledAttrs,
    // allowStageSort: false,
    dataType,
    subtypes: {
      text: ['datetime-local'],
    },
    onSave: toggleEdit,
    onAddField: fieldId => {
      setCurrentFieldIdValues(fieldId)
    },
    onAddOption: (optionTemplate, { index }) => {
      optionTemplate.label = optionTemplate.label || `Option ${index + 1}`
      optionTemplate.value = optionTemplate.value || `option-${index + 1}`

      return optionTemplate
    },
    onClearAll: () => window.sessionStorage.removeItem('formData'),
    stickyControls: {
      enable: true,
    },
    onRemoveField: (fieldId, fieldData) => {
      console.log(`Field with ID: ${fieldId} has been removed`, fieldData)
    },
    sortableControls: true,
    fields: fields,
    templates: templates,
    inputSets: inputSets,
    typeUserDisabledAttrs: typeUserDisabledAttrs,
    typeUserAttrs: typeUserAttrs,
    disableInjectedStyle: false,
    actionButtons: actionButtons,
    disableFields: ['autocomplete', 'custom-summernote'],
    replaceFields: replaceFields,
    disabledFieldButtons: {
      text: ['copy'],
    },
    controlPosition: 'right', // left|right,
    i18n: {
      locale: window.sessionStorage.getItem(localeSessionKey) || defaultLocale,
      override: localeOverrides,
    },
    scrollToFieldOnAdd: false,
  }
  const formData = getSafeStoredFormData(dataType)
  let editing = true

  if (formData) {
    fbOptions.formData = formData
  }

  const buildWrap = document.querySelector('.build-wrap')
  const $buildWrap = $(buildWrap)
  const renderWrap = document.querySelector('.render-wrap')
  const $renderWrap = $(renderWrap)

  /**
   * Toggles the edit mode for the demo
   * @return {Boolean} editMode
   */
  function toggleEdit() {
    document.body.classList.toggle('form-rendered', editing)
    if (!editing) {
      $buildWrap.formBuilder('setData', $renderWrap.formRender('userData'))
    } else {
      const formRenderData = $buildWrap.formBuilder('getData', dataType)
      $renderWrap.formRender({
        formData: formRenderData,
        templates: templates,
        dataType,
      })
      window.sessionStorage.setItem('formData', formRenderData)
    }
    editing = !editing
    return editing
  }

  let formBuilder = $buildWrap.formBuilder(fbOptions)
  const toggleEnhancedBootstrapGrid = document.getElementById('toggleEnhancedBootstrapEnabled')
  const toggleEnhancedBootstrapGridHandler = ({ target }) => {
    $buildWrap.empty()
    formBuilder = $buildWrap.formBuilder({
      ...fbOptions,
      formData: formBuilder.formData,
      enableEnhancedBootstrapGrid: target.checked,
    })
  }

  const toggleBootstrap = ({ target }) => {
    toggleEnhancedBootstrapGrid.parentElement.style.display = target.checked ? 'inline-block' : 'none'
    if (!target.checked) {
      removeStyle('bootstrap')
    } else {
      insertStyle({
        src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.6.2/css/bootstrap.min.css',
        id: 'bootstrap',
      })
    }
  }

  document.getElementById('toggleBootstrap').addEventListener('click', toggleBootstrap, false)
  toggleEnhancedBootstrapGrid.addEventListener('change', toggleEnhancedBootstrapGridHandler, false)

  const fbPromise = formBuilder.promise

  fbPromise.then(function (fb) {
    document.querySelectorAll('.editForm').forEach(element => element.addEventListener('click', toggleEdit), false)
    const langSelect = document.getElementById('setLanguage')
    const savedLocale = window.sessionStorage.getItem(localeSessionKey) || defaultLocale

    langSelect.value = savedLocale
    fb.actions.setLang(savedLocale)
    applyDemoLanguage(savedLocale)

    const columns = ['action', 'description', 'demo']
    const actions = {
      getFieldTypes: 'Get the registered field types for the form.',
      showData: 'Trigger a modal to appear that shows the current formData value',
      clearFields: 'Removes all the fields from the template editor',
      getData: 'Read the current formData',
      getXML: 'Get the current formData in XML format',
      getJSON: 'Get the current formData in JSON format',
      getJS: 'Get the current formData in JS object format',
      setData: 'set the current formData value for the editor',
      save: 'call save from the api',
      toggleAllEdit: 'toggle the edit mode for all fields',
      toggleEdit: 'toggle a specific field edit mode by index or id',
      addField: 'programmatically add a field to the template editor',
      removeField: 'remove a field by its index or id from the editor stage',
      resetDemo: 'reset the demo to default state',
    }
    const demoActions = {
      loadUserForm: 'Load user form',
      showUserData: 'Show user form',
      renderUserForm: 'Render user form',
      getHTML: 'Get HTML',
      clearUserForm: 'Clear user form',
      testSubmit: 'Test Submit',
      setData: 'Set template data',
      render: 'Render data that was set',
    }

    const actionApi = document.getElementById('action-api')
    actionApi.appendChild(generateActionTable(actions, columns))
    const demoApi = document.getElementById('demo-api')
    demoApi.appendChild(generateActionTable(demoActions, columns))

    if (formData && formData !== '[]' && dataType === 'json') {
      const setFormDataInputValue = document.getElementById('setData-value')
      if (setFormDataInputValue) {
        try {
          setFormDataInputValue.value = window.JSON.stringify(window.JSON.parse(formData), null, '  ')
        } catch (err) {
          window.sessionStorage.removeItem('formData')
        }
      }
    }

    langSelect.addEventListener(
      'change',
      ({ target: { value: lang } }) => {
        window.sessionStorage.setItem(localeSessionKey, lang)
        fb.actions.setLang(lang)
        applyDemoLanguage(lang)

        if (!editing) {
          const formData = fb.actions.getData(dataType, true)
          if (formData) {
            $renderWrap.formRender({
              formData,
              templates,
              dataType,
            })
            window.sessionStorage.setItem('formData', formData)
          }
        }
      },
      false,
    )
  })
})
