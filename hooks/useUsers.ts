import { Schema, useDatabase } from "@/storages/useDatabase"

type Users = {
    exists: (username: string) => Promise<boolean>
    register: (username: string, password: string) => Promise<void>,
    login: (username: string, password: string) => Promise<string>,
}

export const useUsers = (): Users => {
    const { db } = useDatabase()
    if (!db) return {
        exists: () => { throw new Error('Database not initilized') },
        register: () => { throw new Error('Database not initilized') },
        login: () => { throw new Error('Database not initilized') },
    }
    return {
        exists: async (username: string) => (await db.getFirstAsync(
            /* sql */`SELECT id FROM users WHERE username = ?`,
            [username])) !== null,
        register: async (username: string, password: string) => {
            await db.runAsync(/* sql */`INSERT INTO users (username, password) VALES (?, ?)`, [username, password])
        },
        login: async (username: string, password: string) => {
            const row = await db.getFirstAsync<Schema.user>(/* sql */`SELECT id FROM users WHERE username = ?`, [username])
            if (row === null) throw new Error(`User with name '${username}' not exists`)
            if (row.password !== password) throw new Error('Invalid password')
            return row.username
        },
    }
}