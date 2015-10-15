// =============================================
// Dependancies
// =============================================

var gulp = require('gulp'),
    sass = require('gulp-sass');

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
// SASS `gulp scss`
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
});

// =============================================
// Build 'gulp build'
// =============================================

gulp.task('build', ['css']);

// =============================================
// Default 'gulp'
// =============================================

gulp.task('default', ['build', 'watch']);
