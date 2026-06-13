import path from 'path';

let sqliteDb: any = null;

async function getSqliteDb() {
  if (!sqliteDb) {
    const Database = (await import('better-sqlite3')).default;
    const dbPath = path.join(process.cwd(), 'selelos.sqlite');
    sqliteDb = new Database(dbPath);
    sqliteDb.pragma('foreign_keys = ON');
  }
  return sqliteDb;
}

export async function sql(strings: TemplateStringsArray, ...values: any[]): Promise<{ rows: any[]; rowCount: number }> {
  if (process.env.POSTGRES_URL) {
    // Vercel Postgres Mode (Production)
    const { sql: vercelSql } = await import('@vercel/postgres');
    
    try {
      const result = await vercelSql(strings, ...values);
      return {
        rows: result.rows,
        rowCount: result.rowCount ?? 0,
      };
    } catch (error) {
      console.error('PostgreSQL query error:', error);
      throw error;
    }
  } else {
    // SQLite Mode (Development)
    const db = await getSqliteDb();
    
    // Reconstruct query using '?' placeholders
    let query = '';
    for (let i = 0; i < strings.length; i++) {
      query += strings[i];
      if (i < values.length) {
        query += '?';
      }
    }

    // Translate basic PostgreSQL syntax into SQLite syntax
    let sqlText = query;
    sqlText = sqlText.replace(/\bSERIAL PRIMARY KEY\b/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT');
    sqlText = sqlText.replace(/\bSERIAL\b/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT');
    sqlText = sqlText.replace(/\bTIMESTAMP\b/gi, 'DATETIME');
    sqlText = sqlText.replace(/\bVARCHAR\(\d+\)\b/gi, 'TEXT');
    sqlText = sqlText.replace(/\bVARCHAR\b/gi, 'TEXT');
    sqlText = sqlText.replace(/\bDECIMAL\(\d+,\s*\d+\)\b/gi, 'REAL');
    sqlText = sqlText.replace(/\bDECIMAL\b/gi, 'REAL');
    sqlText = sqlText.replace(/\bBOOLEAN\b/gi, 'INTEGER');
    sqlText = sqlText.replace(/\bNOW\(\)/gi, 'CURRENT_TIMESTAMP');
    sqlText = sqlText.replace(/\bILIKE\b/gi, 'LIKE');

    // SQLite doesn't natively handle $1, $2, etc.
    sqlText = sqlText.replace(/\$\d+/g, '?');

    const stmt = db.prepare(sqlText);

    // Convert Date objects to ISO strings for SQLite
    const serializedValues = values.map(val => val instanceof Date ? val.toISOString() : val);

    // Determine if this statement yields rows
    const isQuery = sqlText.trim().toUpperCase().startsWith('SELECT') || sqlText.toUpperCase().includes('RETURNING');

    if (isQuery) {
      const rows = stmt.all(...serializedValues);
      return {
        rows: rows as any[],
        rowCount: rows.length,
      };
    } else {
      const result = stmt.run(...serializedValues);
      return {
        rows: [],
        rowCount: result.changes,
      };
    }
  }
}
