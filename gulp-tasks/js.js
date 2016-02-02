// =============================================
// JS `gulp js`
// compiles js, Jshint, Minify if `--production`
// =============================================

module.exports = function (project, gulp, nodeModule, environment) {
    return function () {
        return gulp.src(project.sourceDirectory + '/' + project.scriptsDirectory + '/**/*.js')
            .pipe(nodeModule.jsHint())
            .pipe(nodeModule.jsHint.reporter('default'))
            .pipe(environment.production ? nodeModule.uglify() : nodeModule.util.noop())
            .pipe(gulp.dest(project.distDirectory + '/' + project.scriptsDirectory))
            .pipe(nodeModule.browserSync.reload({stream: true}));
    };
};
