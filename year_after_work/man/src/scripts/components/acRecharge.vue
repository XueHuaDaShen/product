<template id="">
    <div class="agentR">
        <form class="form-horizontal ARform" role="form">
            <div class="form-group">
                <label for="pid" class="col-sm-2 control-label select1l">用户Pid</label>
                <input type="text" class="form-control" id="#pid" v-model="pid"
                       style="float: right; width: 75%; margin-bottom: 10px;"/>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label select1l">代理商名称</label>
                <select id="select1" class="form-control" v-model="agentID">
                    <option v-for="agent in agentL" v-bind:value="agent._id">
                        {{agent.name}}

                    </option>
                </select>
                <!-- <span class="showname"></span> -->
            </div>

            <div class="form-group">
                <label class="col-sm-2 control-label select1l">充值类型</label>
                <select id="select1" class="form-control" v-model="type" @change="showProduct(parseInt(type))">
                    <option value="0">钻石</option>
                    <option value="1">鱼蛋</option>
                </select>
            </div>


            <div class="form-group" v-show="!parseInt(type)">
                <label for="select2" class="col-sm-2 control-label select2l">充值钻石数量</label>
                <!--<select class="form-control" id="select2" v-model="productID">-->
                    <!--<option v-for="amount in amounts" v-bind:value="amount.productid">-->
                        <!--{{amount.diamonds}}-->

                    <!--</option>-->
                <!--</select>-->
                <input type="text" class="form-control"  v-model="num1"
                       style="float: right; width: 75%; margin-bottom: 10px;" placeholder="请输入数字"/>
            </div>

            <div class="form-group" v-show="parseInt(type)">
                <label for="select2" class="col-sm-2 control-label select2l">充值鱼蛋数量</label>
                <!--<select class="form-control" id="select2" v-model="productID">-->
                    <!--<option v-for="amount in amounts" v-bind:value="amount.productid">-->
                        <!--{{amount.coins}}-->

                    <!--</option>-->
                <!--</select>-->
                <input type="text" class="form-control"  v-model="num2"
                       style="float: right; width: 75%; margin-bottom: 10px;" placeholder="请输入数字"/>
            </div>

            <div class="tipsWrap">

            </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10 btnRightWrap">
                    <!-- <button  class="btn btnC btn-info btnRight" @click="recharge">查询</button> -->
                    <div class="btn btn-info btnRight" data-toggle='modal' data-target="#Modal">充值</button>
                    </div>
                </div>


                <div class="modal fade bs-example-modal-lg" id="Modal" tabindex="-1" role="dialog"
                     aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                        class="sr-only">Close</span></button>
                                <h4 class="modal-title" id="myModalLabel" style="text-align: center">确认充值</h4>
                            </div>
                            <div class="modal-body">
                                <div class="messageWrap" style="font-size: 16px;">
                                    是否确定充值

                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" @click="recharge">确认</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade bs-example-modal-lg" id="Modal1" tabindex="-1" role="dialog"
                     aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                        class="sr-only">Close</span></button>
                                <h4 class="modal-title" id="myModalLabel" style="text-align: center">充值结果</h4>
                            </div>
                            <div class="modal-body">
                                <div class="messageWrap" style="font-size: 16px;">
                                    充值成功

                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">确认</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade bs-example-modal-lg" id="Modal2" tabindex="-1" role="dialog"
                     aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                        class="sr-only">Close</span></button>
                                <h4 class="modal-title" id="myModalLabel" style="text-align: center">充值结果</h4>
                            </div>
                            <div class="modal-body">
                                <div class="messageWrap" style="font-size: 16px;">
                                    充值失败，请把充值信息补充完整

                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">确认</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade bs-example-modal-lg" id="Modal3" tabindex="-1" role="dialog"
                     aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                        class="sr-only">Close</span></button>
                                <h4 class="modal-title" id="myModalLabel" style="text-align: center">充值结果</h4>
                            </div>
                            <div class="modal-body">
                                <div class="messageWrap" style="font-size: 16px;">
                                    充值失败，输入的pid不存在，请输入正确的pid

                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">确认</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>


    </div>
</template>

