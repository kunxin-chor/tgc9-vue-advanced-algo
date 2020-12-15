<template>
     <td @click="putSymbol(rindex, cindex)" 
     v-on:mouseover='hover=true' 
     v-on:mouseleave='hover=false'
     v-bind:class='getBackgroundColor'>
          {{ content }}
        </td>
</template>

<script>
export default {
    props:['rindex', 'cindex', 'content'],
    data:function(){
        return {
            hover:false
        }
    },
    methods:{
        putSymbol:function(){
            this.$emit('put_symbol', this.rindex, this.cindex);
        }
    },
    computed:{
        getBackgroundColor:function(){
            if (this.hover && this.content =="") {
                return 'is-hovering';
            } else if (this.hover && this.content != "") {
                return 'is-invalid'
            } else {
                return ''
            }
        }
    }
}
</script>

<style scoped>
.is-hovering {
    background-color: antiquewhite;
    cursor: pointer;
}

.is-invalid {
    background-color: red;
    cursor: default;
}
</style>