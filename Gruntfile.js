module.exports = function (grunt) {

    //project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        test: {

        }
    });

    //load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //default task
    grunt.registerTask('default', ['uglify']);

}