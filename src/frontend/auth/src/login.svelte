<script>
    let username = '';
    let password = '';

    function handleLogin() {
        console.log('Login clicked');
    }
</script>

<div class="login-container">
    <h2>Login</h2>
    <form on:submit={handleLogin}>
       <label for="username">Username</label>
       <input type="text" id="username" bind:value={username} />

       <label for="password">Password</label>
       <input type="password" id="password" bind:value={password} />

       <button type="submit">Login</button>
    </form>
</div>

<style>
    .login-container {
        text-align: center;
        width: 300px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    label {
        font-weight: bold;
    }

    input {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    button {
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
</style>