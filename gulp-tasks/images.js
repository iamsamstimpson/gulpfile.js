// =============================================
// IMG `gulp img`
// minifys images
// =============================================

module.exports = function (project, option, gulp, nodeModule, environment) {
    return function () {
        return gulp.src(project.sourceDirectory + '/' + project.imagesDirectory + '/**/*.*')
            .pipe(nodeModule.changed(project.distDirectory + '/' + project.imagesDirectory))
            .pipe(environment.production ? nodeModule.imageMin(option.imageOptimisation) : nodeModule.util.noop())
            .pipe(gulp.dest(project.distDirectory + '/' + project.imagesDirectory));
    };
};
