'use strict';

import {browser, expect, $, $$} from '@wdio/globals';

describe('Sort', function() {
  let table;

  beforeEach(async function() {
    await browser.url(`${process.cwd()}/demo/index.html`);

    table = await $('.tidy-table').$('table');
  });

  describe('Click event (ascending/descending)', function() {
    it('should handle event', async function() {
      const row = await table.$('thead').$$('tr')[0];

      let colBody, colHead, result, rows;

      // Select pre-ordered "Rank" column.
      colHead = row.$('th[title="Rank"]');

      await expect(colHead).not.toHaveElementClass('arrow-down', {
        message: '<tr> class "arrow-down" is not defined'
      });

      await expect(colHead).not.toHaveElementClass('arrow-up', {
        message: '<tr> class "arrow-up" is not defined'
      });

      await colHead.click(); // descending

      await expect(colHead).not.toHaveElementClass('arrow-down', {
        message: '<tr> class "arrow-down" is not defined'
      });

      await expect(colHead).toHaveElementClass('arrow-up', {
        message: '<tr> class "arrow-up" is defined'
      });

      rows = await table.$('tbody').$$('tr');

      colBody = rows[0].$('td:nth-child(2)');
      result  = '5';

      await expect(colBody).toHaveText(result, {
        message: `Output expected is "${result}"`
      });

      colBody = rows[1].$('td:nth-child(2)');
      result  = '4';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[2].$('td:nth-child(2)');
      result  = '3';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[3].$('td:nth-child(2)');
      result  = '2';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[4].$('td:nth-child(2)');
      result  = '1';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      await colHead.click(); // ascending

      await expect(colHead).toHaveElementClass('arrow-down', {
        message: '<tr> class "arrow-down" is defined'
      });

      await expect(colHead).not.toHaveElementClass('arrow-up', {
        message: '<tr> class "arrow-up" is not defined'
      });

      rows = await table.$('tbody').$$('tr');

      colBody = rows[0].$('td:nth-child(2)');
      result  = '1';

      await expect(colBody).toHaveText(result, {
        message: `Output expected is "${result}"`
      });

      colBody = rows[1].$('td:nth-child(2)');
      result  = '2';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[2].$('td:nth-child(2)');
      result  = '3';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[3].$('td:nth-child(2)');
      result  = '4';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[4].$('td:nth-child(2)');
      result  = '5';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      // Select "Programming Language" column.
      colHead = row.$('th[title="Programming Language"]');

      await colHead.click(); // descending

      await expect(colHead).not.toHaveElementClass('arrow-down', {
        message: '<tr> class "arrow-down" is not defined'
      });

      await expect(colHead).toHaveElementClass('arrow-up', {
        message: '<tr> class "arrow-up" is defined'
      });

      rows = await table.$('tbody').$$('tr');

      colBody = rows[0].$('td:nth-child(3)');
      result  = 'Objective-C';

      await expect(colBody).toHaveText(result, {
        message: `Output expected is "${result}"`
      });

      colBody = rows[1].$('td:nth-child(3)');
      result  = 'Java';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[2].$('td:nth-child(3)');
      result  = 'C++';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[3].$('td:nth-child(3)');
      result  = 'C#';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[4].$('td:nth-child(3)');
      result  = 'C';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      await colHead.click(); // ascending

      await expect(colHead).toHaveElementClass('arrow-down', {
        message: '<tr> class "arrow-down" is defined'
      });

      await expect(colHead).not.toHaveElementClass('arrow-up', {
        message: '<tr> class "arrow-up" is not defined'
      });

      rows = await table.$('tbody').$$('tr');

      colBody = rows[0].$('td:nth-child(3)');
      result  = 'C';

      await expect(colBody).toHaveText(result, {
        message: `Output expected is "${result}"`
      });

      colBody = rows[1].$('td:nth-child(3)');
      result  = 'C#';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[2].$('td:nth-child(3)');
      result  = 'C++';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[3].$('td:nth-child(3)');
      result  = 'Java';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[4].$('td:nth-child(3)');
      result  = 'Objective-C';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      // Select "Ratings Jan 2012" column.
      colHead = row.$('th[title="Ratings Jan 2012"]');

      await colHead.click(); // descending

      await expect(colHead).not.toHaveElementClass('arrow-down', {
        message: '<tr> class "arrow-down" is not defined'
      });

      await expect(colHead).toHaveElementClass('arrow-up', {
        message: '<tr> class "arrow-up" is defined'
      });

      rows = await table.$('tbody').$$('tr');

      colBody = rows[0].$('td:nth-child(4)');
      result  = '17.479%';

      await expect(colBody).toHaveText(result, {
        message: `Output expected is "${result}"`
      });

      colBody = rows[1].$('td:nth-child(4)');
      result  = '16.976%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[2].$('td:nth-child(4)');
      result  = '8.781%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[3].$('td:nth-child(4)');
      result  = '8.063%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[4].$('td:nth-child(4)');
      result  = '6.919%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      await colHead.click(); // ascending

      await expect(colHead).toHaveElementClass('arrow-down', {
        message: '<tr> class "arrow-down" is defined'
      });

      await expect(colHead).not.toHaveElementClass('arrow-up', {
        message: '<tr> class "arrow-up" is not defined'
      });

      rows = await table.$('tbody').$$('tr');

      colBody = rows[0].$('td:nth-child(4)');
      result  = '6.919%';

      await expect(colBody).toHaveText(result, {
        message: `Output expected is "${result}"`
      });

      colBody = rows[1].$('td:nth-child(4)');
      result  = '8.063%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[2].$('td:nth-child(4)');
      result  = '8.781%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[3].$('td:nth-child(4)');
      result  = '16.976%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[4].$('td:nth-child(4)');
      result  = '17.479%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      // Select "Delta Jan 2012" column.
      colHead = row.$('th[title="Delta Jan 2012"]');

      await colHead.click(); // descending

      await expect(colHead).not.toHaveElementClass('arrow-down', {
        message: '<tr> class "arrow-down" is not defined'
      });

      await expect(colHead).toHaveElementClass('arrow-up', {
        message: '<tr> class "arrow-up" is defined'
      });

      rows = await table.$('tbody').$$('tr');

      colBody = rows[0].$('td:nth-child(5)');
      result  = '+3.91%';

      await expect(colBody).toHaveText(result, {
        message: `Output expected is "${result}"`
      });

      colBody = rows[1].$('td:nth-child(5)');
      result  = '+2.55%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[2].$('td:nth-child(5)');
      result  = '+1.15%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[3].$('td:nth-child(5)');
      result  = '-0.29%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[4].$('td:nth-child(5)');
      result  = '-0.72%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      await colHead.click(); // ascending

      await expect(colHead).toHaveElementClass('arrow-down', {
        message: '<tr> class "arrow-down" is defined'
      });

      await expect(colHead).not.toHaveElementClass('arrow-up', {
        message: '<tr> class "arrow-up" is not defined'
      });

      rows = await table.$('tbody').$$('tr');

      colBody = rows[0].$('td:nth-child(5)');
      result  = '-0.72%';

      await expect(colBody).toHaveText(result, {
        message: `Output expected is "${result}"`
      });

      colBody = rows[1].$('td:nth-child(5)');
      result  = '-0.29%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[2].$('td:nth-child(5)');
      result  = '+1.15%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[3].$('td:nth-child(5)');
      result  = '+2.55%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });

      colBody = rows[4].$('td:nth-child(5)');
      result  = '+3.91%';

      await expect(colBody).toHaveText(result, {
         message: `Output expected is "${result}"`
      });
    });
  });
});
