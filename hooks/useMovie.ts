import { Movie, RemoteMovies, SqliteChachedMovies } from "@/services/Movies";
import { useDatabase } from "@/storages/useDatabase";
import { useEffect, useState } from "react";

export const useMovie = (title: string): (Movie & { loading: false }) | { loading: true } => {
    const { db } = useDatabase()
    const [movie, setMovie] = useState<Movie>()
    useEffect(() => {
        if (!db) return
        new SqliteChachedMovies(
            new RemoteMovies(),
            db
        )
            .withTitle(title)
            .then(x => setMovie(x));
    }, [db, title])
    if (movie) return { ...movie, loading: false }
    return { loading: true }
}