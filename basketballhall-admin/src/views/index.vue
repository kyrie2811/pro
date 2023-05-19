<template>
    <div class="index">
        <homemain></homemain>
    </div>
</template>

<script>
import homemain from '@/components/homemain'
export default {
    name: 'index',
    data: function () {
        return {

        }
    },
    components: {
        homemain
    }
}
</script>

<style scoped lang="less">
.index {
    width: 100%;
    height: 100%;
    text-align: center;

    p {
        color: #666;
        font-size: 50px;
    }
}
</style>