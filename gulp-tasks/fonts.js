// =============================================
// FONTS `gulp fonts`
// moves fonts to build directory
// =============================================

module.exports = function (project, gulp, nodeModule) {
    return function () {
        return gulp.src(project.sourceDirectory + '/' + project.fontsDirectory + '/**/*.*')
            .pipe(nodeModule.changed(project.distDirectory + '/' + project.fontsDirectory))
            .pipe(gulp.dest(project.distDirectory + '/' + project.fontsDirectory));
    };
};
