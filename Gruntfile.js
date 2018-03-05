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
                dest: './public_html/build/libs.js'
            },
            app: {
                src: [
                    "./src/js/js.js"
                ],
                dest: './public_html/build/js.js'
            }
        },
        uglify: {
            libs: {
                src: './public_html/build/libs.js',
                dest: './public_html/build/libs.min.js'
            },
            app: {
                src: './public_html/build/js.js',
                dest: './public_html/build/js.min.js'
            }
        },
        concat_css: {
            libs: {
                src: [
                    "./node_modules/normalize.css/normalize.css"
                ],
                dest: './public_html/build/libs.css'
            },
            app: {
                src: [
                    "./src/css/view.css",
                    "./src/css/person.css",
                    "./src/css/tooltip.css"
                ],
                dest: "./public_html/build/css.css"
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
                    'public_html/build/': './public_html/build/css.css'
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
                src: ['./public_html/build/css.css'],
                dest: './public_html/build/',
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
                    './public_html/build/css.min.css': ['./public_html/build/css.css'],
                    './public_html/build/libs.min.css': ['./public_html/build/libs.css']
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