// =============================================
// Dependancies
// =============================================

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint');

// =============================================
// Paths
// =============================================

var basepath = {
	src: './assets',
    dist: './build'
};

var path = {
    scss: [
        basepath.src + '/scss/*.scss',
        basepath.src + '/scss/**/*.scss'
    ],
    js: [
        basepath.src + '/js/*.js',
        basepath.src + '/js/**/*.js'
    ],
    img: [
        basepath.src + '/img/*.png',
        basepath.src + '/img/**/*.png',
        basepath.src + '/img/*.jpg',
        basepath.src + '/img/**/*.jpg',
        basepath.src + '/img/*.jpeg',
        basepath.src + '/img/**/*.jpeg',
        basepath.src + '/img/*.gif',
        basepath.src + '/img/**/*.gif',
        basepath.src + '/img/*.svg',
        basepath.src + '/img/**/*.svg',
    ]
}

// =============================================
// Options
// =============================================

var option = {
    autoprefixer: [
        'last 2 version',
        'safari 5',
        'opera 12.1',
        'ios 6',
        'android 4'
    ]
};

// =============================================
// IMG `gulp img`
// =============================================

gulp.task('img', function() {
    return gulp.src(path.img)
    .pipe(gulp.dest(basepath.dist + '/img'))
});

// =============================================
// JS `gulp js`
// =============================================

gulp.task('js', function() {
    return gulp.src(path.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(basepath.dist + '/js'))
});

// =============================================
// CSS `gulp css`
// =============================================

gulp.task('css', function() {
    return gulp.src(path.scss)
        .pipe(sass())
        .pipe(autoprefixer(option.autoprefixer))
        .pipe(gulp.dest(basepath.dist + '/css'))
});

// =============================================
// Watch 'gulp watch'
// =============================================

gulp.task('watch', function() {
    gulp.watch(path.scss, ['css']);
    gulp.watch(path.js, ['js']);
    gulp.watch(path.img, ['img']);
});

// =============================================
// Build 'gulp build'
// =============================================

gulp.task('build', ['css', 'js', 'img']);

// =============================================
// Setup 'gulp setup'
// =============================================

gulp.task('setup', ['build']);

// =============================================
// Default 'gulp'
// =============================================

gulp.task('default', ['build', 'watch']);
