import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const token = ref<string | null>(null);
    const isAuthenticated = ref(false);
    const originalUrl = ref(null);

    async function login(username: string, password: string) {
      try {
        const response = await axios.post("/api/login", { username, password });
        token.value = response.data.token;
        user.value = response.data.user;
        isAuthenticated.value = true;

        // Optionally store token in localStorage for persistence
        localStorage.setItem("authToken", token.value);
      } catch (error) {
        console.error("Login failed", error);
        logout(); // Clear any existing state if login fails
      }
    }

    function logout() {
      user.value = null;
      token.value = null;
      localStorage.removeItem("authToken");
    }

    // Check if token exists in localStorage to auto-login
    function initializeAuth() {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        token.value = storedToken;
        isAuthenticated.value = true;
        // Optionally, make a request to fetch user info
        // user.value = await fetchUserInfo();
      }
    }

    return {
      user,
      token,
      isAuthenticated,
      originalUrl,
      login,
      logout,
      initializeAuth,
    };
  },
  {
    persist: {
      key: "auth",
      storage: localStorage,
      paths: ["user", "token", "isAuthenticated"],
    },
  }
);
