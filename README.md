# W1 Sqliter

This is a small wrapper for easy use of the sqlite 3 database.

## How to use

### Install

```bash
npm install w1-sqliter
```

### Example usage

```javascript
import sqliter from 'w1-sqliter'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const dbFilePath = path.resolve(dirname(fileURLToPath(import.meta.url)), 'test.db')

main()

async function main() {
    const db = sqliter.getInstance()
    await db.init(dbFilePath)

    // create table if not exists with auto increment primary key
    await db.run('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)')

    await db.run('INSERT INTO test (name) VALUES (?)', ['John Doey'])

    const rows = await db.all('SELECT * FROM test')
    console.log(rows)
}
```
