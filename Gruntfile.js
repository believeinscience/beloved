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
		{src: ['www/library/underscore.deferred.js','www/library/underscore.math.js','www/library/miso.events.js','www/library/miso.ds.0.4.1.js','www/scripts/spriteAnimation.js','www/scripts/countdowns.js','www/scripts/pagemanager.js','www/scripts/CountdownCtrl.js','www/scripts/scammerController.js','www/scripts/spriteAniObj.js','www/scripts/memberpageCtrl.js'], dest: 'temp/scripts/scripts.js'},
		{src:['www/css/style.css','www/css/member.css'], dest:'build/css/style.css'}
	]
  },
  test:{
	options:{
		process: function(src, filepath){
			return '<script type="text/ng-template" id="'+filepath.substring(5,filepath.length)+'">'+src+"</script>";
		}
	},
	files:[
		{src:['temp/pages/about.html','temp/pages/Countdown.html','temp/pages/home.html','temp/pages/ScammerReg.html','temp/pages/members.html','temp/templates/playerdirective.html'],dest:"temp/pages/concatted.html"}
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
			{expand: true,cwd: 'www/pages',src:['*'],dest:'temp/pages/'},
			{expand: true,cwd: 'www/templates',src:['*'],dest:'temp/templates/'}
		]
	}
},
cssmin:{
	options: {
	},
	release:{
		files:[
			{src:"build/css/style.css",dest:"build/css/style.css"}
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
				{expand:true, cwd:'www/',src: 'img/**', dest: 'build/'}//,
				//{src: 'www/directives/playerdirective.html', dest:'build/directives/playerdirective.html'}
			]
		}
    },
jshint:{
	options:{
		globals:{
			jQuery: true
		}
	},
	release:{
		files:{
			src: ['www/scripts/*.js']
		}
	}
},
imageEmbed: {
    dist: {
      src: "build/css/style.css",
      dest: "build/css/style.css",
      options: {
        deleteAfterEncoding : true,
        preEncodeCallback: function (filename) { return true; }
      }
    }
  }
});

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-minify-html');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-include-replace');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks("grunt-image-embed");
// Default task(s).
grunt.registerTask('release', ['jshint:release','minifyHtml:pageminify','concat','includereplace','uglify','minifyHtml:mainindex','copy','imageEmbed','cssmin']);
};