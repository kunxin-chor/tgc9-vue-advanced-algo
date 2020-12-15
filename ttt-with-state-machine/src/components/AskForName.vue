<template>
     <div id="ask-for-name" v-if="askingForName==true">
        <label>{{question}}</label>
        <input type="text" v-model="playerName"/>
        <button id='ask-for-name-ok-button' @click='submitName'>OK</button>
    </div>
</template>

<script>
export default {
    props:['askingForName', 'question'],
    data:function(){
        return {
            'playerName':''
        }
    },
    methods:{
        submitName:function(){
            this.$emit('name_submitted', this.playerName)
        }
    }
}
</script>