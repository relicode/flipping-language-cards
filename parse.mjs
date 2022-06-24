#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises'
import { parse } from 'csv-parse'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const parseCsvFile = async (csvFilePath) => new Promise((res, rej) => {
  const records = []
  readFile(csvFilePath).then((fileBuffer) => {
    const parser = parse(fileBuffer, {
      encoding: 'utf8',
      delimiter: ',',
    })

    parser.on('readable', () => {
      while (true) {
        const record = parser.read()
        if (record === null) { break }
        records.push(record)
      }
    })
    parser.on('error', (err) => rej(err))
    parser.on('end', () => res(records))
  })
})

;(async () => {
  const workDir = dirname(fileURLToPath(import.meta.url))
  const src = join(workDir, 'data.csv')
  const dst = join(workDir, 'src', 'services', 'cards', 'library.json')
  const [headers, ...contentRows] = await parseCsvFile(src)
  const [, ...languages] = headers
  writeFile(dst, JSON.stringify({ contentRows, languages }, null, 2))
  console.log(`Successfully wrote ${contentRows.length} cards in ${languages.length} languages to ${dst}`)
})()
