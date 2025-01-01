<template>
    <div class="login-container">
      <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" :disabled="loading">
            {{ loading ? "Logging in..." : "Login" }}
          </button>
          <p v-if="error" class="error-message">{{ error }}</p>
        </form>
      </div>
    </div>
  </template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
    name: "Login",
    setup() {
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const error = ref(null);
    const router = useRouter();

    const handleLogin = async () => {
      loading.value = true;
      error.value = null;
      window.localStorage.setItem("access_token", "");

      try {
        const response = await axios.post("https://dummyjson.com/auth/login", {
          username: username.value,
          password: password.value,
          expiresInMins: 30,
        });

        console.log("Login successful:", response.data.accessToken);
        window.localStorage.setItem("access_token", response.data.accessToken);
        // perform further actions after login, redirecting the user
        alert("Login successful!");
        router.push("/");
      } catch (err) {
        console.error("Login failed:", err);
        error.value = err.response?.data?.message || "Login failed. Please try again.";
      } finally {
        loading.value = false;
      }
    };

    return {
      username,
      password,
      loading,
      error,
      handleLogin,
    };
  }, 
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.login-form {
    background: #ffffff;
    padding: 20px 30px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    text-align: center;
}

h2 {
    margin-bottom: 20px;
    color: #42b983;
}

.form-group {
    margin-bottom: 15px;
    text-align: left;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333333;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    background-color: #ebebeb;
    color: #333333;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:disabled {
    background-color: #888888;
    color: #ffffff;
}

button:hover:not(:disabled) {
    background-color: #00dc82;
}

.error-message {
    color: #ff5f5f;
    margin-top: 10px;
    font-size: 14px;
}

input:focus {
    outline: 2px solid #41b883;
    background-color: #e0f0fe;
}
</style>