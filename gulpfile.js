// =============================================
// Dependancies
// =============================================

var gulp = require('gulp'),
    plugin = require('gulp-load-plugins')();

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
        basepath.src + '/img/**/*.svg'
    ],
    fonts: [
        basepath.src + '/font/*.eot',
        basepath.src + '/font/*.otf',
        basepath.src + '/font/*.ttf',
        basepath.src + '/font/*.woff',
        basepath.src + '/font/*.svg',
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
    ],
    imageopt: {
        progressive: true,
        svgoPlugins: [{removeViewBox: false}]
    }
};

// =============================================
// Enviroment
// =============================================

var isProduction = false;

if(plugin.util.env.production === true) {
    isProduction = true;
}

// =============================================
// FONTS `gulp fonts`
// =============================================

gulp.task('fonts', function() {
    return gulp.src(path.fonts)
    .pipe(gulp.dest(basepath.dist + '/fonts'))
});

// =============================================
// IMG `gulp img`
// =============================================

gulp.task('img', function() {
    return gulp.src(path.img)
    .pipe(plugin.imagemin(option.imageopt))
    .pipe(gulp.dest(basepath.dist + '/img'))
});

// =============================================
// JS `gulp js`
// =============================================

gulp.task('js', function() {
    return gulp.src(path.js)
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter('default'))
    .pipe(gulp.dest(basepath.dist + '/js'))
});

// =============================================
// CSS `gulp css`
// =============================================

gulp.task('css', function() {
    return gulp.src(path.scss)
        .pipe(plugin.sass())
        .pipe(plugin.autoprefixer(option.autoprefixer))
        .pipe(isProduction ? plugin.minifyCss() : plugin.util.noop())
        .pipe(gulp.dest(basepath.dist + '/css'))
});

// =============================================
// Watch 'gulp watch'
// =============================================

gulp.task('watch', function() {
    gulp.watch(path.scss, ['css']);
    gulp.watch(path.js, ['js']);
    gulp.watch(path.img, ['img']);
    gulp.watch(path.fonts, ['fonts']);
});

// =============================================
// Build 'gulp build'
// =============================================

gulp.task('build', ['css', 'js', 'img', 'fonts']);

// =============================================
// Setup 'gulp setup'
// =============================================

gulp.task('setup', ['build']);

// =============================================
// Default 'gulp'
// =============================================

gulp.task('default', ['build', 'watch']);
