'use strict';

import {browser, expect, $, $$} from '@wdio/globals';

describe('Menu element', function() {
  let table, menu, output;

  beforeEach(async function() {
    await browser.url(`${process.cwd()}/demo/index.html`);

    table  = await $('.tidy-table').$('table');
    menu   = await $('.tidy-table').$('select.options');
    output = await $('#output');
  });

  describe('Events', function() {
    describe('Select option', function() {
      describe('Callback 1', function() {
        describe('no rows selected', function() {
          it('should handle event', async function() {
            const rows = await table.$('tbody').$$('tr');

            for (let row of rows) {
              const cb = await row.$('td').$('input[type="checkbox"]');

              await expect(cb).not.toBeChecked({
                message: `Row ${row.rowIndex}: <td> checkbox is not checked`
              });

              await expect(row).not.toHaveElementClass('check-off', {
                message: `Row ${row.rowIndex}: <tr> class 'check-off' is not defined`
              });

              await expect(row).not.toHaveElementClass('check-on', {
                message: `Row ${row.rowIndex}: <tr> class 'check-on' is not defined`
              });
            }

            await menu.selectByIndex(1);

            const result = 'MENU: callback1(rows=0)';

            await expect(output).toHaveText(result, {
              message: `Output expected is '${result}'`
            });
          });
        });

        describe('random rows selected', function() {
          it('should handle event', async function() {
            let count = 0;

            const rows = await table.$('tbody').$$('tr');

            for (let row of rows) {
              if (randBool() === true) {
                const cb = await row.$('td').$('input[type="checkbox"]');
                await cb.click();
                count++;
              }
            }

            await menu.selectByIndex(1);

            const result = `MENU: callback1(rows=${count})`;

            expect(output).toHaveText(result, {
              message: `Output expected is '${result}'`
            });
          });
        });
      });

      describe('Callback 2', function() {
        describe('no rows selected', function() {
          it('should handle event', async function() {
            const rows = await table.$('tbody').$$('tr');

            for (let row of rows) {
              const cb = await row.$('td').$('input[type="checkbox"]');

              await expect(cb).not.toBeChecked({
                message: `Row ${row.rowIndex}: <td> checkbox is not checked`
              });

              await expect(row).not.toHaveElementClass('check-off', {
                message: `Row ${row.rowIndex}: <tr> class 'check-off' is not defined`
              });

              await expect(row).not.toHaveElementClass('check-on', {
                message: `Row ${row.rowIndex}: <tr> class 'check-on' is not defined`
              });
            }

            await menu.selectByIndex(2);

            const result = 'MENU: callback2(rows=0)';

            await expect(output).toHaveText(result, {
              message: `Output expected is '${result}'`
            });
          });
        });

        describe('random rows selected', function() {
          it('should handle event', async function() {
            let count = 0;

            const rows = await table.$('tbody').$$('tr');

            for (let row of rows) {
              if (randBool() === true) {
                const cb = await row.$('td').$('input[type="checkbox"]');
                await cb.click();
                count++;
              }
            }

            await menu.selectByIndex(2);

            const result = `MENU: callback2(rows=${count})`;

            await expect(output).toHaveText(result, {
              message: `Output expected is '${result}'`
            });
          });
        });
      });
    });

    describe('Post-process', function() {
      it('should handle event', async function() {
        const option = await menu.selectByVisibleText('Test');

        expect(option).toBeDisplayed();
      });
    });
  });
});

/**
 * Return pseudo-random boolean.
 *
 * @return {Boolean}
 */
function randBool() {
  return Math.random() < 0.5;
}
