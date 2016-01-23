// =============================================
// Clean `gulp clean
// destroys the build directory
// =============================================

module.exports = function (project, nodeModule) {
    return function (cb) {
        return nodeModule.del([project.distDirectory], cb);
    };
};
