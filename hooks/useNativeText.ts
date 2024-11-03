import { useState } from "react"

export type Language = 'en' | 'ru'

export type AllTexts = {
    password: string,
    repeatPassword: string,
    username: string,
    movieName: string,
    logIn: string,
    welcom: string,
    createAccount: string,
    loading: string,
    years: string,
    runtime: string,
    genre: string,
    director: string,
    actors: string,
    plot: string,
    languagem: string,

}

const english: AllTexts = {
    password: 'Password',
    repeatPassword: 'Repeat password',
    username: 'Username',
    movieName: 'Movie name',
    logIn: 'Log in',
    welcom: 'Welcome!',
    createAccount: 'Create account',
    loading: 'Loading',
    years: 'Year',
    runtime: 'Runtime',
    genre: 'Genre',
    director: 'Director',
    actors: 'Actors',
    plot: 'Plot',
    languagem: 'Language',
}

const russian: AllTexts = {
    password: 'Пароль',
    repeatPassword: 'Поторите пароль',
    username: 'Имя пользователя',
    movieName: 'Название фильма',
    logIn: 'Войти',
    welcom: 'Вельком!',
    createAccount: 'Создать аккаунт',
    loading: 'Загрузка',
    years: 'Год',
    runtime: 'Длительность',
    genre: 'Жанр',
    director: 'Режиссер',
    actors: 'Актеры',
    plot: 'Сюжет',
    languagem: 'Языки',
}

export default function useNativeText() {
    const [language, setLanguage] = useState<Language>('ru')
    const allTexts = language === 'ru' ? russian : english
    return {
        ...allTexts,
        language,
        setLanguage
    }
}