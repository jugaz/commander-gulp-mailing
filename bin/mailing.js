#!/usr/bin/env node

'use strict';

var
    debug = require('gulp-debug'),
    gulp = require('gulp'),
    inlineCSS = require('gulp-inline-css'),
    inlineSource = require('gulp-inline-source'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    program = require('commander'),
    pug = require('gulp-pug'),
    rimraf = require('rimraf'),
    util = require('gulp-util');

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

/* ######################## GULP MAILING ######################## */
// node ./bin/mailing.js mailing \"frontend/src/templates/*.pug\" \"frontend/src/templates/**/*.pug\" --m \"docs/\""'
program
    .command('mailing <input>')
    .option("--m [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var ouput = options.ouput || options.m;
        input = input.filter(function (index, value) {
            if (index.slice((index.lastIndexOf(".") - 1 >>> 0) + 2) == "pug") {
                return index;
            }

        });
        return gulp.src(input)
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
            .pipe(inlineSource())
            .pipe(inlineCSS({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true,
            }))
            
      
            .pipe(gulp.dest(ouput))
            .on('end', function () {
                util.log('Done!');
            });;
        

    })
program.parse(process.argv);
