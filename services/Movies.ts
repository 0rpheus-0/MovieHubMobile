import { SQLiteDatabase } from "expo-sqlite"

export type Movie = {
    title: string
    years: string,
    runtime: string,
    genre: string,
    director: string,
    actors: string,
    plot: string,
    language: string,
    poster: string,
}

export default interface Movies {
    withTitle(title: string): Promise<Movie | undefined>
}

export class RemoteMovies implements Movies {
    async withTitle(title: string): Promise<Movie | undefined> {
        console.log('api')
        const data = await (
            await fetch(`https://www.omdbapi.com/?apikey=${process.env.EXPO_PUBLIC_API_KEY}&t=${title}`)
        ).json()
        console.log(process.env.EXPO_PUBLIC_API_KEY, data)
        if (data.Response === 'False') return undefined
        return {
            title: data.Title,
            years: data.Year,
            runtime: data.Runtime,
            genre: data.Genre,
            director: data.Director,
            actors: data.Actors,
            plot: data.Plot,
            language: data.Language,
            poster: data.Poster

        }
    }
}

export class SqliteChachedMovies implements Movies {
    constructor(
        private origin: Movies,
        private sqlite: SQLiteDatabase
    ) { }
    async withTitle(title: string): Promise<Movie | undefined> {
        // console.log('db')
        const chachedMovie = await this.sqlite.getFirstAsync<Movie>(/* sql */`
            SELECT * FROM movie
            WHERE title = ?
        `, [title])
        if (chachedMovie) return chachedMovie
        const movie = await this.origin.withTitle(title)
        if (!movie) return undefined
        console.log('db2', movie.title)
        // console.log(movie)
        // console.log([movie.title,
        // movie.years,
        // movie.runtime,
        // movie.genre,
        // movie.director,
        // movie.actors,
        // movie.plot,
        // movie.language,
        // movie.poster])
        await this.sqlite.runAsync(/* sql */`
            INSERT INTO movie(title, years, runtime, genre, director, actors, plot, language, poster) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [movie.title,
        movie.years,
        movie.runtime,
        movie.genre,
        movie.director,
        movie.actors,
        movie.plot,
        movie.language,
        movie.poster])
        console.log('db3')
        return movie
    }

    // withId(id: string): Promise<Movie> {
    //     // select from sqlite or else get from origin
    //     throw new Error("Method not implemented.")
    // }
}


//const movies = new SqliteChachedMovies(new RemoteMovies(), db)

// const movie = await movies.withId(userSelectedMovieId)
