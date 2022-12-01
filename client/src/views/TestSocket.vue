<template>
    <Chat :socket="this.socket" title="hola"/>
    <form @submit.prevent="send">
        <input v-model="from" type="text" placeholder="from"/>
        <input v-model="to" type="text" placeholder="to"/>
        <button @click.prevent="toggle">toggle</button>
        <input v-model="text" type="text" placeholder="message"/>

        <button>send</button>
    </form>
</template>

<script>
    import {io} from "socket.io-client"
    import Chat from "../components/Chat.vue"

    export default {
        name: "TestSocket",

        data(){
            return {
                tool: "socket io",
                socket: undefined,

                from: "7b3db4ce-4b4c-41ab-8329-22fb16629792",
                to: "2393fa7b-f254-49d2-8f85-fe65b913f99a",
                text: ""
            }
        },

        components: {Chat},

        beforeMount(){
            this.socket = io("http://localhost:3002")

            this.socket.on("good-connection", (msg) => {
                console.log(msg)
            })
        },

        methods: {
            send(){
                console.log({
                    from: this.from, 
                    to: this.to, 
                    text: this.text
                })

                this.socket.emit("send-message", {
                    from: this.from, 
                    to: this.to, 
                    text: this.text
                })
            },

            toggle(){
                let to = this.from
                let from = this.to

                this.from = from
                this.to = to
            }
        }
    }
</script>

<style scoped>
    form{
        width: 300px;
        
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    input{
        height: 1.8rem;
        font-size: 20px;
    }
</style>