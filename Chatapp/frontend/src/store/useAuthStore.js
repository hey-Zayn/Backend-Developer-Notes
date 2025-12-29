import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],


    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true })
            await axiosInstance.get('/check-auth').then((res) => {
                set({ authUser: res.data.user })
                set({ isCheckingAuth: false })
            })
        } catch (error) {
            console.log(error)
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false })
        }
    }

}))