<script>
    import Message from './Message.vue';
    // import {io} from "socket.io-client"

    export default{
        name: "Chat",

        data(){
            return{
                chatMessage: "",
                chat: []
            }
        },

        watch:{
            friend(newValue, prevValue){
                this.chat = []
                this.fetchMessages()
            },
        },

        mounted(){
            console.log("se abrió un chat")
            this.fetchMessages()
            this.socket.on("send-message", obj => {
                this.chat.unshift(obj)
            })
        },        

        methods:{
            async fetchMessages(){
                const res = await fetch("http://localhost:3001/chat/auth/"+this.friend._id, {
                    headers: {
                        "Authorization": "Bearer " + this.token
                    }
                })

                const data = await res.json()

                data.forEach(m => this.chat.push(m))
            },

            sendMessage(){                
                this.socket.emit("send-message", {
                    text:this.chatMessage,
                    from: this.myId,
                    to: this.friend._id,
                });

                this.chatMessage = ""
            }
        },

        components: {Message},

        props: ["friend", "socket", "myId", "token"]
    }
</script>

<template>
    <section class="container">
        <section class="chat-container">
            <Message 
                v-for="message in chat" 
                :from="message.from === myId ? 'me' : 'friend'"
                :text="message.text"
            />
        </section>

        <div class="control">
            <input v-model="chatMessage" class="input" type="text"/>
            <button @click="sendMessage" class="button">send</button>
        </div>
    </section>
</template>

<style scoped>
    .chat-container{
        width: 100%;
        height: 95%;
        
        padding: 30px 20px;
        border-radius: 5px;

        display: flex;
        flex-direction: column-reverse;
        gap: 10px;

        overflow-y: auto;
        box-sizing: border-box;

        position: absolute;
        top: 0
    }

    .chat-container::-webkit-scrollbar{
        width: 5px;
    }

    .chat-container::-webkit-scrollbar-thumb{
        background-color: #A2AABC;
        /* background-color: red; */
    }

    .message-container{
        width: 100%;
        display: flex;
        font-size: 20px;
    }

    .me{
        justify-content: flex-end;
    }
    
    .friend{
        justify-content: flex-start;
    }    
    
    .message-text{
        max-width: 80%;
        padding: 5px 10px;
        border-radius: 10px;
        box-sizing: border-box;
    }

    .color-me{
        background-color: rgb(34, 106, 80);
    }
    
    .color-friend{
        background-color: rgb(34, 56, 106);
    }

    .control{
        width: 100%;
        /* height: 30px; */
        display: flex;
        background-color: green;
        position: absolute;
        bottom: 0;
    }

    .input{
        width: 100%;
        height: 30px;
        font-size: 25px;
    }

    .button{

    }
</style>