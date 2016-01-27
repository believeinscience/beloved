module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
uglify: {
  options: {
	banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
  },
  build: {
	src: 'www/scripts/*.js',
	dest: 'build/scripts/scripts.js'
  }
},
minifyHtml:{
	options:{
		cdata: true
	},
	build:{
	src:"www/index.html",
	dest:"build/index.html"
	}
},
cssmin:{
	build:{
		src:"www/css/style.css",
		dest:"build/css/style.css"
	}
}
});

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-minify-html');
grunt.loadNpmTasks('grunt-contrib-cssmin');
// Default task(s).
grunt.registerTask('default', ['uglify','minifyHtml','cssmin']);

};