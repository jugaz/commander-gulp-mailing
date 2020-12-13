#!/usr/bin/env node

'use strict';

const
    debug = require('gulp-debug'),
    inlineCSS = require('gulp-inline-css'),
    path = require('path'),
    gulpPugBeautify = require('gulp-pug-beautify'),
    program = require('commander'),
    pug = require('gulp-pug'),
    util = require('gulp-util'),
    { src, dest, series, parallel } = require("gulp");


/* ######################## OPTIONS ######################## */
var options = {};


/* ######################## VERSION ######################## */
program

    .version(
        'commander-gulp-mailing version: ' + require('../package.json').version + '\n'
    )


/* ######################## GULP MAILING ######################## */
// node ./bin/mailing.js mailing \"frontend/src/templates/*.pug\" \"frontend/src/templates/**/*.pug\" --m \"docs/\""'

program
    .command('mailing <input>')
    .option("--m [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var output = options.output || options.m;

       
        
        input = input.filter(function (index, value) {
            if (path.extname(index) == ".pug") {
                return index;
            }

        });
        return src(input, { allowEmpty: true })
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
            .pipe(dest(output))
            .on('end', function () {
                util.log('Done!');
            });;
        

    })
program
    .command('prod:mailing <input>')
    .option("--m [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var output = options.output || options.m;

       
        
        input = input.filter(function (index, value) {
            if (path.extname(index) == ".pug") {
                return index;
            }

        });
        return src(input, { allowEmpty: true })
            .pipe(debug({
                title: 'commander-gulp-mailing production:'
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
            .pipe(gulpPugBeautify())
            .pipe(dest(output))
            .on('end', function () {
                util.log('Done!');
            });;
        

    })
   
program.parse(process.argv);