#!/usr/bin/env sh

# abort on errors
set -e

# build
pnpm run docs:build

# navigate into the build output directory
cd docs/.vitepress/dist

git init -b main
git add -A
git commit -m 'update gh-pages'
# git push -f git@github.com:XiongAmao/vue-easy-lightbox.git main:gh-pages

cd -

echo DONE!
