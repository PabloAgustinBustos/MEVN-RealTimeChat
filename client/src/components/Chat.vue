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
            chat(newValue, prevValue){
                // console.log(newValue)
            },
        },

        mounted(){
            this.socket.on("send-message", obj => {
                console.log("recibí un mensaje", obj)
            })
        },        

        methods:{
            // async getChat(){
            //     console.log("voy a actualizar")
            //     const res = await fetch(`http://localhost:3001/chat/auth/${this.friendId}`, {
            //         headers: {
            //             "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3YjNkYjRjZS00YjRjLTQxYWItODMyOS0yMmZiMTY2Mjk3OTIiLCJ1c2VybmFtZSI6InBhYmxvIiwiaWF0IjoxNjY5ODYwOTU5LCJleHAiOjE2NzI0NTI5NTl9.DUsatgXBxZLfyPMjWtuBvvVnMdU7wNQtl0JDfLVC9e4"
            //         }
            //     })
            //     const data = await res.json()

            //     console.log("recibí el nuevo chat", data)

            //     this.chat = [...data]
            // }

            sendMessage(){                
                this.socket.emit("send-message", {
                    text:this.chatMessage,
                    from: this.myId,
                    to: this.friend.socketId,
                });
            }
        },

        components: {Message},

        props: ["friend", "socket", "myId"]
    }
</script>

<template>
    <section class="container">
        <section class="chat-container">
            <Message from="friend" text="que queres"/>
            <Message from="me" text="puto"/>
        </section>

        <div class="control">
            <input v-model="chatMessage" class="input" type="text"/>
            <button @click="sendMessage" class="button">send</button>
        </div>
        
        <!-- <section class="chat-container">
            <Message v-for="msg in this.chat" 
                :from="msg.from === myUsername ? 'me' : 'friend'"
                :text="msg.text"
            />
            <Message from="me" text="puto"/>
            <Message from="me" text="nada"/>
            <Message from="friend" text="QUE MIERDA QUERES"/>
            <Message from="friend" text="que queres"/>
            <Message from="me" text="holaaaaaaaaaaa"/>
            <Message from="me" text="explicame culo roto"/>
            <Message from="me" text="no entendí"/>
            <Message from="me" text="khe"/>
            <Message from="friend" text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta eum debitis doloribus aperiam, quaerat explicabo nemo totam accusamus veniam consequuntur ex recusandae et tempore vel, maxime animi commodi iusto a."/>
            <Message from="me" text="si ya se waton"/>
            <Message from="friend" text="hola soy un mensaje"/>
        </section> -->

    </section>
</template>

<style scoped>
    .container{
        /* height: 100%; */
        /* background-color: aqua; */
        
        /* display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center; */
        /* display: flex;
        flex-direction: column;
        position: relative; */
    }

    .chat-container{
        width: 100%;
        height: 95%;
        /* width: 100%;
        height: 100%; */
        /* background-color: #0f0f0f; */
        /* background-color: black; */
        
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