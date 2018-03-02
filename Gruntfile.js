module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            options: {
                reload: true,
                livereload: true,
                debounceDelay: 250
            },
            files: ['./src/js/**/*.js', './src/css/**/*.css'],
            tasks: ['app']
        },
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            libs: {
                src: [
                    "bower_components/jquery/dist/jquery.js"
                ],
                dest: './src/build/libs.js'
            },
            app: {
                src: [
                    "./src/js/js.js"
                ],
                dest: './src/build/js.js'
            }
        },
        uglify: {
            libs: {
                src: './src/build/libs.js',
                dest: './src/build/libs.min.js'
            },
            app: {
                src: './src/build/js.js',
                dest: './src/build/js.min.js'
            }
        },
        concat_css: {
            libs: {
                src: [
                    "./node_modules/normalize.css/normalize.css"
                ],
                dest: './src/build/libs.css'
            },
            app: {
                src: [
                    "./src/css/view.css",
                    "./src/css/person.css",
                    "./src/css/tooltip.css"
                ],
                dest: "./src/build/css.css"
            }
        },
        imagemin: {
            prod: {
                files: [{
                    expand: true,
                    cwd: './src/css/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: './src/css/images-build/'
                }]
            }
        },
        'string-replace': {
            prod: {
                files: {
                    'src/build/': './src/build/css.css'
                },
                options: {
                    replacements: [{
                        pattern: /images/g,
                        replacement: '../css/images-build'
                    }]
                }
            }
        },
        dataUri: {
            prod: {
                src: ['./src/build/css.css'],
                dest: './src/build/',
                options: {
                    target: [
                        './src/css/images-build/**/*.*'
                    ],
                    baseDir: './src/css/',
                    maxBytes: 2048000
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    './src/build/css.min.css': ['./src/build/css.css'],
                    './src/build/libs.min.css': ['./src/build/libs.css']
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-data-uri');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'concat',
        'uglify',
        'concat_css',
        'imagemin',
        'string-replace',
        'dataUri',
        'cssmin'
    ]);

    grunt.registerTask('app', [
        'concat:app',
        'uglify:app',
        'concat_css:app',
        'string-replace',
        'dataUri',
        'cssmin'
    ]);
};