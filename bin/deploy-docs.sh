#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build:docs

# navigate into the build output directory
cd docs/docs/.vuepress/dist

git init
git add -A
git commit -m 'update gh-pages'
git push -f git@github.com:XiongAmao/vue-easy-lightbox.git master:gh-pages

cd -

echo DONE!
