'use strict';

import {browser, expect, $, $$} from '@wdio/globals';

describe('Checkbox elements', function() {
  let table;

  beforeEach(async function() {
    await browser.url(`${process.cwd()}/demo/index.html`);

    table = await $('.tidy-table').$('table');
  });

  describe('Global checkbox', function() {
    it('should handle event', async function() {
      const cbParent = await table.$('thead').$('th').$('input[type="checkbox"]');

      await expect(cbParent).toBeClickable({
        message: 'Select all rows, checkbox checked'
      });

      await cbParent.click();

      const rows = await table.$('tbody').$$('tr');

      for (let row of rows) {
        const cbChild = await row.$('input[type="checkbox"]');

        await expect(cbChild).toBeChecked({
          message: `Row ${row.rowIndex}: <td> checkbox is checked`
        });

        await expect(row).toHaveElementClass('check-on', {
          message: `Row ${row.rowIndex}: <tr> class 'check-on' is defined`
        });
      }

      await expect(cbParent).toBeClickable({
        message: 'Deselect all rows, checkbox unchecked'
      });

      await cbParent.click();

      for (let row of rows) {
        const cbChild = row.$('input[type="checkbox"]');

        await expect(cbChild).not.toBeChecked({
          message: `Row ${row.rowIndex}: <td> checkbox is unchecked`
        });

        await expect(row).toHaveElementClass('check-off', {
          message: `Row ${row.rowIndex}: <tr> class 'check-off' is defined`
        });
      }
    });
  });

  describe('Single checkbox', function() {
    it('should handle event', async function() {
      const rows = await table.$('tbody').$$('tr');

      for (let row of rows) {
        const cb = await row.$('input[type="checkbox"]');
        await cb.click();

        await expect(cb).toBeChecked({
          message: `Row ${row.rowIndex}: <td> checkbox is checked`
        });

        await expect(row).toHaveElementClass('check-on', {
          message: `Row ${row.rowIndex}: <tr> class 'check-on' is defined`
        });
      }

      for (let row of rows) {
        const cb = await row.$('input[type="checkbox"]');
        await cb.click();

        await expect(cb).not.toBeChecked({
          message: `Row ${row.rowIndex}: <td> checkbox is not checked`
        });

        await expect(row).toHaveElementClass('check-off', {
          message: `Row ${row.rowIndex}: <tr> class 'check-off' is not defined`
        });
      }
    });
  });
});
