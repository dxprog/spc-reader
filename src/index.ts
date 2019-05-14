import * as fs from 'fs';

import Spc from './spc';

/**
 * Awaitable wrapper around readFile
 *
 * @param fileName Name of file to read
 */
async function readFileAsync(fileName: string): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject)=> {
    fs.readFile(fileName, (err, data: Buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * Reads an SPC file and returns a parsed Spc object.
 *
 * @param spc File path or data of SPC file
 * @returns {Spc} The parsed SPC object
 */
export default async function SpcReader(spc: string | Buffer): Promise<Spc> {
  let buffer: Buffer = <Buffer>spc;
  if (typeof spc === 'string') {
    try {
      buffer = await readFileAsync(spc);
    } catch (e) {
      throw new Error(`Error reading SPC file: ${e}`);
    }
  }

  return new Spc(buffer);
}
