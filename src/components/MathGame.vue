<script>
//@ts-ignore
import MathGame from './ts/MathGame';
    
    export default {
        mounted: () =>{

            const gamer = new MathGame();
            gamer.appendTo(document.body);
            
        }
    }
</script>
<template>
</template>
<style scoped>
* {padding: 0 !important; margin: 0 !important;}
</style>>