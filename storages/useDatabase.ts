import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite'
import { create } from 'zustand'

export type Database = {
    db?: SQLiteDatabase,
    close: () => Promise<void>
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

export const useDatabase = create<Database>((set, get) => ({
    close: async () => {
        const { db } = get()
        set({ db: undefined })
        await db?.closeAsync()
    }
}))

openDatabaseAsync('movie-hub-mobile').then(async db => {
    // Create tables
    await db.runAsync(/* sql */`
        CREATE TABLE IF NOT EXISTS user(
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`)
    useDatabase.setState({ db })
})
