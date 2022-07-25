import { useEasyLightbox } from '.'

describe('useEasyLightbox', () => {
  it('initial indexRef = 0', () => {
    const { indexRef } = useEasyLightbox()
    expect(indexRef.value).toBe(0)
  })

  it(`initial imgsRef should be '' `, () => {
    const { imgsRef } = useEasyLightbox()
    expect(imgsRef.value).toBe('')
  })
})
