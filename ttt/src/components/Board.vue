<template>
<div>
    <table>
        <tr v-for='(each_row, rindex) in board' v-bind:key="rindex">
            <td v-for='(each_col, cindex) in each_row' v-bind:key='rindex*3+cindex'>
                {{each_col}}
            </td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    data:function(){
        return {
            board:[
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]
        }
    }
}
</script>

<style scoped>
td {
    width: 100px;
    height: 100px;
    font-size: 32px;
    border:1px solid black;
    text-align:center;
}
</style>