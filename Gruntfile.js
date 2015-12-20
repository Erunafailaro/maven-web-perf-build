module.exports = function(grunt) {
	'use strict';
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt);
	var pngquant = require('imagemin-pngquant');
	var gifsicle = require('imagemin-gifsicle');

	grunt
			.initConfig({
				app : {
					source : 'src/main/sourceapp',
					dist : 'src/main/webapp',
					bower_comp : 'bower_components'
				},
				clean : {
					dist : [ '.tmp', '<%= app.dist %>/css',
							'<%= app.dist %>/js' ]
				},
				cssmin : {
					options : {
						shorthandCompacting : false,
						roundingPrecision : -1
					},
					target : {
						files : {
							'<%= app.dist %>/css/lib.css' : [
									'<%= app.bower_comp %>/angular/angular.css',
									'<%= app.bower_comp %>/angular-bootstrap/ui-bootstrap-csp.css',
									'<%= app.bower_comp %>/angular-material/angular-material.css',
									'<%= app.bower_comp %>/bootstrap/dist/css/bootstrap.css',
									'<%= app.bower_comp %>/bootstrap-material-design/dist/css/bootstrap-material-design.css',
									'<%= app.bower_comp %>/bootstrap-material-design/dist/css/ripples.css',
									'<%= app.bower_comp %>/angular-material/modules/css/angular-material-layout.css', ]
						}
					}
				},
				sass : {
					options : {
						includePaths : [
								'<%= app.bower_comp %>/bootstrap-sass/assets/stylesheets',
								'.tmp/scss' ]
					},
					server : {
						options : {
							sourceMap : true
						},
						files : [ {
							expand : true,
							cwd : '<%= app.source %>/scss',
							src : '**/*.{scss,sass}',
							dest : '.tmp/css',
							ext : '.css'
						} ]
					},
					dist : {
						options : {
							outputStyle : 'compressed'
						},
						files : [ {
							expand : true,
							cwd : '<%= app.source %>/scss',
							src : '**/*.{scss,sass}',
							dest : '.tmp/css',
							ext : '.css'
						} ]
					}
				},
				autoprefixer : {
					options : {
						browsers : [ 'last 3 versions' ]
					},
					dist : {
						files : [ {
							expand : true,
							cwd : '.tmp/css',
							src : '**/*.css',
							dest : '<%= app.dist %>/css'
						} ]
					}
				},
				uglify : {
					server : {
						options : {
							mangle : false,
							beautify : true
						},
						files : {
							'<%= app.dist %>/js/scripts.js' : [
									'<%= app.bower_comp %>/jquery/dist/jquery.js',
									'<%= app.bower_comp %>/angular/angular.js',
									'<%= app.bower_comp %>/angular-resource/angular-resource.js',
									'<%= app.bower_comp %>/angular-route/angular-route.js',
									'<%= app.bower_comp %>/angular-animate/angular-animate.js',
									'<%= app.bower_comp %>/angular-material/angular-material.js',
									'<%= app.bower_comp %>/angular-translate/angular-translate.js',
									'<%= app.bower_comp %>/bootstrap/dist/js/bootstrap.js',
									'<%= app.bower_comp %>/bootstrap-material-design/dist/js/material.js',
									'<%= app.bower_comp %>/bootstrap-material-design/dist/js/ripples.js',
									'<%= app.bower_comp %>/angular-bootstrap/ui-bootstrap.js' ],

							'<%= app.dist %>/js/app.js' : [
									'<%= app.source %>/js/app.js',
									'<%= app.source %>/js/controllers.js',
									'<%= app.source %>/js/services.js' ]
						}
					},
					dist : {
						options : {
							compress : true,
							preserveComments : false,
							report : 'min'
						},
						files : {
							'<%= app.dist %>/js/scripts.js' : [
									'<%= app.bower_comp %>/jquery/dist/jquery.js',
									'<%= app.bower_comp %>/angular/angular.js',
									'<%= app.bower_comp %>/angular-resource/angular-resource.js',
									'<%= app.bower_comp %>/angular-route/angular-route.js',
									'<%= app.bower_comp %>/angular-animate/angular-animate.js',
									'<%= app.bower_comp %>/angular-material/angular-material.js',
									'<%= app.bower_comp %>/angular-translate/angular-translate.js',
									'<%= app.bower_comp %>/bootstrap/dist/js/bootstrap.js',
									'<%= app.bower_comp %>/bootstrap-material-design/dist/js/material.js',
									'<%= app.bower_comp %>/bootstrap-material-design/dist/js/ripples.js',
									'<%= app.bower_comp %>/angular-bootstrap/ui-bootstrap.js' ],

							'<%= app.dist %>/js/app.js' : [
									'<%= app.source %>/js/app.js',
									'<%= app.source %>/js/controllers.js',
									'<%= app.source %>/js/services.js' ]
						}
					}
				},
				copy : {
					main : {
						cwd : '<%= app.bower_comp %>/bootstrap/dist/fonts/',
						src:['**'],
						dest : '<%= app.dist %>/fonts/',
						expand:true,
						flatten:true
					},
				},
				imagemin : {
					target : {
						options : {
							optimizationLevel : 3,
							progressive : true,
							use : [ pngquant(), gifsicle() ]
						}, // options
						files : [ {
							expand : true,
							cwd : '<%= app.source %>/img/',
							src : [ '**/*.{png,gif}' ],
							dest : '<%= app.dist %>/img/compressed/'
						} ]
					},
					jpg : {
						options : {
							progressive : true
						},
						files : [ {
							// Set to true to enable the following options…
							expand : true,
							// cwd is 'current working directory'
							cwd : '<%= app.source %>/img/',
							src : [ '**/*.jpg' ],
							// Could also match cwd. i.e. project-directory/img/
							dest : '<%= app.dist %>/img/compressed/',
							ext : '.jpg'
						} ]
					}
				// files

				// target
				}, // imagemin
				watch : {
					imageopti : {
						files : [ '<%= app.source %>/img/*.*' ],
						tasks : [ 'imagemin' ]
					}
				// imageopti
				},
				// watch
				serve : {// serve
					options : {
						port : 9000,
						'path' : 'src/main/webapp'
					}
				},
				// serve
				jshint : {
					all : [ 'Gruntfile.js', 'src/main/sourceapp/**/*.js',
							'src/test/js/**/*.js' ],
					options : {
						laxbreak : true
					}
				}

			});

	grunt.loadNpmTasks('grunt-serve');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', [ 'build', 'serve' ]);

	grunt.registerTask('server', [ 'clean', 'cssmin', 'sass:server',
			'imagemin', 'autoprefixer', 'jshint', 'uglify:server' ]);

	grunt.registerTask('build', [ 'clean', 'cssmin', 'sass:dist', 'imagemin',
			'autoprefixer', 'jshint', 'uglify:dist' ]);

};