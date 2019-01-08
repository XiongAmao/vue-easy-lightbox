#!/usr/bin/env sh

# abort on errors
set -e

# remove babel cache
rm -rf ./node_modules/.cache/babel-loader/

# clean
rm -rf ./dist

# build
npm run build:no-babel
rm -rf ./node_modules/.cache/babel-loader/
npm run build:with-babel

mkdir dist
cp ./.temp/babel/vue-easy-lightbox.common.js ./dist/
cp ./.temp/no-babel/vue-easy-lightbox.umd.js ./dist/
cp ./.temp/no-babel/vue-easy-lightbox.umd.min.js ./dist/

rm -rf ./.temp
