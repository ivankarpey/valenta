module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine_node: {
            projectRoot: "./tests/specs",
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                savePath : "./tests/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.renameTask('jasmine_node', 'test');
    grunt.registerTask('default', ['test']);
};