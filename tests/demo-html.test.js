import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

describe('demo HTML transform', () => {
  it('injects the built demo bundle path for production builds', async () => {
    process.env.NODE_ENV = 'production'

    const { default: config } = await import('../vite.config.demo.js')
    const htmlPlugin = config.plugins.find(({ name }) => name === 'demo-html')

    const transformedHtml = htmlPlugin.transformIndexHtml('<div><!-- DEMO_SCRIPT --></div>')

    expect(transformedHtml).toContain('src="assets/js/demo.min.js"')
  })

  it('loads rateYo before the demo script', () => {
    const templatePath = path.resolve(process.cwd(), 'src/demo/index.html')
    const template = fs.readFileSync(templatePath, 'utf8')
    const demoMarker = template.indexOf('<!-- DEMO_SCRIPT -->')
    const rateYoMarker = template.indexOf('jquery.rateyo.min.js')

    expect(rateYoMarker).toBeGreaterThan(-1)
    expect(demoMarker).toBeGreaterThan(rateYoMarker)
  })
})
