# Changelog

## [0.22.0] (23 Feb. 2023)

- Feat: Add `rotateDisabled` prop to disable the rotation of the image. [#62](https://github.com/XiongAmao/vue-easy-lightbox/issues/62)

## [0.21.0] (25 Nov. 2022)

- Fix: `overflow-y:hidden` is not removed before unmounting component.

## [0.20.0] (15 Sep. 2022)

- Feat: Add alt text. [#111](https://github.com/XiongAmao/vue-easy-lightbox/pull/111)

## [0.19.0] (22 July 2022)

_ Feat: Add external CSS build.

## [0.18.0] (5 July 2022)

- Feat: Enable or disable click mask to close `vue-easy-lightbox`.

## [0.17.0] (7 March 2022)

- Feat: Add `scrollDisabled`(default: `true`) prop to disable scrolling when modal is visible.
- Feat: Support zoom by mouse wheel, only available when `scrollDisabled` is `true`.
- Feat: Support double click to enlarge img.

## [0.16.2] (18 Sept. 2021)

- Fix: Firefox Dragging issues #81

## [0.16.1] (15 June 2021)

- Fix: Detect `window` incorrect on server side.

## [0.16.0] (23 May 2021)

- Feat: Add `loop` prop to enable loop switching of image
- Feat: `on-prev-click`/`on-next-click` is renamed to `on-prev`/ `on-next`, the old event name is kept and you can still use it.

## [0.15.2] (9 April 2021)

- Fix: Component name typos.

## [0.15.1] (9 April 2021)

- Fix: Style classname typos.
- Fix: Touch event handler error may occur in some cases.
- Fix: [#54](https://github.com/XiongAmao/vue-easy-lightbox/issues/54) Img may be blurred in some cases.

## [0.15.0] (9 April 2021)

- Docs: Update.
- Fix: Scroll chaining when touchmove.
- Fix: mouse-drag / touchmove animation ends incorrectly.

## [0.14.1] (14 Dec 2020)

- Docs: update for Vue2/Vue3.

## [0.14.0] (10 Jul 2020)

- Fix: Syntax error on IE11.

## [0.13.0] (15 may 2020)

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
