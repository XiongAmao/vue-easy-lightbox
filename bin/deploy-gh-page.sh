#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build:gh-page

# navigate into the build output directory
cd dist-gh-page

git init
git add -A
git commit -m 'update'
git push -f git@github.com:XiongAmao/vue-easy-lightbox.git master:gh-pages

cd -

echo DONE!
