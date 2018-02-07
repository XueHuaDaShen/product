<template id="">
<div class="">

        <div class="modal-dialog modal-lg">
            <div class="modal-body">
                <form class="form-horizontal" role="form">

                    <div class="form-group">
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="inputEmail3" placeholder="countryName" v-model.trim="country_name">
                        </div>
                        <button type="button" class="btn btn-primary" @click="addData">确认</button>
                    </div>



                    <div class="addTips">
                        {{addTips}}
                    </div>
                    <div class="addTips2">
                        {{addTips2}}
                    </div>
                </form>
            </div>
        </div>


</div>
</template>

<script>
import utils from '../utils/utils.js';
export default {
    data() {
        return {
            addTips: '',
            addTips2: '',
            country_name: ''   
        }
    },

    methods: {

        resetAdd() {
            this.country_name = '';
            this.addTips1 = '';
            this.addTips2 = '';
        },

        addData() {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/activity/oct/add',
                type: "POST",
                data: {
                    num: that.country_name
                },
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.addTips2 = '操作成功';
                        that.getData();
                        setTimeout(function() {
                            that.addTips2 = '';
                        }, 1000);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addData);
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        },
        getData() {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/activity/oct/get',
                type: "get",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.country_name = data.data.num
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.getData);
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        }


    },





    mounted() {
        this.$store.dispatch('tabChanger', 60);
        this.$store.dispatch('subChanger', 'sub9');

        this.getData();
    }
}
</script>
