import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite'
import { create } from 'zustand'

export type Database = {
    db?: SQLiteDatabase
}

export namespace Schema {
    export type user = {
        id: number,
        username: string,
        password: string
    }
    export type user_movie = {
        user_id: number,
        movie_name: string
    }
}

export const useDatabase = create<Database>(() => ({}))

openDatabaseAsync('movie-hub-mobile').then(async db => {
    // Create tables
    await db.runAsync(/* sql */`
        CREATE TABLE IF NOT EXISTS user(
            id INTEGER PRIMERY KEY,
            username TEXT UNIQUE,
            password TEXT
        )`)
    useDatabase.setState({ db })
})
