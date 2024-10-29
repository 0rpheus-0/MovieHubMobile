import { Schema, useDatabase } from "@/storages/useDatabase"

export type Users = {
    registered: (name: string) => Promise<boolean>
    register: (name: string, password: string) => Promise<void>,
    exists: (name: string, password: string) => Promise<boolean>
}

export const useUsers = (): Users => {
    const { db } = useDatabase()
    const databaseNotInitialized = async () => {
        throw new Error('The database has not been initialized yet, please try again later.')
    }
    if (!db) return {
        registered: databaseNotInitialized,
        register: databaseNotInitialized,
        exists: databaseNotInitialized
    }
    return {
        registered: async (name: string) =>
            !!await db.getFirstAsync<Schema.user>('SELECT * FROM user WHERE username = ?', [name]),
        register: async (name: string, password: string) => {
            await db.runAsync('INSERT INTO user(username, password) VALUES (?, ?)', [name, password])
        },
        exists: async (name: string, password: string) =>
            !!await db.getFirstAsync<Schema.user>('SELECT * FROM useruser WHERE name = ? AND password = ?', [name, password]),
    }
}

