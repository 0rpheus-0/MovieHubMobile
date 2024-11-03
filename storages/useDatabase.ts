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
        movie_title: string
    }
    export type movie = {
        id: string,
        title: string,
        years: string,
        runtime: string,
        genre: string,
        director: string,
        actors: string,
        plot: string,
        language: string,
        poster: string,
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

    await db.runAsync(/* sql */`
        CREATE TABLE IF NOT EXISTS user(
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`)
    await db.runAsync(/* sql */`
            CREATE TABLE IF NOT EXISTS movie(
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                years TEXT NOT NULL,
                runtime TEXT NOT NULL, 
                genre TEXT NOT NULL,
                director TEXT NOT NULL,
                actors TEXT NOT NULL,
                plot TEXT NOT NULL,
                language TEXT NOT NULL,
                poster TEXT NOT NULL
            )`)
    await db.runAsync(/* sql */`
        CREATE TABLE IF NOT EXISTS user_movie(
            user_id INTEGER REFERENCES user(id),
            movie_title TEXT REFERENCES movie(title)
        )`)

    useDatabase.setState({ db })
})
