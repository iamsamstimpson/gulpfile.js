// =============================================
// BROWSER SYNC `gulp browser-sync`
// sync injection and auto reloads the browser
// =============================================

module.exports = function (project, nodeModule, environment) {
    return function () {
        if(environment.dev) {
            nodeModule.browserSync.init(null, {
                proxy: project.name + project.developmentTLD,
                open: false
            });
        }
    };
};
