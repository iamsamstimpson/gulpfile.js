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

var gulp = require('gulp' ),
nodeModule = {
    util:               require( 'gulp-util' ),
    browserSync:        require( 'browser-sync' ),
    del:                require( 'del' ),
    runSequence:        require( 'run-sequence' ),
    changed:            require( 'gulp-changed' ),
    imageMin:           require( 'gulp-imagemin' ),
    sass:               require( 'gulp-sass' ),
    autoPrefixer:       require( 'gulp-autoprefixer' ),
    clipEmptyFiles:     require( 'gulp-clip-empty-files' ),
    combineMq:          require( 'gulp-combine-mq' ),
    jsHint:             require( 'gulp-jshint' ),
    cssNano:            require( 'gulp-cssnano' ),
    uglify:             require( 'gulp-uglify' ),
    sourcemaps:         require( 'gulp-sourcemaps' )
};

// =============================================
// Environment Variables
// =============================================

var environment = {
    development: nodeModule.util.env.dev,
    production: nodeModule.util.env.production
};

// =============================================
// FONTS `gulp fonts`
// moves fonts to build directory
// =============================================

gulp.task( 'fonts', function() {
    return gulp.src( project.sourceDirectory + '/' + project.fontsDirectory + '/**/*.*' )
        .pipe( nodeModule.changed(project.distDirectory + '/' + project.fontsDirectory ) )
        .pipe( gulp.dest( project.distDirectory + '/' + project.fontsDirectory ) );
} );

// =============================================
// IMG `gulp img`
// minifys images
// =============================================

gulp.task( 'img', function() {
    return gulp.src( project.sourceDirectory + '/' + project.imagesDirectory + '/**/*.*' )
        .pipe( nodeModule.changed( project.distDirectory + '/' + project.imagesDirectory ) )
        .pipe( environment.production ? nodeModule.imageMin( option.imageOptimisation ) : nodeModule.util.noop() )
        .pipe( gulp.dest( project.distDirectory + '/' + project.imagesDirectory ) );
} );

// =============================================
// JS `gulp js`
// compiles js, Jshint, Minify if `--production`
// =============================================

gulp.task( 'js', function() {
    return gulp.src( project.sourceDirectory + '/' + project.scriptsDirectory + '/**/*.js' )
        .pipe( nodeModule.jsHint() )
        .pipe( nodeModule.jsHint.reporter( 'default' ) )
        .pipe( environment.production ? nodeModule.uglify() : nodeModule.util.noop() )
        .pipe( gulp.dest( project.distDirectory + '/' + project.scriptsDirectory ) );
} );

// =============================================
// CSS `gulp css`
// compiles scss to css, autoprefixer, combines media queries and minifies if `--production`
// =============================================

gulp.task( 'scss', function() {
    return gulp.src( project.sourceDirectory + '/' + project.stylesDirectory + '/**/*.scss' )
        .pipe( nodeModule.clipEmptyFiles() )
        .pipe( environment.development ? nodeModule.sourcemaps.init() : nodeModule.util.noop() )
        .pipe( nodeModule.sass())
        .pipe( nodeModule.autoPrefixer( option.autoprefixer ) )
        .pipe( environment.development ? nodeModule.sourcemaps.write() : nodeModule.util.noop() )
        .pipe( environment.production ? nodeModule.combineMq() : nodeModule.util.noop() )
        .pipe( environment.production ? nodeModule.cssNano() : nodeModule.util.noop() )
        .pipe( gulp.dest( project.sourceDirectory + '/' + project.stylesDirectory ) );
} );

// =============================================
// Clean `gulp clean
// destroys the build directory
// =============================================

gulp.task( 'clean', function( cb ) {
    return nodeModule.del( [ project.distDirectory ], cb );
} );

// =============================================
// Build 'gulp build'
// builds all assets, also has `--production` option to build production ready assets
// =============================================

gulp.task( 'build', gulp.series( 'clean', gulp.parallel( 'scss', 'js', 'img', 'fonts' ) ) );

// =============================================
// Watch 'gulp watch'
// watches files and runs on change
// =============================================

gulp.task( 'watch', function() {
    gulp.watch( project.sourceDirectory + '/' + project.stylesDirectory + '/**/*.scss', gulp.series( 'scss' ) );
    gulp.watch( project.sourceDirectory + '/' + project.scriptsDirectory + '/**/*.js', gulp.series( 'js' ) );
    gulp.watch( project.sourceDirectory + '/' + project.imagesDirectory + '/**/*.*', gulp.series( 'img' ) );
    gulp.watch( project.sourceDirectory + '/' + project.fontsDirectory + '/**/*.*', gulp.series( 'fonts' ) );
} );

// =============================================
// Default 'gulp'
// runs build task, Runs watch tasks
// =============================================

gulp.task( 'default', gulp.series( 'build', 'watch' ) );
