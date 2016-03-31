// =============================================
// Project Settings
// edit these variables to suit your project
// **this and the options object are the only sections you should need to edit
// =============================================

const project = {
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

const option = {
    autoprefixer: [ 'last 2 versions' ],
    imageOptimisation: {
        optimizationLevel: 3,   // PNG (Between 0 - 7)
        progressive: true,      // JPG
        interlaced: true        // GIF
    }
};

// =============================================
// Dependencies
// =============================================

import gulp from 'gulp';
import util from 'gulp-util';
import babel from 'gulp-babel';
import del from 'del';
import changed from 'gulp-changed';
import imageMin from 'gulp-imagemin';
import sass from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';
import clipEmptyFiles from 'gulp-clip-empty-files';
import combineMq from 'gulp-combine-mq';
import jsHint from 'gulp-jshint';
import cssNano from 'gulp-cssnano';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';

// =============================================
// Environment Variables
// =============================================

const environment = {
    development: util.env.dev,
    production: util.env.production
};

// =============================================
// FONTS
// moves fonts to build directory
// =============================================

export function fonts() {
    return gulp.src( project.sourceDirectory + '/' + project.fontsDirectory + '/**/*.*' )
        .pipe( changed(project.distDirectory + '/' + project.fontsDirectory ) )
        .pipe( gulp.dest( project.distDirectory + '/' + project.fontsDirectory ) );
}

// =============================================
// IMG
// minifys images
// =============================================

export function img() {
    return gulp.src( project.sourceDirectory + '/' + project.imagesDirectory + '/**/*.*' )
        .pipe( changed( project.distDirectory + '/' + project.imagesDirectory ) )
        .pipe( environment.production ? imageMin( option.imageOptimisation ) : util.noop() )
        .pipe( gulp.dest( project.distDirectory + '/' + project.imagesDirectory ) );
}

// =============================================
// JS
// compiles js, Jshint, Minify if `--production`
// =============================================

export function js() {
    return gulp.src( project.sourceDirectory + '/' + project.scriptsDirectory + '/**/*.js' )
        .pipe( jsHint() )
        .pipe( jsHint.reporter( 'default' ) )
        .pipe( environment.production ? uglify() : util.noop() )
        .pipe( gulp.dest( project.distDirectory + '/' + project.scriptsDirectory ) );
}

// =============================================
// CSS
// compiles scss to css, autoprefixer, combines media queries and minifies if `--production`
// =============================================

export function css() {
    return gulp.src( project.sourceDirectory + '/' + project.stylesDirectory + '/**/*.scss' )
        .pipe( clipEmptyFiles() )
        .pipe( environment.development ? sourcemaps.init() : util.noop() )
        .pipe( sass())
        .pipe( autoPrefixer( option.autoprefixer ) )
        .pipe( environment.development ? sourcemaps.write() : util.noop() )
        .pipe( environment.production ? combineMq() : util.noop() )
        .pipe( environment.production ? cssNano() : util.noop() )
        .pipe( gulp.dest( project.sourceDirectory + '/' + project.stylesDirectory ) );
}

// =============================================
// Clean
// destroys the build directory
// =============================================

const clean = () => del( [ project.distDirectory ] );
export { clean };

// =============================================
// Build
// builds all assets, also has `--production` option to build production ready assets
// =============================================

const build = gulp.series( clean, gulp.parallel( css, js, img, fonts ) );
export { build };

// =============================================
// Watch 'gulp watch'
// watches files and runs on change
// =============================================

export function watch() {
    gulp.watch( project.sourceDirectory + '/' + project.stylesDirectory + '/**/*.scss', css );
    gulp.watch( project.sourceDirectory + '/' + project.scriptsDirectory + '/**/*.js', js );
    gulp.watch( project.sourceDirectory + '/' + project.imagesDirectory + '/**/*.*', img );
    gulp.watch( project.sourceDirectory + '/' + project.fontsDirectory + '/**/*.*', fonts );
}

// =============================================
// Default
// runs build task, Runs watch tasks
// =============================================
//
const buildWatch = gulp.series( build, watch );
export { buildWatch };

export default buildWatch;
