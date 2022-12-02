<script>
    export default {
        name: "ChatZone",

        beforeMount(){
            const token = localStorage.getItem("token")
            
            if(!token){
                this.$router.push("/login")
            }
        }
    }
</script>

<template>
    chat zone
</template>