import { it } from 'vitest'
import { expect } from 'vitest'
import { describe } from 'vitest'
import VueEasyLightbox from '../src/index'

describe('index', () => {
  it('default export include install()', () => {
    expect(VueEasyLightbox.install).toBeTypeOf('function')
  })
})
