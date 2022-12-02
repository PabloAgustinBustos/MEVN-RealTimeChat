<script>
    export default {
        name: "ChatZone",

        data(){
            return {
                token: "",
                friends: [],

                reqStatus: ""
            }
        },

        beforeMount(){
            const token = localStorage.getItem("token")
            
            if(!token){
                return this.$router.push("/login")
            }

            this.token = token
            this.reqStatus = "loading"
        },

        mounted(){
            this.fetchFriends()
        },

        methods: {
            async fetchFriends(){
                const res = await fetch("http://localhost:3001/user/auth/friends", {
                    method: "get",
                    headers:{
                        "Authorization": `Bearer ${this.token}`
                    }
                })

                const data = await res.json()

                this.friends = data
                this.reqStatus = "ready"
            }
        }
    }
</script>

<template>
    <h1 v-if="reqStatus === 'loading'">loading</h1>
    <h1 v-else-if="reqStatus === 'ready'">amigos cargados</h1>
    <h1 v-else>error</h1>
</template>