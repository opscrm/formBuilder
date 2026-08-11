import controlTextarea from './textarea'
import utils from '../utils'

/**
 * Summernote rich text editor element
 * See https://summernote.org/ for more info
 *
 * To customise the options on this editor, pass properties in controlConfig to formRender
 * e.g.
 * {
 *   controlConfig: {
 *     'textarea.summernote': {
 *       height: 200
 *     }
 *   }
 * }
 * @extends controlTextarea
 */
export default class controlSummernote extends controlTextarea {
	/**
	 * configure the summernote editor requirements
	 */
	configure() {
		const defaultClassConfig = {
			js: 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.9.1/summernote.min.js',
			css: 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.9.1/summernote.min.css',
		}

		const defaultEditorOptions = {
			height: 250,
			dialogsInBody: true,
			toolbar: [
				['style', ['style']],
				['font', ['bold', 'italic', 'underline', 'clear']],
				['para', ['ul', 'ol', 'paragraph']],
				['insert', ['link', 'picture', 'table']],
				['view', ['codeview']],
			],
		}

		const [customClassConfig, customEditorOptions] = utils.splitObject(this.classConfig, ['css', 'js'])

		Object.assign(this, {
			...defaultClassConfig,
			...customClassConfig,
		})

		this.editorOptions = {
			...defaultEditorOptions,
			...customEditorOptions,
		}
	}

	/**
	 * build a textarea DOM element, to be later replaced by the Summernote editor
	 * @return {Object} DOM Element to be injected into the form.
	 */
	build() {
		const { value = '', ...attrs } = this.config
		// Textareas do not have an attribute 'type'
		delete attrs['type']
		this.field = this.markup('textarea', this.parsedHtml(value), attrs)
		return this.field
	}

	/**
	 * When the element is rendered into the DOM, execute the following code to initialise it
	 */
	onRender() {
		const userData = this.config.userData ? this.parsedHtml(this.config.userData[0]) : undefined
		const copiedData =
			window.lastFormBuilderCopiedSummernote ? this.parsedHtml(window.lastFormBuilderCopiedSummernote) : undefined
		window.lastFormBuilderCopiedSummernote = null

		const $field = $(this.field)
		if ($field.data('summernote')) {
			$field.summernote('destroy')
		}

		const options = jQuery.extend({}, this.editorOptions, this.classConfig)
		const existingOnInit = options.callbacks?.onInit
		options.callbacks = jQuery.extend({}, options.callbacks, {
			onInit: () => {
				if (copiedData) {
					$field.summernote('code', copiedData)
				} else if (userData) {
					$field.summernote('code', userData)
				}

				if (this.config.disabled) {
					$field.summernote('disable')
				}

				if (typeof existingOnInit === 'function') {
					existingOnInit()
				}
			},
		})

		setTimeout(() => {
			// Initialise within a timeout so the main thread can continue while summernote initialises.
			$field.summernote(options)
		}, 0)
	}
}

// register summernote as a richtext control
controlTextarea.register('summernote', controlSummernote, 'textarea')
