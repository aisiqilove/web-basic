#!/usr/bin/env node
const program = require('commander')
console.log('cli.....')
program.version(require("../package").version)

program
    .command('init <name>')
    .description("init project")
    .action(require('../lib/init'))

program
    .command('refresh')
    .description("refresh")
    .action(require('../lib/refresh'))

program.parse(program.argv)