<script>
    export default{
        name: "Message",

        props: ["text", "from"],
    
        beforeMount(){
            // console.log(this.from)
        }
        
    }
</script>

<template>
    <div :class="`message-container ${from}`">
        <span :class="`message-text color-${from}`">{{text}}</span>
    </div>
</template>

<style scoped>
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
        padding: 7px 10px;
        border-radius: 8px;
        /* box-sizing: border-box; */
    }

    .color-me{
        background-color: rgb(34, 106, 80);
    }
    
    .color-friend{
        background-color: rgb(34, 56, 106);
    }
</style>