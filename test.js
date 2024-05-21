import { fileURLToPath } from "url";
import { dirname } from "path";
import path from 'path';
import sqliter from './index.js';

const dbFilePath = path.resolve(dirname(fileURLToPath(import.meta.url)), 'test.db');


main()

async function main() {
    const db = new sqliter();
    await db.init(dbFilePath);
    await db.run('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)');
    await db.run('INSERT INTO test (name) VALUES (?)', ['test']);
    const result = await db.all('SELECT * FROM test');
    console.log(result);
}
