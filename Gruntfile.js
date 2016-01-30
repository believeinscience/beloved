module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
uglify: {
  options: {
	banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
  },
  release: {
	files:[
		{src: 'temp/scripts/scripts.js', dest: 'build/scripts/scripts.js'}
	]
  }
},
concat: {
  release: {
	files:[
		{src: ['www/library/underscore.deferred.js','www/library/underscore.math.js','www/library/miso.events.js','www/library/miso.ds.0.4.1.js','www/scripts/spriteAnimation.js','www/scripts/countdowns.js','www/scripts/pagemanager.js','www/scripts/CountdownCtrl.js','www/scripts/scammerController.js'], dest: 'temp/scripts/scripts.js'}
	]
  }
},
minifyHtml:{
	options:{
		cdata: true
	},
	release:{
		files:[
			{src:"temp/index.html",dest:"build/index.html"},
			{expand: true,cwd: 'www/pages',src:['*'],dest:'build/pages/'}
		]

	}
},
cssmin:{
	options: {
	},
	release:{
		files:[
			{src:"www/css/style.css",dest:"build/css/style.css"}
		]
		}
},
includereplace: {
  release: {
    options: {
      globals: {
        mainscripts: "<script src='scripts/scripts.js'></script>",
		commentstart: "<!--",
		commentend: "-->"
      },
      prefix: '<!-- @@',
      suffix: ' -->'
    },
	files:[
		{src: 'www/index.html',dest: 'temp/index.html'}
	]
  }
},
copy: {
	release: {
			files: [
				{ src: 'www/favicon.png', dest: 'build/favicon.png' },
				{src: 'www/ScammerRegistry/library/miso.ds.0.4.1.min.js', dest: 'build/ScammerRegistry/library/miso.ds.0.4.1.min.js'},
				{src: 'www/img/avatar.png', dest: 'build/img/avatar.png'}
			]
		}
    }
});

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-minify-html');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-include-replace');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-concat');
// Default task(s).
grunt.registerTask('release', ['includereplace','concat','uglify','minifyHtml','cssmin','copy']);

};