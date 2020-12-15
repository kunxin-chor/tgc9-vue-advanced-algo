<template>
    <div id='message-box' v-if="message != ''">
        <div id="message-box-content">
            {{message}}
        </div>
        <div>
            <button id='message-box-ok-button' @click="okPressed">OK</button>
        </div>
    </div>
    
</template>

<script>
export default {
    props:['message'],
    methods:{
        okPressed:function(){
            this.$emit('ok_pressed');
        }
    }

}
</script>