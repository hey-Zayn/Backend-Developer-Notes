import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const BASE_URL = `http://localhost:3000`;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,


    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true })
            const res = await axiosInstance.get('/auth/check-auth');
            set({ authUser: res.data.user })

            // then i have connected the socket
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth:", error)
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    userLogin: async (data) => {
        try {
            set({ isLoggingIn: true })
            const res = await axiosInstance.post('/auth/login', data)
            if (res.data.success) {
                set({ authUser: res.data.user })
                toast.success("User logged in successfully")
            }
            get().connectSocket();
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            set({ isLoggingIn: false })
        }
    },

    userSignup: async (data) => {
        try {
            set({ isSigningUp: true })
            const res = await axiosInstance.post('/auth/register', data)
            if (res.data.success) {
                console.log(res)
                set({ authUser: res.data.user })
                toast.success("User created successfully")
            }
            get().connectSocket();
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            set({ isSigningUp: false })
        }
    },

    userLogout: async () => {
        try {
            set({ isLoggingOut: true })
            const res = await axiosInstance.post('/auth/logout')
            if (res.data.success) {
                set({ authUser: null })
                toast.success("User logged out successfully")
            }
            get().disconnectSocket();
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoggingOut: false })
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data.user });
            console.log(res)
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    // this is for socket connection when user logs in
    connectSocket: () => {
        // i have checked if the user is logged in and if the socket is connected
        if (!get().authUser || get().socket?.connected) return;



        // i have created the socket instance
        const socket = io(BASE_URL, {
            auth: {
                userId: get().authUser?._id
            }
        });
        // then i have connected the socket
        socket.connect();
        // then i have set the socket in the state
        set({ socket: socket });


        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })

    },


    // this is for socket disconnection when user logs out
    disconnectSocket: () => {
        // i have checked if the socket is connected
        if (get().socket?.connected) get().socket.disconnect();
        // then i have set the socket to null
        set({ socket: null });
    }

}))