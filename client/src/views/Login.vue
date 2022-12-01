<script>
    export default{
        name: "Login"
    }
</script>

<template>
    <div class="container">
        <h1 class="title">Login</h1>
        <form class="form">
            <input class="form--input" type="text" placeholder="username"/>
            <input class="form--input" type="text" placeholder="password"/>

            <button class="form--button">Log In</button>
        </form>

        <span class="question">Don't have an account? <RouterLink to="/register" class="link">Sign up</RouterLink></span>
    </div>
</template>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
    }

    .form{
        width: 500px;
        height: 500px;
        /* background-color: #101010; */
        /* background-color: #2B2B2B; */

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .form--input{
        height: 60px;
        padding-left: 10px;
        
        background-color: transparent;
        border: 1px solid #7a7a7a;
        border-radius: 10px;
        box-sizing: border-box;

        font-size: 25px;
        color: white;
    }
    
    .form--input::placeholder{
        color: #7a7a7a;
    }

    .form--button{
        height: 40px;
        border-radius: 10px;
        font-size: 20px;
        cursor: pointer;
        background-color: rgb(23, 122, 66);
        color: white;
        border: 0;
        transition: .2s transform;
    }

    .form--button:hover{
        transform: scale(1.04);
    }

    .question{
        font-weight: 100;
    }

    .link:visited{
        color: rgb(149, 60, 221);
    }
</style>