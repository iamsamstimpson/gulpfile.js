// =============================================
// IMG `gulp img`
// minifys images
// =============================================

module.exports = function (project, option, gulp, nodeModule) {
    return function () {
        return gulp.src(project.sourceDirectory + '/' + project.imagesDirectory + '/**/*.*')
            .pipe(nodeModule.changed(project.distDirectory + '/' + project.imagesDirectory))
            .pipe(nodeModule.imageMin(option.imageOptimisation))
            .pipe(gulp.dest(project.distDirectory + '/' + project.imagesDirectory));
    };
};
