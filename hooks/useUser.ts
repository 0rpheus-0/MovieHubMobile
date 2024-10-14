import { Schema, useDatabase } from "@/storages/useDatabase"
import { useEffect, useState } from "react"

export const useUser = (username: string) => {
    const { db } = useDatabase()
    const [id, setId] = useState<number>()
    const [movies, setMovies] = useState<string[]>([])
    useEffect(() => {
        db?.getFirstAsync<Schema.user>(/* sql */`
            SELECT id FROM user
            WHERE username = ?
        `, [username]).then(row => {
            if (!row) throw new Error(`User with '${username}' not exists`)
            setId(row.id)
        })
    }, [db, username])
    useEffect(() => {
        if (!id) return
        db?.getAllAsync<Schema.user_movie>(/* sql */`
            SELECT * FROM user_movie
            WHERE user_id = ?
        `, [id]).then(rows => setMovies(rows.map(x => x.movie_name)))
    }, [db, id])
    return {
        movies,
        addMovie: async (name: string) => {
            if (!id || !db) return
            setMovies(prev => [...prev, name])
            try {
                await db.runAsync(/* sql */`
                    INSERT INTO user_movie(user_id, movie_name)
                    VALUES (?, ?)
                `, [id, name])
            } catch (e) {
                setMovies(prev => prev.filter(x => x !== name))
                throw new Error(`Failed while add movie '${name}' for user '${username}' with id '${id}'`, { cause: e })
            }
        },
        removeMovie: async (name: string) => {
            if (!id || !db) return
            setMovies(prev => prev.filter(x => x !== name))
            try {
                await db.runAsync(/* sql */`
                    DELETE FROM user_movie
                    WHERE user_id = ? AND movie_name = ?
                `, [id, name])
            } catch (e) {
                setMovies(prev => [...prev, name])
                throw new Error(`Failed while remove movie '${name}' for user '${username}' with id '${id}'`, { cause: e })
            }
        }
    }
}