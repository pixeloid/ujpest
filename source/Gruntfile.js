/**
    Teleítpés: npm install
    Futtatás: grunt dev (figyeli a fajlokat)
    Sprite: grunt sprite (ha a grunt dev-et futtatod az figyeli a spriteokat is)
    Minden egyben (egyszer fut le): grunt
    Ha spriteolni akarsz, akkor dobald be a képeket a "sprite" mappába
    Minden tevékenységnek a style mappán belül kell történnie
    Ha új libet akarsz bevezetni, akkor a "vendor" mappába kell rakni és a Gruntfile.js-be behúzni (ha kell)

    Have a nice day
 */

var ProjectPath = 'ujpest-portal.dev.trendency.hu'; // {PROJEKT_NAME} - le kell cserélni az aktuális projekt path-ra
var build_dir = '../build/';

module.exports = function (grunt) {

    var testExp = /\{[a-zA-Z_]*/;
    if (testExp.test(ProjectPath)) {
        grunt.warn('Állítsd be a ProjektPath változót a Gruntfile.js-ben!');
    }

    grunt.initConfig({

        uglify: {
            options: {
                banner: '/*! Generated: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    vendor: {
                        src: ['../js/vendor.js'],
                        dest: build_dir + 'js/vendor.min.js'
                    },
                    main: {
                        src: ['../js/main.js'],
                        dest: build_dir + 'js/main.min.js'
                    }
                }
            }
        },

        copy: {
            options: {
            },
            fonts: {
                cwd: 'fonts',
                src: ['**/*'],
                dest: build_dir + 'fonts',
                expand: true
            },
            images: {
                cwd: 'images',
                src: ['**/*'],
                dest: build_dir + 'img',
                expand: true
            },
        },


        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: build_dir + 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: build_dir + 'css',
                    ext: '.min.css'
                }]
            }
        },

        less: {
            dev: {
                    // build_dir + 'css/bootstrap.css': [
                    //     'stylesheets/bootstrap.less'
                    // ],
                   // expand: true,
                src: ['stylesheets/style.less'],
                dest: build_dir + 'css/style.css'
            }
        },

        concat: {
            dev: {
                vendor: {
                    src: [
                        'vendor/jquery-2.1.1/jquery-2.1.1.js',

                        //'vendor/owl.carousel.2.0.0-beta.2.4/owl.carousel.js',

                        'vendor/bootstrap-3.2.0/js/transition.js',
                        'vendor/bootstrap-3.2.0/js/alert.js',
                        'vendor/bootstrap-3.2.0/js/button.js',
                        'vendor/bootstrap-3.2.0/js/collapse.js',
                        'vendor/bootstrap-3.2.0/js/modal.js',
                        'vendor/bootstrap-3.2.0/js/collapse.js',
                        'vendor/bootstrap-3.2.0/js/dropdown.js',
                        'vendor/bootstrap-3.2.0/js/tooltip.js',
                        'vendor/bootstrap-3.2.0/js/popover.js',
                        'vendor/bootstrap-3.2.0/js/tab.js',

                        'vendor/icheck-1.0.2/icheck.js',
                        'vendor/bootstrap-select/js/bootstrap-select.js',

                        'vendor/modernizr/modernizr.js',

                        'vendor/mmenu/js/jquery.mmenu.min.all.js',

                        'vendor/jquery.royalslider.js',
                        'vendor/swiper.jquery.js',
                        'vendor/star-rating.js',
                        'vendor/jquery.menu-aim.js',
                        'vendor/jquery.zoom.js',
                        'vendor/jquery.prodigal.js'
                    ],

                    dest: build_dir + 'js/vendor.js'
                },
                js: {
                    src: [
                        'js/widgets/*',
                        'js/plugins/*',
                        'js/main.js'
                    ],
                    dest: build_dir + 'js/main.js'
                },

                css: {
                    src: [
                        //'vendor/animatecss/animate.css',
                        'vendor/mmenu/css/jquery.mmenu.all.css'
                        //'vendor/owl.carousel.2.0.0-beta.2.4/assets/owl.carousel.css'
                    ],
                    dest: build_dir + 'css/vendor.css'
                }
            }
        },

        jshint: {
            options: {
                globals: {
                    jQuery: true
                }
            },
            all: ['js/**/*']
        },

        ftpush: {
            style: {
                auth: {
                    host: 'projekt.dev.trendency.hu',
                    port: 21,
                    authKey: 'key1'
                },
                src: build_dir + '/css',
                dest: '/' + ProjectPath + '/layout/css'
            },

            scripts: {
                auth: {
                    host: 'projekt.dev.trendency.hu',
                    port: 21,
                    authKey: 'key1'
                },
                src: build_dir + 'js',
                dest: '/' + ProjectPath + '/layout/js'
            },

            sprite: {
                auth: {
                    host: 'projekt.dev.trendency.hu',
                    port: 21,
                    authKey: 'key1'
                },
                src: build_dir + 'img',
                dest: '/' + ProjectPath + '/layout/img'
            }
        },


        glue: {
            options: {
                less: true,
                retina: true,
                url: 'img/',
                namespace: 'sprite',
                'sprite-namespace': '',
                padding: 1
            },
            sprite: {
                options: {
                    'sprite-namespace': 'trend',
                    less: 'less/common'
                },
                src: ['sprite'],
                dest: build_dir + 'img'
            }
        },

        watch: {
            styles: {
                files: ['stylesheets/**/*'],
                tasks: ['less:dev'/*, 'ftpush:style'*/]
            },

            scripts: {
                files: ['js/**/*'],
                tasks: ['concat:dev'/*, 'ftpush:scripts'*/]
            },

            sprite: {
                files: ['sprite/**/*'],
                tasks: ['sprite']
            },

            fonts: {
                files: ['fonts/**/*'],
                tasks: ['copy:fonts']
            },
            images: {
                files: ['images/**/*'],
                tasks: ['copy:images']
            },
            assemble: {
                files: ['views/**/*'],
                tasks: ['assemble']
            },
            options: {
                livereload: 11111
            }
        },
        assemble: {
            options: {
                flatten: true,
                assets: "path/to/assets",
                data: 'views/**/*.{json,yml}',
                layout: "views/layouts/default.hbs",
                partials: "views/partials/**/*.hbs",
            },
            site: {
                src: ["views/*.hbs" ],
                dest: build_dir
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: build_dir
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-ftpush');
    grunt.loadNpmTasks('grunt-glue-nu');
    grunt.loadNpmTasks('grunt-assemble');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'jshint', 'less:dev', 'assemble', 'concat:dev'/*, 'ftpush:style', 'ftpush:scripts'*/]);

    // Dev task
    grunt.registerTask('dev', ['default', 'connect', 'watch']);
    grunt.registerTask('sprite', ['glue', /*'ftpush:sprite', */'less:dev'/*, 'ftpush:style'*/]);
    grunt.registerTask('style', ['less:dev', 'concat:dev', 'ftpush:style']);

    // Deploy task
    grunt.registerTask('deploy', ['uglify', 'cssmin']);
};