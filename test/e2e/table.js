'use strict';

import {browser, expect, $, $$} from '@wdio/globals';

describe('Table results', function() {
  let table, output;

  beforeEach(async function() {
    await browser.url(`${process.cwd()}/demo/index.html`);

    table  = await $('.tidy-table').$('table');
    output = await $('#output');
  });

  describe('Events', function() {
    describe('Post-process', function() {
      describe('table', function() {
        it('should handle event', async function() {
          await table.doubleClick();

          const result = 'TABLE: post-process(table)';

          await expect(output).toHaveText(result, {
            message: `Output expected is '${result}'`
          });
        });
      });

      describe('column', function() {
        it('should handle event', async function() {
          const col = await table.$('tbody').$$('tr')[0].$$('td')[1];
          await col.click();

          const text = await col.getHTML(false);

          const result = `COL: post-process(text="${text}")`;

          await expect(output).toHaveText(result, {
            message: `Output expected is '${result}'`
          });
        });
      });
    });
  });
});
