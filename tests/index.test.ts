import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import VueEasyLightbox from '../src/index'

describe('entry', () => {
  test('default export include install()', () => {
    expect(VueEasyLightbox.install).toBeTypeOf('function')
  })
})

describe('<vue-easy-lightbox />', () => {
  const imgSrc = 'http://nothing.jpg/'

  async function getInstance() {
    const wrapper = await mount(VueEasyLightbox, {
      props: {
        imgs: imgSrc,
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

  test('next/prev click emits', async () => {
    const wrapper = await getInstance()

    await wrapper.setProps({
      imgs: [
        'http://nothing.jpg/',
        'http://nothing.jpg/',
        'http://nothing.jpg/'
      ],
      index: 1,
      visible: true
    })

    const nextBtn = wrapper.find('.btn__next')
    const prevBtn = wrapper.find('.btn__prev')
    await nextBtn.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('on-next')
    expect(wrapper.emitted()).toHaveProperty('on-next-click')
    expect(wrapper.emitted()).toHaveProperty('on-index-change')
    expect(wrapper.emitted()['on-next'][0]).toEqual([1, 2])

    await prevBtn.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('on-prev')
    expect(wrapper.emitted()).toHaveProperty('on-prev-click')
    expect(wrapper.emitted()).toHaveProperty('on-index-change')
    expect(wrapper.emitted()['on-prev'][0]).toEqual([2, 1])
    expect(wrapper.emitted()['on-index-change'][1]).toEqual([2, 1])
  })

  test(`emit 'hide' on mask click`, async () => {
    const wrapper = await mount(VueEasyLightbox, {
      props: {
        imgs: imgSrc,
        visible: true
      }
    })
    const maskWrapper = wrapper.find('.vel-modal')
    await maskWrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('hide')
  })

  // TODO: how to test it？
  // test('on error / loading', () => {

  // })
})
