<script>
    import Toast from "../components/Toast.vue"
    import { isLogged, navigateIfLogged } from "../utils"

    export default{
        name: "Register",
        
        data(){
            return{
                name: "",
                username: "",
                email: "",
                password: "",

                toastType: "",
                toastMsg: ""
            }
        },

        beforeMount(){
            
            navigateIfLogged(this.$router)
        }, 

        methods:{
            async createAccount(){
                const res = await fetch("https://mevn-realtimechat-production.up.railway.app/user/register", {
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        name: this.name,
                        username: this.username,
                        email: this.email,
                        password: this.password
                    }),

                    method: "post"
                })

                const data = await res.json()

                console.log(data)

                this.toastType = data.type
                this.toastMsg = data.msg

                setTimeout(() => {
                    this.toastType = ""
                    this.toastMsg = ""
                }, 3000)

                if(data.type == "good") {
                    setTimeout(() => {
                        this.$router.push("/login")
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
        <!-- <div class="toast">hola</div> -->
        <h1 class="title">Register</h1>
        <form class="form" @submit.prevent="createAccount">
            
            <input v-model="name" class="form--input" type="text" placeholder="name"/>
            <input v-model="username" class="form--input" type="text" placeholder="username"/>
            <input v-model="email" class="form--input" type="text" placeholder="email"/>
            <input v-model="password" class="form--input" type="text" placeholder="password"/>
            
            <button class="form--button">Create account</button>
        </form>
        
        <span class="question">have an account? <RouterLink to="/login" class="link">Log in</RouterLink></span>
        <!-- {{userData.name}} -->
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

    .toast{
        position: absolute;
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

    .link{
        color:rgb(46, 103, 247);
    }

    .link:visited{
        color: rgb(149, 60, 221);
    }
</style>