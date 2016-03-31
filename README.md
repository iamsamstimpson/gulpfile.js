# Starter Gulpfile

My gulp boilerplate for front-end focussed web projects. Using gulp v4 and the ES6 syntax.


## Features
* Sass
    * Autoprefixer
    * Sourcemaps (if `--dev`)
    * Minification (if `--production`)
    * Combine Media Queries (if `--production`)
    * Copy to build directory
* JS
    * Sourcemaps (if `--dev`)
    * JSHint Error Reporting
    * Uglify (if `--production`)
    * Copy to build directory
* Images
    * Lossless Optimisation (if `--production`)
    * Copy to build directory
* Fonts
    * Copy to build directory
* Bower
    * Install components from the bower.json file


## Project Structure
```
+-- assets/
|   +-- fonts
|   +-- images
|   +-- scripts
|   +-- styles
+-- build/
|   +-- styles
|   +-- scripts
|   +-- images
|   +-- fonts
+-- bower_components/
+-- node_modules/
+-- package.json/
+-- gulpfile.js/
```


## Setup
1. Run `$ npm i` to install packages.

## Once Setup
* Run `$ npm run default` and start developing

## Gulp Tasks
* `$ npm run default` - Default task, builds assets, starts watching directories for changes.
* `$ npm run default-dev` - Default task, builds assets, starts watching directories for changes with dev tools enabled (Sourcemaps, browserSync etc).
* `$ npm run build` - Rebuilds all assets (inc bower_components)
* `$ npm run build-production` - Rebuilds all assets in production format (Minification etc).


## Dependencies
* [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015)
* [babel-register](https://www.npmjs.com/package/babel-register)
* [bower](https://www.npmjs.com/package/bower)
* [del](https://www.npmjs.com/package/del)
* [gulp](https://www.npmjs.com/package/gulp)
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
* [gulp-babel](https://www.npmjs.com/package/gulp-babel)
* [gulp-changed](https://www.npmjs.com/package/gulp-changed)
* [gulp-clip-empty-files](https://www.npmjs.com/package/gulp-clip-empty-files)
* [gulp-combine-mq](https://www.npmjs.com/package/gulp-combine-mq)
* [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano)
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
* [gulp-jshint](https://www.npmjs.com/package/gulp-jshint)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [gulp-util](https://www.npmjs.com/package/gulp-util)


## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Please apply fixes to both the development and production code. Don't forget to update the version number, and when applicable, the documentation.


## License

The MIT License (MIT)

Copyright (c) 2015 Jake Cobley

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
