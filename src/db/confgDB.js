import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file
export async function openDb() {
  return open({
    filename: './src/db/database.db', // Alterado para criar na pasta db
    driver: sqlite3.Database
  })
}