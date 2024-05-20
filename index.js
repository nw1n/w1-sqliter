import sqlite3 from 'sqlite3';

// JS DOC for Sqliter class, describe the getInstace method

/**
 * @class Sqliter
 * @description Sqliter class to interact with SQLite database
 */
export default class Sqliter {
    static instance = null;
    db = null;
    dbFilePath = null;

    /**
     * @returns {Sqliter} Sqliter instance
     */
    static getInstance() {
        if (Sqliter.instance == null) {
            Sqliter.instance = new Sqliter();
        }
        return this.instance;
    }

    async init(dbFilePath) {
        this.dbFilePath = dbFilePath;
        this.db = await openDatabase(dbFilePath);
        return Sqliter.getInstance();
    }

    async all(sql, params = []) {
        console.log(this.db);
        return await all(this.db, sql, params);
    }

    async get(sql, params = []) {
        return await get(this.db, sql, params);
    }

    async run(sql, params = []) {
        return await run(this.db, sql, params);
    }

    async map(sql, params = []) {
        return await map(this.db, sql, params);
    }

    async close() {
        return await close(this.db);
    }
}

// Function to open the database
function openDatabase(filename) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(filename, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
}

// Function to run a SQL query and retrieve all rows
function all(db, sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Same as all, but returns rows as objects with key-value pairs
function map(db, sql, params = [], callback) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}


// Function to run a SQL query and retrieve a single row
function get(db, sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

// Function to run a SQL query that doesn't return data (e.g., INSERT, UPDATE, DELETE)
function run(db, sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ lastID: this.lastID, changes: this.changes });
            }
        });
    });
}

// Function to close the database
function close(db) {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
