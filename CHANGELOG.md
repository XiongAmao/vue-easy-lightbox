# Changelog

## [1.19.0] (5 Mar. 2024)

- Fix: Unexpected body overflow unlock [#147](https://github.com/XiongAmao/vue-easy-lightbox/issues/147)

## [1.18.0] (18 Feb. 2024)

- Fix: Nuxt3 build warning [#145](https://github.com/XiongAmao/vue-easy-lightbox/issues/145)

## [1.17.0] (23 Dec. 2023)

- Feat: Add `dblclickDisabled` prop to disable double click. [#131](https://github.com/XiongAmao/vue-easy-lightbox/issues/142)
- Feat: Add prop `currentImg: {}` to img title slot.

## [1.16.0] (16 Apr. 2023)

- Feat: Add `pinchDisabled` (default: false) prop to disable pinching. [#130](https://github.com/XiongAmao/vue-easy-lightbox/issues/130)

## [1.15.0] (18 March 2023)

- Feat: Support `types` condition in `package.json` `exports` field. [#127](https://github.com/XiongAmao/vue-easy-lightbox/issues/127)

## [1.14.0] (28 Feb. 2023)

- Feat: Add `zoomDisabled` prop to disable image zooming. [#93](https://github.com/XiongAmao/vue-easy-lightbox/issues/93)

## [1.13.0] (23 Feb. 2023)

- Feat: Add `rotateDisabled` prop to disable the rotation of the image. [#123](https://github.com/XiongAmao/vue-easy-lightbox/issues/123) [#62](https://github.com/XiongAmao/vue-easy-lightbox/issues/62)

## [1.12.0] (3 Feb. 2023)

- Refactor: using default icon svg with vue component.
- Fix: incorrect toolbar position [#119](https://github.com/XiongAmao/vue-easy-lightbox/issues/119)

## [1.11.0] (5 Nov. 2022)

- Fix: `overflow-y:hidden` is not removed before unmounting component. [#110](https://github.com/XiongAmao/vue-easy-lightbox/issues/110) [#116](https://github.com/XiongAmao/vue-easy-lightbox/issues/116)

## [1.10.0] (4 Nov. 2022)

- Feat: Add `minZoom` to specify the minimum level of zoom scale.

## [1.9.0] (9 Sep. 2022)

- Feat： Add `on-rotate` event, which returns the clockwise angle (deg: number) when the event emit.

## [1.8.2] (29 August 2022)

- Fix: Cannot access external css build. #106

## [1.8.1] (29 August 2022)

- Fix(composables): `show()` accept wrong param when use in vue template. #104

## [1.8.0] (12 August 2022)

- Feat: Add `maxZoom` `zoomScale` to specify the zoom level.

## [1.7.1] (26 July 2022)

- Fix: The default parameters of `useEasyLightbox()` is missing.

## [1.7.0] (18 July 2022)

- Feat: Add composable `useEasyLightbox()` for `setup()`.

## [1.6.0] (15 July 2022)

- Breaking Change: `ES5` bundles is removed.
- Feat: Add some A11y attrs.
- Feat(type): Add emits type declaration.

## [1.5.0] (5 July 2022)

- Feat: Enable or disable click mask to close `vue-easy-lightbox`.

## [1.4.1] (7 March 2022)

- Feat: Reduced zoom in/out ratio.
- Feat: Zooming by mouse wheel is available only when `scrollDisabled` is `true`.
- Breaking Change: `scrollDisabled` now defaults to `true`.

## [1.4.0] (7 March 2022)

- Feat: Support zoom by mouse wheel.
- Feat: Support double click to enlarge img.

## [1.3.0] (3 Feb. 2022)

- Feat: Support RTL (right to left) languages.

## [1.2.4] (18 Sept. 2021)

- Fix: Firefox Dragging issues #81

## [1.2.3] (17 August 2021)

- Feat: Make vue-devtool display named components.
- Fix: Can't get `toolbarMethods` from slot props.

## [1.2.2] (17 August 2021)

- Feat: Extract css.

## [1.2.1] (16 June 2021)

- Fix: Detect `window` incorrect on server side.

## [1.2.0] (16 May 2021)

- Feat: Add `loop` prop to enable loop switching of image.
- Feat: Add `scrollDisabled` prop to disable scrolling when modal is visible.
- Feat: When `moveDisabled` is set to `true`, it is possible to switch images by swiping.
- Feat: Add `swipeTolerance` prop for swipe distance detection.
- Feat: `on-prev-click`/`on-next-click` is renamed to `on-prev`/ `on-next`, the old event name is kept and you can still use it.


## [1.1.0] (11 April 2021)

- Feat: Use `teleport` prop to specify mount location. [Docs](https://v3.vuejs.org/guide/teleport.html#using-with-vue-components)

## [1.0.0] (9 April 2021)

- Docs: update.
- Feat: New animation throttling.
- Feat: `d.ts` for `.tsx`.
- Feat: Small size.
- Fix: css class typos.
- Fix: Touch event handler error may occur in some cases.
- Fix: Scroll chaining when touchmove.
- Fix: [#54](https://github.com/XiongAmao/vue-easy-lightbox/issues/54) Img may be blurred in some cases.

## [0.15.2] (9 April 2021)

- Fix: Component name typos.

## [0.15.1] (9 April 2021)

- Fix: Touch event handler error may occur in some cases.
- Fix: [#54](https://github.com/XiongAmao/vue-easy-lightbox/issues/54) Img may be blurred in some cases.

## [0.15.0] (9 April 2021)

- Docs: Update.
- Fix: Scroll chaining when touchmove.
- Fix: mouse-drag / touchmove animation ends incorrectly.

## [1.0.0-rc.3] (18 Dec 2020)

- Feat: Support `app.use(VueEasyLightbox)` in TypeScript.

## [1.0.0-rc.2] (14 Dec 2020)

- Feat: Update the d.ts file for Vue.js 3.
- Docs: Update the docs guides for Vue.js 2.

## [1.0.0-rc.1] (7 Oct 2020)

- Feat: Support Vue.js 3.0. And no breaking change!!

## [0.14.0] (10 Jul 2020)

- Fix: Syntax error on IE11.

## [0.13.0] (15 May 2020)

- Fix: Error `src of undefined` thrown when show VueEasyLighbox.

## [0.12.1] (6 May 2020)

- Fix: Add style prefixes to fix error on firefox.

## [0.12.0] (5 May 2020)

- Fix: Style error on firefox mobile.

## [0.11.0] (27 March 2020)

- Feat: add prev/next btn click event (`on-prev-click`/`on-next-click`) and index change event(`on-index-change`), these events will return `oldIndex` & `newIndex`.

## [0.10.3] (28 Feb 2020)

- Fix: revert 'ArrowLeft' 'ArrowRight' key handler.

## [0.10.2] (14 Feb 2020)

### Feature
- Add keyboard left or right event handler for switching images.
- Add mobile device gesture to zoom or move image.
- Add image description.

## [0.9.2]

- Fix drag animation slow.

## [0.9.1]

- Fix peerDependencies lock.

## [0.9.0]
- Add vetur support.

## [0.8.1]
- Fix images does not load if they are the same url. [#26](https://github.com/XiongAmao/vue-easy-lightbox/issues/26)

## [0.8.0]

- Add loading & onerror placeholders.
- New Slot: `loading` & `onerror` for custom loading or error placeholders.
- New Event: `on-error` , image `onerror` event triggers.

## [0.7.0]

- New props: `moveDisabled` with default value `false` to disable image movement.

## [0.6.0]

- Fix changing index can't change img in display [#18](https://github.com/XiongAmao/vue-easy-lightbox/issues/18).
- Support TypeScript.

## [0.5.0]

- Fix dist files does not match to package.json.
- Support press the escape key to close modal.

## [0.4.1]

- Support custom btns and toolbar.
- Smaller Builds.

## [0.3.11]

- Fix Bootstrap support [#10](https://github.com/XiongAmao/vue-easy-lightbox/issues/10)

## [0.3.10]

- Fix missing comma in README [#6](https://github.com/XiongAmao/vue-easy-lightbox/issues/6).

## [0.3.9]

- Fix README's error.

## [0.3.8]

- Most tools, such as vue-cli@3, configure babel-loader to ignore all files inside node_modules.
- So `vue-easy-lightbox.common.js` is now a version compiled with babel.

## [0.3.7]

- Fix package.json entry point error.

## [0.3.6]

- Use vue-cli@3 to build the component.

## [0.3.5]

- Bug fix
