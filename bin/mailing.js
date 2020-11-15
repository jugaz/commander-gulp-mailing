#!/usr/bin/env node

'use strict';

var
    autoprefixer = require('autoprefixer'),
    debug = require('gulp-debug'),
    fs = require('fs'),
    gulp = require('gulp'),
    inlineCSS = require('gulp-inline-css'),
    less = require('gulp-less'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    postcss = require('gulp-postcss'),
    program = require('commander'),
    pug = require('gulp-pug'),
    rimraf = require('rimraf'),
    sass = require('gulp-sass'),
    stylus = require('gulp-stylus'),
    util = require('gulp-util');


const { dirname } = require('path');

var Plugins = [
    autoprefixer({
        overrideBrowserslist: ['last 20 version']
    })
];


/* ######################## OPTIONS ######################## */
var options = {};


/* ######################## VERSION ######################## */
program

    .version(
        'commander-gulp-mailing version: ' + require('../package.json').version + '\n'
    )
    .option('-m, --mkdirp <path>', 'create folder', createFolder)
    .option('-r, --rimraf <path>', 'delete folder', deleteFolder)


/* ######################## CREATE FOLDERS ######################## */
function createFolder(dir) {
    mkdirp(dir, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log(dir)
        }
    })
}


/* ######################## DELETE FOLDERS ######################## */
function deleteFolder(dir) {
    rimraf(dir, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log(dir)
        }
    })
}
/* ######################## COMMANDER SCSS ######################## */
/*"node ./bin/styles.js scss \"frontend/src/static/styles/*.scss\" \"frontend/src/static/styles//*.scss\" --sc \"docs/styles/\""*/

program
    .command('scss <input>')
    .option("--sc [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var output = options.ouput || options.sc;
        input = input.filter(function (index, value) {
            if (index.slice((index.lastIndexOf(".") - 1 >>> 0) + 2) == "scss") {
                return index;
            }
        });
        console.log("input",input)
        console.log("output",output)


        return gulp.src(input, { allowEmpty: true })
            .pipe(debug({
                title: 'commader-gulp-mailing-styles:'
            }))
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .on('error', function (error) {
                // tenemos un error 
                util.log("Error Name:", error.name);
                util.log("Error Code:", error.code);
                util.log("Error Filename:", error.filename);
                util.log("Error Line:", error.line);
                util.log("Error Column:", error.column);
                util.log("Error Msg", error.Msg);


            })
            .pipe(postcss(Plugins))
            .pipe(gulp.dest(output))
            .on('end', function () {
                util.log('Done!');
            });




    })

/* ######################## GULP MAILING ######################## */
// node ./bin/mailing.js mailing \"frontend/src/templates/*.pug\" \"frontend/src/templates/**/*.pug\" --m \"docs/\""'
program
    .command('mailing <input>')
    .option("--m [options]")
    .action(async (input, options) => {
        var input = options.input || options.parent.rawArgs;
        var output = options.output || options.m;

       
        
        input = input.filter(function (index, value) {
            if (index.slice((index.lastIndexOf(".") - 1 >>> 0) + 2) == "pug") {
                return index;
            }

        });
        return gulp.src(input, { allowEmpty: true })
            .pipe(debug({
                title: 'commander-gulp-mailing:'
            }))
            .pipe(pug())
            .on('error', function (error) {
                // tenemos un error 
                util.log("Error Name:", error.name);
                util.log("Error Code:", error.code);
                util.log("Error Filename:", error.filename);
                util.log("Error Line:", error.line);
                util.log("Error Column:", error.column);
                util.log("Error Msg", error.Msg);


            })
            
            .pipe(inlineCSS())
            .pipe(gulp.dest(output))
            .on('end', function () {
                util.log('Done!');
            });;
        

    })
program.parse(process.argv);
