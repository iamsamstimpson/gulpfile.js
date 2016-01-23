// =============================================
// Default 'gulp'
// runs build task, watches for changes and runs the associated task on change
// =============================================

module.exports = function (project, gulp, nodeModule) {
    return function (cb) {
        nodeModule.runSequence('build', 'browser-sync', cb);
        gulp.watch(project.sourceDirectory + '/' + project.stylesDirectory + '/**/*.scss', ['scss']);
        gulp.watch(project.sourceDirectory + '/' + project.scriptsDirectory + '/**/*.js', ['js']);
        gulp.watch(project.sourceDirectory + '/' + project.imagesDirectory + '/**/*.*', ['img']);
        gulp.watch(project.sourceDirectory + '/' + project.fontsDirectory + '/**/*.*', ['fonts']);
    };
};
