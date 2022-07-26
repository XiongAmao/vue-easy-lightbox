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
    const inst = await mount(VueEasyLightbox, {
      props: {
        imgs: imgSrc,
        visible: false
      }
    })
    return inst
  }

  test('visible work', async () => {
    const inst = await getInstance()

    expect(inst.find('.vel-modal').exists()).toBe(false)

    await inst.setProps({
      visible: true
    })

    expect(inst.find('.vel-modal').exists()).toBe(true)

    inst.unmount()
  })

  test('Should handle next/prev click correctly', async () => {
    const inst = await getInstance()

    await inst.setProps({
      imgs: [
        'http://nothing.jpg/',
        'http://nothing.jpg/',
        'http://nothing.jpg/'
      ],
      index: 1,
      visible: true
    })

    const nextBtn = inst.find('.btn__next')
    const prevBtn = inst.find('.btn__prev')
    await nextBtn.trigger('click')

    expect(inst.emitted()).toHaveProperty('on-next')
    expect(inst.emitted()).toHaveProperty('on-next-click')
    expect(inst.emitted()).toHaveProperty('on-index-change')
    expect(inst.emitted()['on-next'][0]).toEqual([1, 2])

    await prevBtn.trigger('click')

    expect(inst.emitted()).toHaveProperty('on-prev')
    expect(inst.emitted()).toHaveProperty('on-prev-click')
    expect(inst.emitted()).toHaveProperty('on-index-change')
    expect(inst.emitted()['on-prev'][0]).toEqual([2, 1])
    expect(inst.emitted()['on-index-change'][1]).toEqual([2, 1])

    inst.unmount()
  })

  test(`Should emit 'hide' on mask click`, async () => {
    const inst = await mount(VueEasyLightbox, {
      props: {
        imgs: imgSrc,
        visible: true
      }
    })
    const maskWrapper = inst.find('.vel-modal')
    await maskWrapper.trigger('click')

    expect(inst.emitted()).toHaveProperty('hide')

    inst.unmount()
  })

  /**
   * TODO: no idea...
   * seems
   *
   * */

  // test('on error / loading', () => {
  // })
})
