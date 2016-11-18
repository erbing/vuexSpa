<template>

    <div>
        <h1>this is head.vue</h1>
        <h1>{{msg}}</h1>
    </div>

</template>


<script>
    module.exports = {
        data: function () {
            return {
                msg: 'hello'
            }
        }
    }
</script>


<style lang="less">
    h1{
        font-size: 18px;
    }

</style>