import { SQLiteDatabase } from "expo-sqlite";

/**
 * Core migration logic
 * 
 * Whenever we have a change, increment the DATABASE_VERSION variable by 1. The last call in this method will
 * update the user_version in the DB upon completion.
 * 
 * @param db 
 * @returns 
 */
export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let currentDbVersion: number
    const result = await db.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version'
    );
    if (!result) {
      return
    }
    currentDbVersion = result.user_version
    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }
    if (currentDbVersion === 0) {
      await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        PRAGMA foreign_keys = 1;
        CREATE TABLE user (
          id INTEGER PRIMARY KEY NOT NULL);
      `);
      currentDbVersion = 1;
    }
    // if (currentDbVersion === 1) {
    //   Add more migrations
    // }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export const makePlacholders = (arr: any[]) => {
  if (arr.length === 0) return
  let s = '?'
  arr.forEach(() => {
      s += ',?'
  })
  return s
}
