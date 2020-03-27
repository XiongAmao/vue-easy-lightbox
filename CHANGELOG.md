# Changelog

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
