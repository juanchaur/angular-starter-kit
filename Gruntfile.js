'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({
		// Project settings
		myApp: appConfig,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},

			js: {
				files: ['<%= myApp.app %>/scripts/**/*.js'],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},

			jsTest: {
				files: ['test/spec/**/*.js'],
				tasks: ['newer:jshint:test', 'karma']
			},

			styles: {
				files: [
					'<%= myApp.app %>/assets/styles/scss/**/*.scss'
					// '<%= myApp.app %>/assets/styles/**/*.css'
				],
				tasks: ['sass', 'newer:copy:styles']
			},

			gruntfile: {
				files: ['Gruntfile.js']
			},

			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= myApp.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= myApp.app %>/assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		sass: {
			options: {
				//includePaths: ['bower_components/foundation/scss'],
				// sourceMap: true
			},
			dist: {
				options: {
					outputStyle: 'nested'
					// outputStyle: 'compressed'
				},
				files: [{
						src: '<%= myApp.app %>/assets/styles/scss/app.scss',
						dest: '<%= myApp.app %>/assets/styles/main.css'
					}
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
				  open: true,
				  middleware: function (connect) {
					return [
						connect.static('.tmp'),
						connect().use(
							'/bower_components',
							connect.static('./bower_components')
						),
						connect.static(appConfig.app)
					];
				  }
				}
			},
			test: {
				options: {
					port: 9001,
					middleware: function (connect) {
						return [
							connect.static('.tmp'),
							connect.static('test'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= myApp.dist %>'
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'<%= myApp.app %>/scripts/**/*.js'
				]
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/**/*.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= myApp.dist %>/**/*',
						'!<%= myApp.dist %>/.git/**/*'
					]
				}]
			},
			server: '.tmp'
		},

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: ['<%= myApp.app %>/index.html'],
				ignorePath:  /\.\.\//,
				devDependencies: true //delete this when not $httpBackend
			}
		},

		// Renames files for browser caching purposes
		filerev: {
			dist: {
				src: [
					'<%= myApp.dist %>/scripts/**/*.js',
					'<%= myApp.dist %>/assets/styles/**/*.css',
					'<%= myApp.dist %>/assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= myApp.dist %>/assets/styles/fonts/*'
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= myApp.app %>/index.html',
			options: {
				dest: '<%= myApp.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			html: ['<%= myApp.dist %>/**/*.html'],
			css: ['<%= myApp.dist %>/assets/styles/**/*.css'],
			options: {
				assetsDirs: ['<%= myApp.dist %>','<%= myApp.dist %>/assets/img']
			}
		},


		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= myApp.app %>/assets/img',
					src: '**/*.{png,jpg,jpeg,gif}',
					dest: '<%= myApp.dist %>/assets/img'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= myApp.app %>/assets/img',
					src: '{,*/}*.svg',
					dest: '<%= myApp.dist %>/assets/img'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= myApp.dist %>',
					src: [
						'*.html',
						'scripts/**/*.html'
					],
					dest: '<%= myApp.dist %>'
				}]
			}
		},

		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: ['*.js', '!oldieshim.js'],
					dest: '.tmp/concat/scripts'
				}]
			}
		},

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= myApp.dist %>/*.html']
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= myApp.app %>',
					dest: '<%= myApp.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'scripts/**/*.html',
						'assets/img/**/*.{webp}',
						'fonts/{,*/}*.*'
					]
				}, {
					expand: true,
					cwd: '.tmp/assets/img',
					dest: '<%= myApp.dist %>/assets/img',
					src: ['generated/*']
				}, {
					expand: true,
					cwd: 'bower_components/bootstrap/dist',
					src: '<%= iegApp.app %>/assets/fonts/*',
					dest: '<%= myApp.dist %>'
				}]
			},

			styles: {
				expand: true,
				cwd: '<%= myApp.app %>/assets/styles',
				dest: '.tmp/assets/styles/',
				src: '{,*/}*.css'
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'copy:styles'
			],
			test: [
				'copy:styles'
			],
			dist: [
				'copy:styles',
				'imagemin',
				'svgmin'
			]
		},

		// Test settings
		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				singleRun: true
			}
		},

		open: {
			dev: {
				url: 'http://localhost:<%= connect.options.port %>',
				app: 'google-chrome'
			}
		}
  	});

	////////////////////////////////////////////////////////////////////////////////////////////////
	///                     REGISTER TASKS
	////////////////////////////////////////////////////////////////////////////////////////////////
	grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'newer:jshint',
			'sass',
			'clean:server',
			'wiredep',
			'concurrent:server',
			'connect:livereload',
			'open:dev',
			'watch'
		]);

	});

	grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'connect:test',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'wiredep',
		'useminPrepare',
		'concurrent:dist',
		'concat',
		'ngAnnotate',
		'copy:dist',
		'cdnify',
		'cssmin',
		'uglify',
		'filerev',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'test',
		'build'
	]);
};
