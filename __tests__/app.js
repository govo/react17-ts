'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra')

describe('generator-react-gitlab:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withArguments(['appname','x'])
      .withPrompts({ someAnswer: true })
      .toPromise();
  });

  it('creates files',async () => {
    // let ls = fs.readFileSync('package.json')
    // console.log('ls:',new String(ls,'utf8'))

    assert.file(['.babelrc']);
    assert.file(['dist']);
    assert.file(['src']);
    assert.file(['package.json']);
  });
});
