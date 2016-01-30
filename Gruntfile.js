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
  },
  test:{
	options:{
		process: function(src, filepath){
			return '<script type="text/ng-template" id="'+filepath.substring(5,filepath.length)+'">'+src+"</script>";
		}
	},
	files:[
		{src:['temp/pages/about.html','temp/pages/Countdown.html','temp/pages/home.html','temp/pages/ScammerReg.html'],dest:"temp/pages/concatted.html"}
	]
  }
},
minifyHtml:{
	options:{
		cdata: true
	},
	mainindex:{
		files:[
			{src:"temp/index.html",dest:"build/index.html"}
		]
	},
	pageminify:{
			files:[
			{expand: true,cwd: 'www/pages',src:['*'],dest:'temp/pages/'}
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
		commentend: "-->",
		beginstyletag: "<style>",
		endstyletag: "</style>"
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
grunt.registerTask('release', ['minifyHtml:pageminify','concat','includereplace','uglify','minifyHtml:mainindex','cssmin','copy']);
};