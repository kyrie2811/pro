<template>
    <div class="main">
        <!-- 轮播图 -->
        <div class="carouselBox">
            <el-carousel :interval="4000" type="card" height="400px">
                <el-carousel-item>
                    <img src="https://img0.baidu.com/it/u=3462805534,1806497876&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"
                        alt="">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="https://img0.baidu.com/it/u=3544764984,1808798768&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"
                        alt="">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F59616f4c-a9f9-4ba3-9eec-c85ff57f9adb%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682041447&t=75d7819e66ea0a64e8fe971debbe5879"
                        alt="">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="https://img2.baidu.com/it/u=1957356550,3044921991&fm=253&fmt=auto&app=120&f=JPEG?w=940&h=627"
                        alt="">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="https://img2.baidu.com/it/u=2400333986,4158069343&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"
                        alt="">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="https://img0.baidu.com/it/u=1185156860,3556182826&fm=253&fmt=auto&app=138&f=JPEG?w=911&h=500"
                        alt="">
                </el-carousel-item>

            </el-carousel>
        </div>
        <!-- 分隔线 -->
        <div>

            <el-divider content-position="left" class="betweenLine">通知公告</el-divider>

        </div>
        <!-- 通知公告 -->
        <Row>
            <Col span="11">
            <Card>
                <p slot="title">五一不放假！！！</p>
                <p>旗下所有球馆9.9畅打</p>

            </Card>
            </Col>
            <Col span="11" offset="2">
            <Card dis-hover>
                <p slot="title">周四大扫除</p>
                <p>福建农林大学白鹭体育馆进行大扫除，不营业</p>

            </Card>
            </Col>
        </Row>


        <!-- 分割线 -->
        <div>

            <el-divider content-position="left" class="betweenLine">精选内容</el-divider>

        </div>
        <!-- 精选内容 -->
        <div class="hotmsg">
            <Row style="background:#eee;padding:20px">
                <Col span="11">
                <Card :bordered="false">
                    <p slot="title">中国篮协即将正式成立球员工会
                    </p>
                    <p>几位前国手担任球员代表所周知，篮协主席姚明上任后，一直推崇成立球员工会，而在‘周琦维权’事件后，我们终于等到它了。期待工会组织能更多更好地发声，保障咱们球员的权益</p>

                </Card>
                </Col>
                <Col span="11" offset="2">
                <Card shadow>
                    <p slot="title">凯里欧文加入独行侠</p>
                    <p> 今天NBA常规赛骑士客场对阵篮网的比赛已经结束。全场战罢，骑士以115-109战胜篮网。

                        本场比赛，骑士球员加兰投篮13中7得到17分1篮板6助攻1抢断，莫布利投篮12中8得到17分4篮板3助攻1抢断</p>

                </Card>
                </Col>
            </Row>
            <Row style="background:#eee;padding:20px">
                <Col span="11">
                <Card :bordered="false">
                    <p slot="title">中国篮协即将正式成立球员工会
                    </p>
                    <p>几位前国手担任球员代表所周知，篮协主席姚明上任后，一直推崇成立球员工会，而在‘周琦维权’事件后，我们终于等到它了。期待工会组织能更多更好地发声，保障咱们球员的权益</p>

                </Card>
                </Col>
                <Col span="11" offset="2">
                <Card shadow>
                    <p slot="title">凯里欧文加入独行侠</p>
                    <p> 今天NBA常规赛骑士客场对阵篮网的比赛已经结束。全场战罢，骑士以115-109战胜篮网。

                        本场比赛，骑士球员加兰投篮13中7得到17分1篮板6助攻1抢断，莫布利投篮12中8得到17分4篮板3助攻1抢断</p>

                </Card>
                </Col>
            </Row>
        </div>
        <!-- 分割线 -->
        <div>

            <el-divider content-position="left" class="betweenLine">常见问题</el-divider>

        </div>
        <!-- 常见问题 -->
        <div class="question">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="怎么预约场地" name="1">
                    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
                <el-collapse-item title="怎么预约器材" name="2">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="怎么修改个人资料" name="3">
                    <div>简化流程：设计简洁直观的操作流程；</div>
                    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="怎么观看比赛" name="4">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <!-- 分割线 -->
        <div>

            <el-divider content-position="left" class="betweenLine">体育馆图示</el-divider>

        </div>
        <div class="pic">

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="白鹭体育馆" name="first"><img src="../assets/baskethullPic/3.png" alt=""
                        class="basPic"></el-tab-pane>
                <el-tab-pane label="北区篮球场" name="second"><img class="basPic" src="../assets/baskethullPic/4.png"
                        alt=""></el-tab-pane>
                <el-tab-pane label="哈洛篮球场" name="third"><img class="basPic" src="../assets/baskethullPic/2.png"
                        alt=""></el-tab-pane>
                <el-tab-pane label="万创篮球场" name="fourth"><img class="basPic" src="../assets/baskethullPic/1.png"
                        alt=""></el-tab-pane>
                <el-tab-pane label="糖果篮球场" name="fifth"><img class="basPic" src="../assets/baskethullPic/5.png"
                        alt=""></el-tab-pane>
                <el-tab-pane label="魔方篮球场" name="sixth"><img class="basPic" src="../assets/baskethullPic/6.png"
                        alt=""></el-tab-pane>
            </el-tabs>

        </div>
        <!-- 分割线 -->
        <div>

            <el-divider content-position="left" class="betweenLine">今日比赛</el-divider>

        </div>
        <!-- 比赛 -->
        <div class="game">
            <Card style="width:320px">
                <div style="text-align:center">
                    <img src="https://att.zhibo8.cc/attachments/forum/day_120920/12092023142ae5e5df44d7200b.gif">
                    <span>VS</span>
                    <img src="https://img2.baidu.com/it/u=2551710663,15405635&fm=253&fmt=auto&app=138&f=JPG?w=505&h=500">
                    <h3>篮网对战独行侠</h3>
                </div>
            </Card>
            <Card style="width:320px">
                <div style="text-align:center">
                    <img src="https://att.zhibo8.cc/attachments/forum/day_120920/12092023142ae5e5df44d7200b.gif">
                    <span>VS</span>
                    <img src="https://img2.baidu.com/it/u=2551710663,15405635&fm=253&fmt=auto&app=138&f=JPG?w=505&h=500">
                    <h3>篮网对战独行侠</h3>
                </div>
            </Card>
            <Card style="width:320px">
                <div style="text-align:center">
                    <img src="https://att.zhibo8.cc/attachments/forum/day_120920/12092023142ae5e5df44d7200b.gif">
                    <span>VS</span>
                    <img src="https://img2.baidu.com/it/u=2551710663,15405635&fm=253&fmt=auto&app=138&f=JPG?w=505&h=500">
                    <h3>篮网对战独行侠</h3>
                </div>
            </Card>
            <Card style="width:320px">
                <div style="text-align:center">
                    <img src="https://att.zhibo8.cc/attachments/forum/day_120920/12092023142ae5e5df44d7200b.gif">
                    <span>VS</span>
                    <img src="https://img2.baidu.com/it/u=2551710663,15405635&fm=253&fmt=auto&app=138&f=JPG?w=505&h=500">
                    <h3>篮网对战独行侠</h3>
                </div>
            </Card>
            <Card style="width:320px">
                <div style="text-align:center">
                    <img src="https://att.zhibo8.cc/attachments/forum/day_120920/12092023142ae5e5df44d7200b.gif">
                    <span>VS</span>
                    <img src="https://img2.baidu.com/it/u=2551710663,15405635&fm=253&fmt=auto&app=138&f=JPG?w=505&h=500">
                    <h3>篮网对战独行侠</h3>
                </div>
            </Card>
            <Card style="width:320px">
                <div style="text-align:center">
                    <img src="https://att.zhibo8.cc/attachments/forum/day_120920/12092023142ae5e5df44d7200b.gif">
                    <span>VS</span>
                    <img src="https://img2.baidu.com/it/u=2551710663,15405635&fm=253&fmt=auto&app=138&f=JPG?w=505&h=500">
                    <h3>篮网对战独行侠</h3>
                </div>
            </Card>


        </div>
        <!-- 回到顶部 -->
        <div class="backTop">
            <BackTop :height="100" :bottom="200">
                <div class="top">返回顶端</div>
            </BackTop>
        </div>
    </div>
</template>
<script>
export default {
    name: 'homemain',
    data: function () {
        return {
            activeName: 'second',
            activeNames: ['1']

        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleChange(val) {
            console.log(val);
        }
    }
}
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.el-divider__text {
    font-size: 26px;
}

.ivu-card-bordered img {
    padding: 10px;
    width: 80px;
    height: 80px;
    margin-left: 10px;
}

.game {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.ivu-card-bordered {
    margin: 5px;
    // flex-grow: 6;
}

.top {
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}

.basPic {
    width: 80%;
    // height: 500px;

}

.question {
    padding: 50px;

}

.home_content .menu .el-menu[data-v-7eb2bc79][data-v-7eb2bc79] {
    border-right: 0px;
    height: 400%;
}
</style>