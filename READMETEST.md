# Test Commands

Run these commands from the repository root.

## General test commands

- Run all tests with coverage:
  - `npm test`
- Run all tests without coverage:
  - `npx vitest run`
- Run tests in watch mode:
  - `npx vitest`

## Run a specific test file

- `npx vitest run tests/bootstrap.test.js`
- `npx vitest run tests/demo-html.test.js`
- `npx vitest run tests/dom.test.js`
- `npx vitest run tests/form-builder-custom.test.js`
- `npx vitest run tests/form-builder.test.js`
- `npx vitest run tests/form-render-instances.test.js`
- `npx vitest run tests/form-render.test.js`
- `npx vitest run tests/formBuilderHooks.test.js`
- `npx vitest run tests/hello.test.js`
- `npx vitest run tests/jsonAttrSerialization.test.js`
- `npx vitest run tests/sanitizer.test.js`
- `npx vitest run tests/translation.test.js`
- `npx vitest run tests/utils.test.js`

## Run control-related tests

- `npx vitest run tests/control/button.test.js`
- `npx vitest run tests/control/checkbox.test.js`
- `npx vitest run tests/control/control_plugin.test.js`
- `npx vitest run tests/control/custom.test.js`
- `npx vitest run tests/control/hidden.test.js`
- `npx vitest run tests/control/paragraph.test.js`
- `npx vitest run tests/control/select.test.js`
- `npx vitest run tests/control/text.test.js`
- `npx vitest run tests/control/textarea.test.js`

## Run multiple tests at once

- Run all tests in the root test folder:
  - `npx vitest run tests/*.test.js`
- Run all control tests:
  - `npx vitest run tests/control/*.test.js`
