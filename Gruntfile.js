module.exports = function (grunt)
{
    'use strict';

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Set up paths.
        paths: {
            src: {
                sass: 'scss/',
                fonts: 'fonts/',
                images: 'img/',
                js: 'js/',
                templates: 'templates/'
            },
            dest: {
                css: 'themes/hive-framework-<%= pkg.version %>/assets/css/',
                fonts: 'themes/hive-framework-<%= pkg.version %>/assets/fonts/',
                images: 'themes/hive-framework-<%= pkg.version %>/assets/img/',
                js: 'themes/hive-framework-<%= pkg.version %>/assets/js/',
                templates: 'themes/hive-framework-<%= pkg.version %>/'
            }
        },

        // Bundle up the JavaScript.
        browserify: {
            development: {
                src: [
                    '<%= paths.src.js %>app.js'
                ],
                dest: '<%= paths.dest.js %>app.js',
                options: {
                    browserifyOptions: {
                        debug: false
                    },
                    transform: [[
                        'babelify', {
                            'presets': ['@babel/preset-env']
                        }
                    ]]
                }
            }
        },

        // Clean theme directory to start afresh.
        clean: [
            'themes/*'
        ],

        // Run some tasks in parallel to speed up the build process.
        concurrent: {
            dist: [
                'browserify',
                'copy',
                'jshint',
                'replace'
            ]
        },

        copy: {
            // Copy fonts.
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.src.fonts %>',
                        src: '**',
                        dest: '<%= paths.dest.fonts %>'
                    }
                ]
            },
            // Copy Textpattern templates.
            html: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.src.templates %>',
                        src: ['**', '!manifest.json'],
                        dest: '<%= paths.dest.templates %>'
                    }
                ]
            },
            // Copy fonts.
            img: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.src.images %>',
                        src: '**',
                        dest: '<%= paths.dest.images %>'
                    }
                ]
            },
            // Copy Leaflet (open-source interactive maps) files.
            leaflet: {
                files: [
                    {
                        '<%= paths.dest.js %>map.js': ['node_modules/leaflet/dist/leaflet.js'],
                        '<%= paths.dest.css %>map.css': ['node_modules/leaflet/dist/leaflet.css']
                    }
                ]
            }
        },

        // Check code quality of Gruntfile.js and site-specific JavaScript using JSHint.
        jshint: {
            options: {
                bitwise: true,
                browser: true,
                curly: true,
                eqeqeq: true,
                esversion: 6,
                forin: true,
                globals: {
                    $: true,
                    console: true,
                    jQuery: true,
                    Zepto: true,
                    define: true,
                    module: true,
                    require: true,
                    autosize: true,
                    Prism: true
                },
                latedef: true,
                noarg: true,
                nonew: true,
                strict: true,
                undef: true,
                unused: true
            },
            files: [
                'Gruntfile.js',
                '<%= paths.src.js %>*.js'
            ]
        },

        // Add vendor prefixed styles and other post-processing transformations.
        postcss: {
            options: {
                processors: [
                    require('autoprefixer'),
                    require('cssnano')
                ]
            },
            dist: {
                src: '<%= paths.dest.css %>*.css'
            }
        },

        // Purge unused CSS from production.
        purgecss: {
            my_target: {
                options: {
                    content: [
                        '<%= paths.dest.templates %>**/*.txp',
                        '<%= paths.dest.js %>**/*.js'
                    ],
                    safelist: {
                        standard: [
                            'caps',
                            'comments_error',
                            'cpreview',
                            'error_message',
                            'footnote',
                            'list--no-bullets',
                            'success',
                            'error',
                            'alert-block success',
                            'alert-block error'
                        ],
                        greedy: [
                            /input$/,
                            /textarea$/,
                            /disabled$/
                        ]
                    }
                },
                files: {
                    '<%= paths.dest.css %>screen.css': ['<%= paths.dest.css %>screen.css']
                }
            }
        },

        // Generate version number automatically in theme manifest.json file.
        replace: {
            theme: {
                options: {
                    patterns: [
                        {
                            match: 'version',
                            replacement: '<%= pkg.version %>'
                        }
                    ]
                },
                files: [
                    {'<%= paths.dest.templates %>manifest.json': '<%= paths.src.templates %>manifest.json'}
                ]
            }
        },

        // Sass configuration.
        sass: {
            options: {
                implementation: require('sass'),
                outputStyle: 'expanded', // outputStyle = expanded, nested, compact or compressed.
                sourceMap: false
            },
            dist: {
                files: [
                    {'<%= paths.dest.css %>screen.css': '<%= paths.src.sass %>screen.scss'},
                    {'<%= paths.dest.css %>print.css': '<%= paths.src.sass %>print.scss'}
                ]
            }
        },

        // Validate CSS files via stylelint.
        stylelint: {
            options: {
                configFile: '.stylelintrc.yml'
            },
            src: ['<%= paths.src.sass %>**/*.{css,scss}']
        },

        // Minify `app.js`.
        terser: {
            options: {
                ecma: 2015,
                compress: {
                    booleans_as_integers: true,
                    drop_console: true
                },
                format: {
                    comments: false
                }
            },
            dist: {
                files: [
                    {
                        '<%= paths.dest.js %>app.js': ['<%= paths.dest.js %>app.js']
                    }
                ]
            }
        },

        // Directories watched and tasks performed by invoking `grunt watch`.
        watch: {
            sass: {
                files: '<%= paths.src.sass %>**/*.scss',
                tasks: 'css'
            },
            js: {
                files: '<%= paths.src.js %>**',
                tasks: [
                    'jshint',
                    'browserify',
                    'terser'
                ]
            },
            html: {
                files: [
                    '<%= paths.src.templates %>**'
                ],
                tasks: [
                    'copy:html',
                    'replace'
                ]
            }
        }

    });

    // Register tasks.
    grunt.registerTask('build', ['clean', 'concurrent', 'terser', 'css']);
    grunt.registerTask('build-production', ['clean', 'concurrent', 'terser', 'css-production']);
    grunt.registerTask('css', ['stylelint', 'sass', 'postcss']);
    grunt.registerTask('css-production', ['stylelint', 'sass', 'purgecss', 'postcss']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('html', ['copy:html', 'copy:img']);
};
