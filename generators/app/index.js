'use strict'

const Generator = require('yeoman-generator')
const yosay = require('yosay')
const validators = require('../../libs/validators')
const path = require('path')

module.exports = class extends (
  Generator
) {
  constructor(args, opts) {
    super(args, opts)
    this.option('number', { type: Number })
    this.option('name', { type: String })

    this.extensionConfig = Object.create(null)
    this.extensionConfig.installDependencies = false
  }

  initializing() {
    // Welcome
    this.log(yosay('Scaffolding web site project with \n Sanity CMS & @11ty SSG!'))

    //this.extensionConfig.type = 'lerna-quickstart'
  }
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
      {
        type: 'confirm',
        name: 'cool',
        message: 'Would you like to enable the Cool feature?',
      },
    ])

    this.log('app name', answers.name)
    this.log('cool feature', answers.cool)
  }
  writing() {
    this.fs.copyTpl(this.sourceRoot(), './')
  }

  method1() {
    this.log(this.sourceRoot())
    this.log('method 1 just ran')
  }

  method2() {
    this.log('method 2 just ran')
  }
  // End
  end() {
    // Git init
    if (this.extensionConfig.gitInit) {
      this.spawnCommand('git', ['init', '--quiet'])
    }

    this.log('')
    this.log('Your project ' + this.extensionConfig.name + ' has been created!')
    this.log('')
  }
}
