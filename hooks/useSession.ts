import { getItem, setItem } from "expo-secure-store";
import { create } from "zustand";

type Session = {
    username?: string,
    login: (name: string) => void,
    logout: () => void
}


export const useSession = create<Session>((set) => ({
    username: getItem('username') || undefined,
    login: (name: string) => {
        setItem('username', name)
        set({ username: name })
    },
    logout: () => {
        setItem('username', '')
        set({ username: undefined })
    }
}))

export const useLoggedSession = () => {
    const { username, login, logout } = useSession()
    if (!username) throw new Error('User not loggined!')
    return { username, login, logout }
}