<script>
    export default{
        name: "Toast",

        props: {
            type: {
                type: String,
                required: true
            },

            msg: {
                type: String,
                required: true
            }
        },

        mounted(){
            console.log("se renderiza toast")
        },

        unmounted(){
            console.log("adios")
        }
    }
</script>

<template>
    <div :class="`toast-container ${type}`">
        <span class="text">{{msg}}</span>
    </div>
</template>

<style scoped>
    .toast-container{
        width: 330px;
        height: 50px;
        border-radius: 10px;
        
        position: absolute;
        bottom: -80px;
        right: 20px;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
        animation-name: display;
        animation-duration: 3s;
        animation-timing-function: ease-in-out;
    }
    
    .good{
        background-color: rgb(50, 140, 199);
    }

    .bad{
        background-color: rgb(199, 50, 50);
    }

    .text{
        font-size: 25px;
        font-weight: 300;
    }

    @keyframes display{
        0%{
            bottom: -80px;
        }

        20%{
            bottom: 20px;
        }

        80%{
            bottom: 20px;
        }

        100%{
            bottom: -80px;
        }
    }
</style>