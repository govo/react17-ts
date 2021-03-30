"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const fse = require("fs-extra");

module.exports = class extends Generator {
  constructor(...args) {
    super(...args);
    // This makes `appname` a required argument.
    this.argument("appname", { type: String, required: true });
    // And you can then access it later on this way; e.g. CamelCased
    this.appname = this.appname.toLowerCase();
    // Console.log('appname:', this.appname)
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`欢迎使用 ${chalk.red("generator-react-gitlab")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "项目名字?",
        default: this.appname
      },
      {
        type: "confirm",
        name: "useRouter",
        message: "是否使用路由?",
        default: true
      },
      {
        type: "confirm",
        name: "useYarn",
        message: "是否使用yarn?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  default() {
    // Console.log('in default')
  }

  async writing() {
    // Console.log(this.templatePath('./'))
    // fs.copy(srcDir, destDir, { overwrite: true }, function (err) {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log("success!");
    //   }
    // });
    // this.fs.copy(
    //   this.templatePath('/dist'),
    //   this.destinationPath('/dist')
    // );
    await fse.copy(this.templatePath("./"), this.destinationPath("./"));
    await fse.unlink(this.destinationPath("package.json"));
    this._writingPackageJSON();
  }

  // 以下划线_开头的是私有方法
  _writingPackageJSON() {
    // This.fs.copyTpl(from, to, context)
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        name: this.props.name,
        description: this.props.description,
        keywords: this.props.keywords ? this.props.keywords.split(",") : "",
        author: this.props.author,
        email: this.props.email,
        repository: this.props.repository,
        homepage: this.props.homepage,
        license: this.props.license
      }
    );
  }

  install() {
    // This.installDependencies();
    // this.npmInstall();  // ask user to run yarn or npm
    // if (this.props.useYarn) {
    //   this.spawnCommand('yarn', ['install']);
    // } else {
    //   this.npmInstall();
    // }
    // todo: check if yarn is install then use it
    // use spawn command check
  }
};
