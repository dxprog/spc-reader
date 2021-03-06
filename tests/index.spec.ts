import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';

import { ISpc } from '../src/common';
import Spc from '../src/spc';
import SpcReader from '../src';

const FIXTURE_PATH = path.resolve(__dirname, 'fixtures/fanfare.spc');

describe('index tests', () => {
  let assertSpc: ISpc;
  let fileData: Buffer;
  before(() => {
    fileData = fs.readFileSync(FIXTURE_PATH);
    assertSpc = new Spc(fileData);
  });

  it('should create an SPC object from a file path', async () => {
    const createdSpc: ISpc = await SpcReader(FIXTURE_PATH);
    expect(createdSpc).to.eql(assertSpc);
  });

  it('should create an SPC object from a buffer', async () => {
    const createdSpc: ISpc = await SpcReader(fileData);
    expect(createdSpc).to.eql(assertSpc);
  });

  it('should catch and re-throw file read errors', async () => {
    try {
      await SpcReader(path.resolve(__dirname, 'fixtures/404'));
      expect(true).to.eq(false, 'failed to rethrow file system error');
    } catch (e) {
      expect(e.message).to.contain('Error reading SPC file:');
    }
  });
});
