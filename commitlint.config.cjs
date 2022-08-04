/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    enableMultipleScopes: true,
    scopeEnumSeparator: ','
  }
}