<script>
    import utils from '../utils/utils.js';


    export default {

        data() {
            return {
                page: 1,
                size: 999,
                agentL: [],
                agentID: '',
                productID: '',
                amounts: [],
                tips1: '',
                tips2: '',
                checkname: '',
                checkid: '',
                tips3: '',
                tips4: '',
                message1: '',
                message2: '',
                pid: '',
                type: 0,
                num1: '',
                num2: '',
            }
        },

        methods: {
            selectA(page, size) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/activity/agency/list',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        "page": page,
                        "size": size,
                        "type": 1
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            // console.log(data);
                            that.agentL = data.data;

                        } else if (data.returncode == '301') {
                            console.log('参数错误');
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.selectA(page, size)
                            });
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }

                    },
                    fail: function () {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                });
            },

            selectD() {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/activity/diamondproduct/list',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    success: function (data) {
                        if (data.returncode == '200') {
                            // console.log(data);
                            that.amounts = data.data;
                        } else if (data.returncode == '301') {
                            console.log('参数错误');
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.selectD);
                        }  else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    }
                })
            },

            selectC() {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/activity/coinproduct/list',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    success: function (data) {
                        if (data.returncode == '200') {
                            // console.log(data);
                            that.amounts = data.data;
                        } else if (data.returncode == '301') {
                            console.log('参数错误');
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.selectC);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    }
                })
            },

            showProduct(type) {
                const that = this;
                if (type === 0) {
                    that.selectD();
                } else if (type === 1) {
                    that.selectC();
                }
            },


            recharge() {
                $('#Modal').modal('hide');
                const that = this;
                if (that.agentID === '' || that.pid === '' || that.type === '') {
                    $('#Modal2').modal('show');
                } else {
                    if (that.type == 0) {
                        if (isNaN(that.num1)) {
                            $('#Modal2').modal('show');
                            return;
                        }
                        $.ajax({
                            url: that.$store.state.rootUrl3 + '/activity/diamond/recharge',
                            headers: {
                                "token": localStorage.getItem('A-TOKEN')
                            },
                            type: "POST",
                            data: {
                                "pid": that.pid,
                                "agencyid": that.agentID,
//                                "productid": that.productID
                                num: that.num1
                            },
                            success: function (data) {
                                if (data.returncode == '200') {
                                    // that.tips1 = '充值成功';
                                    that.agentID = '';
                                    that.productID = '';
                                    that.num1 = '';
                                    that.num2 = '';
                                    // alert('充值成功');
                                    $('#Modal1').modal('show');
                                    // setTimeout(function() {
                                    //     that.tips1 = '';
                                    // }, 1000);
                                } else if (data.returncode == '400') {
                                    $('#Modal3').modal('show');
                                } else if (data.returncode == '301') {
                                    // console.log('参数错误');
                                    // alert('充值失败,请选择代理商和充值额度');
                                    $('#Modal2').modal('show');
                                    // that.tips2 = '充值失败';
                                    // setTimeout(function() {
                                    //     that.tips2 = '';
                                    // }, 1000);
                                } else if (data.returncode == '104') {
                                    utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.recharge);
                                }  else {
                                    utils.handleLogOut(data.returncode, that);
                                }
                            }
                        });
                    } else if (that.type == 1) {
                        if (isNaN(that.num2)) {
                            $('#Modal2').modal('show');
                            return;
                        }
                        $.ajax({
                            url: that.$store.state.rootUrl3 + '/activity/coin/recharge',
                            headers: {
                                "token": localStorage.getItem('A-TOKEN')
                            },
                            type: "POST",
                            data: {
                                "pid": that.pid,
                                "agencyid": that.agentID,
//                                "productid": that.productID
                                num: that.num2
                            },

                            success: function (data) {
                                if (data.returncode == '200') {
                                    // that.tips1 = '充值成功';
                                    that.agentID = '';
                                    that.productID = '';
                                    that.num1 = '';
                                    that.num2 = '';
                                    // alert('充值成功');
                                    $('#Modal1').modal('show');
                                    // setTimeout(function() {
                                    //     that.tips1 = '';
                                    // }, 1000);
                                } else if (data.returncode == '301') {
                                    // console.log('参数错误');
                                    // alert('充值失败,请选择代理商和充值额度');
                                    $('#Modal2').modal('show');
                                    // that.tips2 = '充值失败';
                                    // setTimeout(function() {
                                    //     that.tips2 = '';
                                    // }, 1000);
                                } else if (data.returncode == '104') {
                                    utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.recharge);
                                } else {
                                    utils.handleLogOut(data.returncode, that);
                                }
                            }
                        });
                    }

                }
            },

        },

        mounted() {

            // console.log(this.$store.state.tabIndex);
            this.$store.dispatch('tabChanger', 31);
            this.$store.dispatch('subChanger', 'sub3');

            // console.log(this.$store.state.tabIndex);
            this.selectA(1, 999);
            this.selectD();
        }
    }
</script>
