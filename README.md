# Kettle - Boilerplate gulpfile.js

Kettle is a boilerplate gulpfile.js for use in front-end projects.

## Features
* Sass
    * Compiling
    * Autoprefixer
    * Sourcemaps (if not `--production`)
    * Minification (if `--production`)
    * Combine Media Queries (if `--production`)
* JS
    * Compiling
    * Sourcemaps (if not `--production`)
    * JSHint Error Reporting
    * Uglify (if `--production`)
* Images
    * Compiling
    * Lossless Optimisation
* Fonts
    * Compiling
* Bower
    * Install components from the bower.json file
* Browser Sync
    * CSS Injecting
    * JS Auto reload page

## Project Structure
```
+-- assets/
|   +-- fonts
|   +-- images
|   +-- scripts
|   +-- styles
+-- bower_components/
+-- build/
|   +-- styles
|   +-- scripts
|   +-- images
|   +-- fonts
+-- node_modules/
+-- package.json/
+-- gulpfile.js/
```

## Setup
1. Run `$ npm install` to install packages.

## Once Setup
* Run `$ gulp` and start developing

## Gulp Tasks
* `$ gulp` - Default task, builds assets, starts watching directories for changes.
* `$ gulp build` - Rebuilds all assets (inc bower_components)
* `$ gulp build --production` - Rebuilds all assets in production format (Minification etc).

## Dependencies
* [gulp](https://www.npmjs.com/package/gulp)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
* [gulp-jshint](https://www.npmjs.com/package/gulp-jshint)
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
* [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)
* [gulp-combine-mq](https://www.npmjs.com/package/gulp-combine-mq)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [gulp-bower](https://www.npmjs.com/package/gulp-bower)
* [gulp-clip-empty-files](https://www.npmjs.com/package/gulp-clip-empty-files)
* [gulp-util](https://www.npmjs.com/package/gulp-util)
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)

## To Do
* Browser Sync (Disabled by default)
* Cache
* Error Handling (Plumber)
* Notifications (Error Details / Success) (Disabled by default)
* Move from Bower to NPM for Front-End Packages
* POST CSS branch
* NPM only branch (no Gulp)

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
