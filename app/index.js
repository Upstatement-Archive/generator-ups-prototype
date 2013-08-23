'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var UpsPrototypeGenerator = module.exports = function UpsPrototypeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ npm: false });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(UpsPrototypeGenerator, yeoman.generators.Base);

UpsPrototypeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'What is the name of your project?'
  },{
    type: 'confirm',
    name: 'usesTypekit',
    message: 'Will you be using Tyepkit?',
    default: false
  },{
    type: 'confirm',
    name: 'needsOldIESupport',
    message: 'Do you need support for versions of IE older than IE9?',
    default: false
  },{
    type: 'confirm',
    name: 'usesSassProjectFiles',
    message: 'Do you want to use boilerplate SASS project files?',
    default: false
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.usesTypekit = props.usesTypekit;
    this.needsOldIESupport = props.needsOldIESupport;
    this.usesSassProjectFiles = props.usesSassProjectFiles;

    cb();
  }.bind(this));
};

UpsPrototypeGenerator.prototype.app = function app() {
  this.mkdir('js');
  this.mkdir('components');

  this.mkdir('sass');

  if(this.usesSassProjectFiles) {
    this.mkdir('sass/project');
    this.copy('sass-project-files/_buttons.scss', 'sass/project/_buttons.scss');
    this.copy('sass-project-files/_dropdowns.scss', 'sass/project/_dropdowns.scss');
    this.copy('sass-project-files/_fonts.scss', 'sass/project/_fonts.scss');
    this.copy('sass-project-files/_forms.scss', 'sass/project/_forms.scss');
    this.copy('sass-project-files/_lists.scss', 'sass/project/_lists.scss');
    this.copy('sass-project-files/_modals.scss', 'sass/project/_modals.scss');
    this.copy('sass-project-files/_print.scss', 'sass/project/_print.scss');
    this.copy('sass-project-files/_respond.scss', 'sass/project/_respond.scss');
    this.copy('sass-project-files/_tables.scss', 'sass/project/_tables.scss');
    this.copy('sass-project-files/_tabs.scss', 'sass/project/_tabs.scss');
    this.copy('sass-project-files/_tooltips.scss', 'sass/project/_tooltips.scss');
    this.copy('sass-project-files/_type.scss', 'sass/project/_type.scss');
    this.copy('sass-project-files/_variables.scss', 'sass/project/_variables.scss');
  }

  this.mkdir('css');
  this.mkdir('img');

  this.copy('_app.js', 'js/app.js');
  this.copy('_screen.scss', 'sass/screen.scss');
  this.copy('_screen.css', 'css/screen.css');

  var context = {
    projectName: this.projectName,
    usesTypekit: this.usesTypekit,
    needsOldIESupport: this.needsOldIESupport
  }

  this.template('_bower.json', 'bower.json', context);
  this.template('_index.html', 'index.html', context);
  this.template('_README.md', 'README.md', context);
};

UpsPrototypeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('bowerrc', '.bowerrc');
  this.copy('_config.rb', 'config.rb');
};
