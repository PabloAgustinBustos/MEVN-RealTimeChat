<script>
    import Toast from "../components/Toast.vue"
    import { isLogged, navigateIfLogged } from "../utils"

    export default{
        name: "Login",

        data(){
            return{
                username: "",
                password: "",

                toastType: "",
                toastMsg: ""
            }
        },

        beforeMount(){
            navigateIfLogged(this.$router)
        }, 

        methods: {
            async logIn(){
                const res = await fetch("http://localhost:3001/user/login", {
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    }),

                    method: "post"
                })

                const data = await res.json()

                localStorage.setItem("token", data.token)
                
                this.toastType = data.type
                this.toastMsg = data.text

                setTimeout(() => {
                    this.toastType = ""
                    this.toastMsg = ""
                }, 3000)

                if(data.type == "good") {
                    setTimeout(() => {
                        this.$router.push("/")
                    }, 1500)
                }
            }
        },
        
        components: {Toast}
    }
</script>

<template>
    <div class="container">
        <Toast v-if="(toastType && toastMsg)" :type="toastType" :msg="toastMsg"/>
        <h1 class="title">Login</h1>
        <form class="form" @submit.prevent="logIn">
            <input v-model="username" class="form--input" type="text" placeholder="username"/>
            <input v-model="password" class="form--input" type="text" placeholder="password"/>

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
        position: relative;
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

    .link:link{
        color:rgb(46, 103, 247);
    }

    .link:visited{
        color: rgb(149, 60, 221);
    }
</style>