<script>
    import Chat from "../components/Chat.vue"

    export default {
        name: "ChatZone",

        data(){
            return {
                token: "",
                friends: [],
                friendsCount: 0,

                currentChat:"",

                reqStatus: ""
            }
        },

        components:{Chat},

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

                this.friends = data.friends
                this.friendsCount = 1
                this.reqStatus = "ready"
            },

            async addFriend(){
                const res = await fetch("http://localhost:3001/user/auth/get", {
                    method: "post",
                    headers:{
                        "Authorization": `Bearer ${this.token}`
                    }
                })

                const data = await res.json()

                console.log(data)
            }
        }
    }
</script>

<template>
    <div class="container" v-if="reqStatus === 'loading'">
        <h1 class="status">loading...</h1>
    </div>
    
    <div class="container" v-else-if="reqStatus === 'ready'">
        <div class="content">
            <section class="content--friends">
                <section class="friends__add">
                    <button @click="addFriend" class="btn-add">+</button>
                </section>

                <ul v-if="(friendsCount > 0)" class="friends__list">
                    <li class="item" v-for="friend in friends" id="friend._id" key="friend._id">{{friend.username}}</li>
                </ul>
                <div v-else class="friends__panel">
                    <h1 class="message">you have 0 friends <span class="light">Add somebody</span></h1>  
                </div>
            </section>

            <section class="content--chat">
                <div class="chat__panel" v-if="!currentChat">
                    Select a friend you want to talk with
                </div>
                
                <div class="chat__panel" v-else>
                    {{currentChat}}
                    <Chat/>
                </div>
            </section>
        </div>
    </div>
    
    <div class="container" v-else>
        <h1 class="status">Error al cargar los amigos D:</h1>
    </div>
</template>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .status{
        font-size: 120px;
    }

    .content{
        width: 98%;
        height: 95%;
        /* background-color: rgb(38, 89, 126); */

        display: grid;
        grid-template-columns: 1fr 3fr;
    }

    .content--friends{
        height: 100%;
        /* background-color: rgba(138, 43, 226, 0.4); */
        display: grid;
        grid-template-rows: 2fr 10fr;
        overflow: auto;
    }

    .friends__add{
        /* background-color: bisque; */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-add{
        background: none;
        border: none;
        font-size: 80px;
        color:aliceblue;
        cursor: pointer;
        transition: transform .3s;
    }

    .btn-add:hover{
        transform: scale(1.3);
    }
    
    .friends__panel{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .message{
        font-size: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 700;
    }

    .light{
        font-weight: 300;
    }

    .friends__list{
        height: 100%;
        /* background-color: green; */
        padding: 0;
        list-style: none;
        overflow-y: auto;
    }

    .friends__list::-webkit-scrollbar{
        width: 5px;
    }

    .friends__list::-webkit-scrollbar-thumb{
        background-color: #A2AABC;
        
    }

    .item{
        padding: 10px;
        /* background-color: blueviolet; */
        font-size: 30px;
    }

    .content--chat{
        /* background-color: rgba(165, 42, 42, 0.657); */
    }

    .chat__panel{
        width: 100%;
        height: 100%;
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
    }
</style>