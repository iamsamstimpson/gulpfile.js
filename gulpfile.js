// =============================================
// Project Settings
// edit these variables to suit your project
// **this and the options object are the only sections you should need to edit
// =============================================

var project = {
    name: 'projectname',
    developmentTLD: '.dev',
    sourceDirectory: './assets',
    distDirectory: './build',
    stylesDirectory: 'styles',
    scriptsDirectory: 'scripts',
    fontsDirectory: 'fonts',
    imagesDirectory: 'images'
};


// =============================================
// Project Options
// edit these variables to suit your project
// **this and the project object are the only sections you should need to edit
// =============================================

var option = {
    autoprefixer: ['last 2 versions'],
    imageOptimisation: {
        optimizationLevel: 3,   // PNG (Between 0 - 7)
        progressive: true,      // JPG
        interlaced: true        // GIF
    }
};


// =============================================
// Dependencies
// =============================================

var gulp = require('gulp'),
nodeModule = {
    util:               require('gulp-util'),
    browserSync:        require('browser-sync'),
    del:                require('del'),
    runSequence:        require('run-sequence'),
    changed:            require('gulp-changed'),
    imageMin:           require('gulp-imagemin'),
    sass:               require('gulp-sass'),
    autoPrefixer:       require('gulp-autoprefixer'),
    clipEmptyFiles:     require('gulp-clip-empty-files'),
    combineMq:          require('gulp-combine-mq'),
    jsHint:             require('gulp-jshint'),
    cssNano:            require('gulp-cssnano'),
    uglify:             require('gulp-uglify'),
    sourcemaps:         require('gulp-sourcemaps')
};


// =============================================
// Environment Variables
// =============================================

var environment = {
    development: nodeModule.util.env.dev,
    production: nodeModule.util.env.production
};


// =============================================
// Gulp Tasks
// =============================================

gulp.task('browser-sync', require('./gulp-tasks/browser-sync')(project, gulp, nodeModule, environment));

gulp.task('fonts', require('./gulp-tasks/fonts')(project, gulp, nodeModule));

gulp.task('images', require('./gulp-tasks/images')(project, option, gulp, nodeModule, environment));

gulp.task('js', require('./gulp-tasks/js')(project, gulp, nodeModule, environment));

gulp.task('scss', require('./gulp-tasks/scss')(project, option, gulp, nodeModule, environment));

gulp.task('clean', require('./gulp-tasks/clean')(project, nodeModule));

gulp.task('build', require('./gulp-tasks/build')(nodeModule));

gulp.task('default', require('./gulp-tasks/default')(project, gulp, nodeModule));
