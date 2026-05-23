const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

function inspect(dbPath) {
    console.log(`\n--- Inspecting ${dbPath} ---`);
    try {
        const db = new DatabaseSync(dbPath);
        
        // List tables
        const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
        console.log('Tables:', tables.map(t => t.name));
        
        for (const table of tables) {
            if (table.name.startsWith('_prisma') || table.name === 'sqlite_sequence') continue;
            try {
                const countRow = db.prepare(`SELECT COUNT(*) as count FROM "${table.name}"`).get();
                console.log(`  Table: ${table.name} | Count: ${countRow.count}`);
                if (countRow.count > 0) {
                    const rows = db.prepare(`SELECT * FROM "${table.name}" LIMIT 5`).all();
                    console.log(`    Sample rows:`, JSON.stringify(rows, null, 2));
                }
            } catch (err) {
                console.error(`  Error reading table ${table.name}:`, err.message);
            }
        }
    } catch (e) {
        console.error('Error opening DB:', e);
    }
}

inspect(path.join(__dirname, '../prisma/dev.db'));
inspect(path.join(__dirname, '../prisma/dev.db.bak'));
