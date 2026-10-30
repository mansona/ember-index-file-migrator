import { it, beforeEach, afterEach } from "vitest";
import { describe } from "vitest";
import { rmSync } from 'node:fs';
import input from './fixtures/input.js';
import { expect } from "vitest";
import { execa } from 'execa';

import { writeSync, readSync } from 'fixturify';
import { resolve } from "node:path";
import { mkdir } from "node:fs/promises";

const tmpPath = './tmp/ember-index-file-migrator'

describe('basic tests', () => {
  beforeEach(() => {
    rmSync(tmpPath, { recursive: true, force: true});
  })

  afterEach(() => {
    rmSync(tmpPath, { recursive: true, force: true});
  })

  it('works', async () => {
    await mkdir(tmpPath, {recursive: true})
    // Copy the input file to the temporary folder
    writeSync(tmpPath, input);

    const binPath = resolve('./bin/migrator.js')


    // execute the migrator
    await execa({cwd: resolve(tmpPath), preferLocal: true})`${binPath}`

    const result = readSync(tmpPath);

    expect(result).to.deep.equal({
      addon: {
        components: {
          'top-level-component.hbs': '{{!-- top-level-component.hbs --}}',
          'top-level-component.js': '// top-level-component.js',

          // we don't delete folders with this migrator so we expect an empty folder here
          'top-level-component': {},
          
          'template-only-component.hbs': '{{!-- template-only-component.hbs --}}',

          // we don't delete folders with this migrator so we expect an empty folder here
          'template-only-component': {},

          'parent-component.hbs': '{{!-- parent-component.hbs --}}',
          'parent-component.js': '// parent-component.js',
          'parent-component': {
            'child-component.hbs': '{{!-- parent-component/child-component.hbs --}}',
            'child-component.js': '// parent-component/child-component.js',
            'child-component': {
              'grandchild-component.hbs': '{{!-- parent-component/child-component/grandchild-component.hbs --}}',
              'grandchild-component.js': '// parent-component/child-component/grandchild-component.js', 

              // we don't delete folders with this migrator so we expect an empty folder here
              'grandchild-component': {}
            },
          },

          // we don't delete folders with this migrator so we expect an empty folder here
          'gjs-component': {},
          "gjs-component.gjs": "// this is a gjs file",

          nested1: {
            'nested-component.hbs': '{{!-- nested1/nested-component.hbs --}}',
            'nested-component.js': '// nested1/nested-component.js',

            // we don't delete folders with this migrator so we expect an empty folder here
            'nested-component': {},
            nested2: {
              'super-nested-component.hbs': '{{!-- nested1/nested2/super-nested-component.hbs --}}',
              'super-nested-component.js': '// nested1/nested2/super-nested-component.js',

              // we don't delete folders with this migrator so we expect an empty folder here
              'super-nested-component': {},
            },
          },
        },
      },
    })
  })
})