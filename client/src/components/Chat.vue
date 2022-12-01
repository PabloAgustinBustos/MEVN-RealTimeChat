<script>
    import Message from './Message.vue';

    export default{
        name: "Chat",

        data(){
            return{
                myUsername: "pablo",
                friendUsername: "franco",
                myId: "59977504-7177-4c52-9997-1de65868d052",
                friendId: "2393fa7b-f254-49d2-8f85-fe65b913f99a",

                chat: []
            }
        },

        watch:{
            chat(newValue, prevValue){
                // console.log(newValue)
            },

            socket(newValue, prevValue){
                console.log(newValue)
            }
        },

        mounted(){
            this.getChat()
            
            this.socket.on("received", () => {
                this.getChat()
            })
        },

        methods:{
            async getChat(){
                console.log("voy a actualizar")
                const res = await fetch(`http://localhost:3001/chat/auth/${this.friendId}`, {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3YjNkYjRjZS00YjRjLTQxYWItODMyOS0yMmZiMTY2Mjk3OTIiLCJ1c2VybmFtZSI6InBhYmxvIiwiaWF0IjoxNjY5ODYwOTU5LCJleHAiOjE2NzI0NTI5NTl9.DUsatgXBxZLfyPMjWtuBvvVnMdU7wNQtl0JDfLVC9e4"
                    }
                })
                const data = await res.json()

                console.log("recibí el nuevo chat", data)

                this.chat = [...data]
            }
        },
        components: {Message},
        props: ["socket", "title"]
    }
</script>

<template>
    <section class="chat-container">
        <Message v-for="msg in this.chat" 
            :from="msg.from === myUsername ? 'me' : 'friend'"
            :text="msg.text"
        />
        <!-- <Message from="me" text="puto"/>
        <Message from="me" text="nada"/>
        <Message from="friend" text="QUE MIERDA QUERES"/>
        <Message from="friend" text="que queres"/>
        <Message from="me" text="holaaaaaaaaaaa"/>
        <Message from="me" text="explicame culo roto"/>
        <Message from="me" text="no entendí"/>
        <Message from="me" text="khe"/>
        <Message from="friend" text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta eum debitis doloribus aperiam, quaerat explicabo nemo totam accusamus veniam consequuntur ex recusandae et tempore vel, maxime animi commodi iusto a."/>
        <Message from="me" text="si ya se waton"/>
        <Message from="friend" text="hola soy un mensaje"/> -->
    </section>
</template>

<style scoped>
    .chat-container{
        width: 100%;
        height: 500px;
        background-color: #0f0f0f;
        padding: 30px 20px;

        display: flex;
        flex-direction: column-reverse;
        gap: 10px;

        overflow-y: auto;
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
</style>