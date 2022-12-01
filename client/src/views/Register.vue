<script>
    export default{
        name: "Register"
    }
</script>

<template>
    <div class="container">
        <h1 class="title">Register</h1>
        <form class="form">
            <input class="form--input" type="text" placeholder="name"/>
            <input class="form--input" type="text" placeholder="username"/>
            <input class="form--input" type="text" placeholder="email"/>
            <input class="form--input" type="text" placeholder="password"/>

            <button class="form--button">Create account</button>
        </form>
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
        color: #7a7a7a;
    }

    .form--button{
        height: 40px;
        border-radius: 10px;
        font-size: 20px;
        cursor: pointer;
    }
</style>