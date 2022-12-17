<script>
    import {io} from "socket.io-client"
    import Chat from "../components/Chat.vue"
    import src from "../assets/logout.png"

    export default {
        name: "ChatZone",

        data(){
            return {
                token: "",
                _id: "",

                showUsers: false,
                users: [],

                friends: [],
                friendsCount: 0,

                currentChat: "",
                currentSocket: "",
                currentSocketId: "",

                reqStatus: "",

                chatMessage: "",

                src,

                id: null,
                socket: null,
            }
        },

        components: {Chat},

        watch:{
            socket(current, prev){
                this.socket.on("user-connected", users => {
                    this.friends = this.friends.map(f => {
                        if(users.find(u => u._id === f._id)){
                            return{
                                ...f,
                                status: "connected"
                            }
                        }else{
                            return {
                                ...f,
                                status: "disconnected"
                            }
                        }
                    })
                })

                this.socket.on("user-disconnected", users => {
                    this.friends = this.friends.map(f => {
                        if(!users.find(u => u._id === f._id)){
                            return{
                                ...f,
                                status: "disconnected"
                            }
                        }else{
                            return {
                                ...f
                            }
                        }
                    })
                })

                this.socket.on("added-friend", users => {
                    console.log(users)
                    this.friends = this.friends.map(f => {
                        if(users.find(u => u._id === f._id)){
                            return{
                                ...f,
                                status: "connected"
                            }
                        }else{
                            return {
                                ...f,
                                status: "disconnected"
                            }
                        }
                    })
                })
            },

            friends(current, prev){
                if(current.length > 0 && this.socket === null){
                    this.socket = io("https://mevn-realtimechat-production.up.railway.app", {
                        auth: {
                            _id: this._id,
                            token: this.token
                        }
                    })
                }
            }
        },

        beforeMount(){
            const token = localStorage.getItem("token")
            const _id = localStorage.getItem("_id")
            
            if(!token){
                return this.$router.push("/login")
            }

            this.token = token
            this._id = _id
            this.reqStatus = "loading"
        },
        
        mounted(){
            if(this.token){
                this.fetchFriends()
            }
        },

        methods: {
            async fetchFriends(){
                const res = await fetch("https://mevn-realtimechat-production.up.railway.app/user/auth/friends", {
                    method: "get",
                    headers:{
                        "Authorization": `Bearer ${this.token}`
                    }
                })

                let {friends} = await res.json()

                

                this.friends = friends
                this.friendsCount = 1
                this.reqStatus = "ready"

                if(this.socket !== null) this.socket.emit("update-status", this._id)
            },

            async getUsers(){
                if(this.users.length === 0){
                    const res = await fetch("https://mevn-realtimechat-production.up.railway.app/user/auth/get", {
                        method: "post",
                        headers:{
                            "Authorization": `Bearer ${this.token}`
                        }
                    })
    
                    const data = await res.json()
                    
                    this.users = data
                }

                this.showUsers = true
            },

            async addFriend(id){
                const res = await fetch("https://mevn-realtimechat-production.up.railway.app/user/auth/add/"+id, {
                    method: "put",
                    headers:{
                        "Authorization": `Bearer ${this.token}`
                    }
                })

                this.users = this.users.filter(u => u._id !== id)

                this.fetchFriends()
            },

            closePanel(){
                this.$refs.panel.classList.add("hidePanel")
                this.$refs.users.classList.add("users_hide")
                setTimeout(() => {
                    this.showUsers = false
                }, 400)
            },

            logout(){
                this.socket.emit("close-connection", this._id)

                localStorage.removeItem("token")
                this.$router.push("/login")
            },

            openChat(friend){
                this.currentChat = ""
                this.currentChat = friend
                
                // const {socketId: to, _id} = this.friends.find(f => f._id === this.currentChat)
                
                // this.currentSocketId = to
                
            },
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
                <!-- botón para añadir amigos -->
                <section class="friends__add">
                    <button @click="getUsers" class="btn-add">+</button>
                </section>

                <!-- lista de mis amigos -->
                <ul v-if="(friendsCount > 0)" class="friends__list">
                    <!-- amigo -->
                    <li 
                        v-for="friend in friends" 
                        :class="`item ${currentChat._id === friend._id ? 'selected' : ''}`"
                        id="friend._id" 
                        key="friend._id" 
                        @click="openChat(friend)"
                    >
                        <div :class='`status ${friend.status}`'></div>
                        {{friend.username}}
                    </li>
                </ul>

                <div v-else class="friends__panel">
                    <h1 class="message">you have 0 friends <span class="light">Add somebody</span></h1>  
                </div>

                <div @click="logout" class="image-container">
                    <img class="image" :src="src"/>
                </div>
            </section>

            <section class="content--chat">
                <div v-if="!currentChat" class="chat__panel">
                    Select a friend you want to talk with
                </div>
                
                <Chat v-else 
                    :friend="currentChat" 
                    :myId="this._id"        
                    :socket="socket"
                    :token="token"
                />
            </section>
        </div>

        <div ref="users" v-if="showUsers" class="users">
            <div ref="panel" class="panel">
                <span @click="closePanel" class="closeButton">+</span>
                <ul class="list">
                    <li @click="addFriend(user._id)" class="user" v-for="user in users" key="user._id">{{user.username}}</li>
                </ul>
            </div>
        </div>
    </div>
    
    <div class="container" v-else>
        <h1 class="status">Error al cargar los amigos D:</h1>
    </div>

</template>

<style scoped>
    .content--chat{
        /* height: 100%; */
        background-color: black;
    }

    .status{
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .connected{
        background-color: rgb(51, 172, 103);
    }

    .disconnected{
        background-color: rgb(172, 51, 51);;
    }

    .container{
        width: 100%;
        height: 100%;
        
        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
    }

    .status{
        font-size: 120px;
    }

    .image{
        width: 40px;
        filter: invert(100%);
        cursor: pointer;
    }

    .users{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.435);
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        animation-name: show;
        animation-duration: .5s;
        animation-timing-function: ease-in-out;
    }

    .users_hide{
        animation-name: hide;
    }

    @keyframes show{
        0%{
            opacity: 0;
        }

        100%{
            opacity: 1;
        }
    }

    @keyframes hide{
        0%{
            opacity: 1;
        }

        100%{
            opacity: 0;
        }
    }
    
    .panel{
        width: 410px;
        height: 490px;
        background-color: #191919;
        border-radius: 2px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        animation-name: showPanel;
        animation-duration: .5s;
        animation-timing-function: ease-in-out;
    }

    .hidePanel{
        animation-name: hidePanel;
    }

    @keyframes showPanel{
        0%{
            transform: scale(0);
        }

        80%{
            transform: scale(1.1);
        }

        100%{
            transform: scale(1);
        }
    }

    @keyframes hidePanel{
        0%{
            transform: scale(1);
        }

        100%{
            transform: scale(0);
        }
    }

    .closeButton{
        position: absolute;
        top: 0px;
        right: 15px;
        font-size: 60px;
        cursor: pointer;
        color: rgb(172, 51, 51);
        transform: rotate(45deg);
    }

    .list{
        margin-left: 20px;
        width: 100%;
        height: 70%;
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 30px;
        cursor: pointer;
    }

    .content{
        width: 98%;
        height: 95%;
        /* background-color: rgb(38, 89, 126); */

        display: grid;
        grid-template-columns: 1fr 4fr;
    }

    .content--friends{
        height: 100%;
        /* background-color: rgba(138, 43, 226, 0.4); */
        display: grid;
        grid-template-rows: 2fr 10fr;
        overflow: auto;
    }

    .item{
        height: 50px;
        padding: 10px;
        
        font-size: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        /* background-color: aqua; */
        /* border: 1px solid black; */
        box-sizing: border-box;

        transition: font-size .2s;
    }

    .selected{
        font-size: 50px;
    }

    .friends__add{
        
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-add{
        background: none;
        border: none;
        font-size: 80px;
        color: rgb(51, 172, 103);
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
        padding: 20px;
        box-sizing: border-box;
        list-style: none;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .friends__list::-webkit-scrollbar{
        width: 5px;
    }

    .friends__list::-webkit-scrollbar-thumb{
        background-color: #A2AABC;
        
    }

    .chat__panel{
        width: 100%;
        height: 100%;
        /* background-color: black; */
        border-radius: 3px;
        font-size: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    
</style>