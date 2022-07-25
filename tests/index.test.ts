import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import VueEasyLightbox from '../src/index'

describe('entry', () => {
  test('default export include install()', () => {
    expect(VueEasyLightbox.install).toBeTypeOf('function')
  })
})

describe('<vue-easy-lightbox />', () => {
  const imgSrc = 'http://nothing.jpg/'

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  async function getInstance() {
    const wrapper = await mount(VueEasyLightbox, {
      props: {
        src: imgSrc,
        visible: false
      }
    })
    return wrapper
  }

  test('visible work', async () => {
    const wrapper = await getInstance()

    expect(wrapper.find('.vel-modal').exists()).toBe(false)

    await wrapper.setProps({
      visible: true
    })

    expect(wrapper.find('.vel-modal').exists()).toBe(true)
  })

  test('show error icon when img loading fails', async () => {
    const wrapper = await getInstance()

    await wrapper.setProps({
      visible: true
    })

    // FIXME: how to test  ??
    expect(wrapper.find('.vel-img-wrapper').exists()).toBe(true)
  })

  test(`emit 'hide' on mask click`, async () => {
    const wrapper = await mount(VueEasyLightbox, {
      props: {
        src: imgSrc,
        visible: true
      }
    })
    const maskWrapper = wrapper.find('.vel-modal')
    await maskWrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('hide')
  })
})
