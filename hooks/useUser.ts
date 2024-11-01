import { Movie, RemoteMovies, SqliteChachedMovies } from "@/services/Movies"
import { Schema, useDatabase } from "@/storages/useDatabase"
import { useEffect, useState } from "react"

export type User = {
    movies: Movie[],
    addMovie: (name: string) => Promise<void>,
    removeMovie: (name: string) => Promise<void>
}

export const useUser = (username: string): User => {
    const { db } = useDatabase()
    const [id, setId] = useState<number>()
    const [userMovies, setMovies] = useState<Movie[]>([])
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
        if (!id || !db) return
        (async () => {
            const rows = await db.getAllAsync<Schema.user_movie>(/* sql */`
                SELECT * FROM user_movie
                WHERE user_id = ?
            `, [id])
            setMovies(((await Promise.all(rows.map(x => movies.withTitle(x.movie_title)))).filter(x => !!x)))
        })()
    }, [db, id])
    if (!db) return { movies: [], addMovie: async () => { }, removeMovie: async () => { } }
    const movies = new SqliteChachedMovies(new RemoteMovies(), db)
    return {
        movies: userMovies,
        addMovie: async (name: string) => {
            if (!id || !db) return
            console.log('add1')
            const movie = await movies.withTitle(name)
            console.log('add2')
            if (!movie) return
            console.log('add3')
            try {
                console.log('add4', [id, name])
                await db.runAsync(/* sql */`
                    INSERT INTO user_movie(user_id, movie_title)
                    VALUES (?, ?)
                `, [id, movie.title])
                console.log('add5', [id, name])
                setMovies(prev => [...prev, movie])
                console.log(movies, movie)
            } catch (e) {
                console.log('add ex', [id, name])
                setMovies(prev => prev.filter(x => x !== movie))
                throw new Error(`Failed while add movie '${name}' for user '${username}' with id '${id}'`, { cause: e })
            }
        },
        removeMovie: async (name: string) => {
            if (!id || !db) return
            const movie = await movies.withTitle(name)
            if (!movie) return
            setMovies(prev => prev.filter(x => x !== movie))
            try {
                await db.runAsync(/* sql */`
                    DELETE FROM user_movie
                    WHERE user_id = ? AND movie_name = ?
                `, [id, name])
            } catch (e) {
                setMovies(prev => [...prev, movie])
                throw new Error(`Failed while remove movie '${name}' for user '${username}' with id '${id}'`, { cause: e })
            }
        }
    }
}