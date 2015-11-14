// =============================================
// Project Settings
// edit these variables to suit your project
// **this is the only section you should need to edit
// =============================================

var sourceDirectory = './assets',
    buildDirectory = './build',
    scssFolder = 'scss',
    cssFolder = 'css',
    jsFolder = 'js',
    imagesFolder = 'img',
    fontsFolder = 'fonts',
    bowerFolder = 'bower_components',
    url = '<PROJECTNAME>.dev',
    autoprefixer = ['last 2 versions'],
    imageOptimisation = {
        optimizationLevel: 3,   // PNG (Between 0 - 7)
        progressive: true,      // JPG
        interlaced: true        // GIF
    };

// =============================================
// Dependencies
// =============================================

var gulp = require('gulp'),
    plugin = require('gulp-load-plugins')(),
    del = require('del'),
    browserSync = require('browser-sync').create();

// =============================================
// Paths
// =============================================

var scss = {
        source: sourceDirectory + '/' + scssFolder + '/**/*.scss',
        build: buildDirectory + '/' + cssFolder
    },
    js = {
        source: sourceDirectory + '/' + jsFolder + '/**/*.js',
        build: buildDirectory + '/' + jsFolder
    },
    img = {
        source: sourceDirectory + '/' + imagesFolder + '/**/*',
        build: buildDirectory + '/' + imagesFolder
    },
    fonts = {
        source: sourceDirectory + '/' + fontsFolder + '/**/*',
        build: buildDirectory + '/' + fontsFolder
    },
    bower = './' + bowerFolder;

// =============================================
// BROWSER SYNC `gulp browser-sync`
// sync injection and auto reloads the browser
// =============================================

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: url,
        open: false
    });
});

// =============================================
// BOWER `gulp bower`
// installs dependencies from the bower.json file
// =============================================

gulp.task('bower', function() {
    return plugin.bower()
        .pipe(gulp.dest(bower));
});

// =============================================
// FONTS `gulp fonts`
// moves fonts to build directory
// =============================================

gulp.task('fonts', function() {
    return gulp.src(fonts.source)
    .pipe(gulp.dest(fonts.build));
});

// =============================================
// IMG `gulp img`
// minifys images
// =============================================

gulp.task('img', function() {
    return gulp.src(img.source)
    .pipe(plugin.imagemin(imageOptimisation))
    .pipe(gulp.dest(img.build));
});

// =============================================
// JS `gulp js`
// compiles js, Jshint, Minify if `--production`
// =============================================

gulp.task('js', function() {
    return gulp.src(js.source)
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter('default'))
    .pipe(plugin.util.env.production ? plugin.uglify() : plugin.util.noop())
    .pipe(gulp.dest(js.build))
    .pipe(browserSync.reload({stream: true}));
});

// =============================================
// CSS `gulp css`
// compiles scss to css, autoprefixer, combines media queries and minifies if `--production`
// =============================================

gulp.task('css', function() {
    return gulp.src(scss.source)
        .pipe(plugin.clipEmptyFiles())
        .pipe(plugin.sass())
        .pipe(plugin.autoprefixer(autoprefixer))
        .pipe(plugin.util.env.production ? plugin.combineMq() : plugin.util.noop())
        .pipe(plugin.util.env.production ? plugin.minifyCss() : plugin.util.noop())
        .pipe(gulp.dest(scss.build))
        .pipe(browserSync.reload({stream: true}));
});

// =============================================
// Clean `gulp clean
// destroys the build directory
// =============================================

gulp.task('clean', function(cb) {
    return del([buildDirectory], cb);
});

// =============================================
// Watch 'gulp watch'
// watches for changes and runs the associated task on change
// =============================================

gulp.task('watch',['browser-sync'], function() {
    gulp.watch(path.scss, ['css']);
    gulp.watch(path.js, ['js']);
    gulp.watch(path.img, ['img']);
    gulp.watch(path.fonts, ['fonts']);
});

// =============================================
// Build 'gulp build'
// builds all assets, also has `--production` option to build production ready assets
// =============================================

gulp.task('build', ['clean'], function() {
    gulp.start('bower', 'css', 'js', 'img', 'fonts');
});

// =============================================
// Default 'gulp'
// builds all assets and starts the watch task
// =============================================

gulp.task('default', ['build'], function() {
    gulp.start('watch');
});
