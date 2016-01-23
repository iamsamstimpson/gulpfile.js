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
    imagesDirectory: 'images',
    bowerDirectory: './bower_components',
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
    plugin = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();

// =============================================
// BROWSER SYNC `gulp browser-sync`
// sync injection and auto reloads the browser
// =============================================

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: project.name + project.developmentTLD,
        open: false
    });
});

// =============================================
// BOWER `gulp bower`
// installs dependencies from the bower.json file
// =============================================

gulp.task('bower', function() {
    return plugin.bower()
        .pipe(gulp.dest(project.bowerDirectory));
});

// =============================================
// FONTS `gulp fonts`
// moves fonts to build directory
// =============================================

gulp.task('fonts', function() {
    return gulp.src(project.sourceDirectory + '/' + project.fontsDirectory + '/**/*.*')
        .pipe(gulp.dest(project.distDirectory + '/' + project.fontsDirectory));
});

// =============================================
// IMG `gulp img`
// minifys images
// =============================================

gulp.task('img', function() {
    return gulp.src(project.sourceDirectory + '/' + project.imagesDirectory + '/**/*.*')
        .pipe(plugin.imagemin(option.imageOptimisation))
        .pipe(gulp.dest(project.distDirectory + '/' + project.imagesDirectory));
});

// =============================================
// JS `gulp js`
// compiles js, Jshint, Minify if `--production`
// =============================================

gulp.task('js', function() {
    return gulp.src(project.sourceDirectory + '/' + project.scriptsDirectory + '/**/*.js')
        .pipe(plugin.jshint())
        .pipe(plugin.jshint.reporter('default'))
        .pipe(!plugin.util.env.production ? plugin.sourcemaps.init() : plugin.util.noop())
        .pipe(plugin.include())
        .pipe(!plugin.util.env.production ? plugin.sourcemaps.write() : plugin.util.noop())
        .pipe(plugin.util.env.production ? plugin.uglify() : plugin.util.noop())
        .pipe(gulp.dest(project.distDirectory + '/' + project.scriptsDirectory))
        .pipe(browserSync.reload({stream: true}));
});

// =============================================
// CSS `gulp css`
// compiles scss to css, autoprefixer, combines media queries and minifies if `--production`
// =============================================

gulp.task('scss', function() {
    return gulp.src(project.sourceDirectory + '/' + project.stylesDirectory + '/**/*.scss')
        .pipe(plugin.clipEmptyFiles())
        .pipe(!plugin.util.env.production ? plugin.sourcemaps.init() : plugin.util.noop())
        .pipe(plugin.sass())
        .pipe(plugin.autoprefixer(option.autoprefixer))
        .pipe(!plugin.util.env.production ? plugin.sourcemaps.write() : plugin.util.noop())
        .pipe(plugin.util.env.production ? plugin.combineMq() : plugin.util.noop())
        .pipe(plugin.util.env.production ? plugin.minifyCss() : plugin.util.noop())
        .pipe(gulp.dest(project.sourceDirectory + '/' + project.stylesDirectory))
        .pipe(browserSync.reload({stream: true}));
});

// =============================================
// Clean `gulp clean
// destroys the build directory
// =============================================

gulp.task('clean', function(cb) {
    return del([project.distDirectory], cb);
});

// =============================================
// Build 'gulp build'
// builds all assets, also has `--production` option to build production ready assets
// =============================================

gulp.task('build', function(cb) {
    runSequence('clean', 'bower', 'scss', 'js', 'img', 'fonts', cb);
});

// =============================================
// Default 'gulp'
// runs build task, watches for changes and runs the associated task on change
// =============================================

gulp.task('default', function(cb) {
    runSequence('build', 'browser-sync', cb);
    gulp.watch(project.sourceDirectory + '/' + project.stylesDirectory + '/**/*.scss', ['scss']);
    gulp.watch(project.sourceDirectory + '/' + project.scriptsDirectory + '/**/*.js', ['js']);
    gulp.watch(project.sourceDirectory + '/' + project.imagesDirectory + '/**/*.*', ['img']);
    gulp.watch(project.sourceDirectory + '/' + project.fontsDirectory + '/**/*.*', ['fonts']);
});
