import controlTextarea from '../../src/js/control/textarea.js'
import controlQuill from '../../src/js/control/textarea.quill'
import controlSummernote from '../../src/js/control/textarea.summernote'
import { getScripts, getStyles, isCached } from '../../src/js/utils.js'

const loadResources = async (js, css) => {
  if (css) {
    getStyles(css)
  }
  if (js && !isCached(js)) {
    await getScripts(js)
  }
}

describe('Test Text Control', () => {
  test('test building control element', async () => {
    const controlInstance = new controlTextarea({
      'type': 'textarea',
      'subtype': 'textarea',
      'required': false,
      'label': 'Test text element',
      'className': 'form-control',
      'name': 'test-elem',
      'access': false,
    }, false)
    expect(typeof controlInstance).toBe('object')
    expect(controlInstance.constructor.name).toBe('controlTextarea')

    const element = controlInstance.build()
    expect(element.constructor.name).toBe('HTMLTextAreaElement')
    expect(element.type).toBe('textarea')
    expect(element.name).toBe('test-elem')
    expect(element.id).toBe('test-elem')
  })

  test('test userData loaded after render', () => {
    const controlInstance = new controlTextarea({
      'type': 'textarea',
      'userData': ['loadedValue']
    }, false)
    const element = controlInstance.build()
    expect(element.value).toBe('')
    controlInstance.onRender()
    expect(element.value).toBe('loadedValue')
  })
})

describe('Test building text variations and subtypes', () => {
    // Skipped under Vitest/jsdom: the control fetches Summernote from a CDN, but
    // jsdom runs external scripts in an isolated realm the test can't read, and the
    // editor plugin does not initialise reliably in jsdom. See the
    // hermetic editor setup note in tests/setup-vitest.js.
    test.skip('can render Summernote', async () => {
      const controlInstance = new controlSummernote({
        'type': 'textarea',
        'required': false,
        'label': 'Test summernote element',
        'className': 'form-control',
        'name': 'summernote-elem',
        'access': false,
        'subtype': 'summernote',
        userData: ['AValue'],
      }, false)
      controlInstance.configure()
      const element = controlInstance.build()
      expect(element.constructor.name).toBe('HTMLTextAreaElement')
      expect(element.type).toBe('textarea')

      window.document.body.appendChild(element) // Element must be attached to dom for editor theme to work.

      await loadResources(controlInstance.js, controlInstance.css)

      expect($.fn.summernote).not.toBeUndefined()
      controlInstance.onRender()
      // Await summernote initialisation
      await (new Promise(resolve => {
        const timer = setInterval(() => {
          const editor = $('#summernote-elem')
          if (editor.length && editor.data('summernote')) {
            clearTimeout(timer)
            resolve()
          }
        }, 500)
      }))
      const editor = $('#summernote-elem')
      expect(editor.length).toBe(1)
      expect(editor.summernote('code')).toContain('AValue')
    }, 20000)

    test('can render Quill', async () => {
      const controlInstance = new controlQuill({
        'type': 'textarea',
        'required': false,
        'label': 'Test quill element',
        'className': 'form-control',
        'name': 'quill-elem',
        'access': false,
        'subtype': 'quill',
      }, false)
      controlInstance.configure()
      const element = controlInstance.build()
      expect(element.constructor.name).toBe('HTMLDivElement')

      window.document.body.appendChild(element) //Element must be attached to dom for quill to work otherwise exception thrown

      await loadResources(controlInstance.js, controlInstance.css)
      controlInstance.onRender()
    })
})