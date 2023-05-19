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

.home_content .menu .el-menu[data-v-7eb2bc79][data-v-7eb2bc79] {
    border-right: 0px;
    height: 400%;
}
</style>