// =============================================
// CSS `gulp css`
// compiles scss to css, autoprefixer, combines media queries and minifies if `--production`
// =============================================

module.exports = function (project, option, gulp, nodeModule, environment) {
    return function () {
        return gulp.src(project.sourceDirectory + '/' + project.stylesDirectory + '/**/*.scss')
            .pipe(nodeModule.clipEmptyFiles())
            .pipe(environment.development ? nodeModule.sourcemaps.init() : nodeModule.util.noop())
            .pipe(nodeModule.sass())
            .pipe(nodeModule.autoPrefixer(option.autoprefixer))
            .pipe(environment.development ? nodeModule.sourcemaps.write() : nodeModule.util.noop())
            .pipe(environment.production ? nodeModule.combineMq() : nodeModule.util.noop())
            .pipe(environment.production ? nodeModule.cssNano() : nodeModule.util.noop())
            .pipe(gulp.dest(project.sourceDirectory + '/' + project.stylesDirectory))
            .pipe(nodeModule.browserSync.reload({stream: true}));
    };
};
