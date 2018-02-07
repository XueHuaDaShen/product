<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <!-- <button style = "float: left; margin-top: 3px;" type="button" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddUnion">上传视频</button> -->
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <div>
            <div style="width:80%;margin:0 auto;position:relative;">
                <!-- <div class="videoloading1">
                    <div class="progress progress-striped active" style="width:50%">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                             aria-valuemin="0" aria-valuemax="100" :style="{width: progressWidth}">
                            <span>{{ progressWidth }}</span>
                        </div>
                    </div>
                </div> -->
                <div class="newLoading" v-if="upshow">
                    <div class="progress progress-striped active" style="width:100%">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                             aria-valuemin="0" aria-valuemax="100" :style="{width: progressWidth}">
                            <span>{{ progressWidth }}</span>
                        </div>
                    </div>
                </div>
                <div class="videoloading2">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">上传视频</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form" encType="multipart/form-data">
                        <!-- <div class="form-group" v-show="!is_uploadVideoEd">
                            <label for="inputEmail1" class="col-sm-2 control-label">选择视频 (*)</label>
                            <div class="col-sm-10">
                                <input type="file" class="input-file" id="fileInput" name="avatar" @change="uploadFile()" ref="test">
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label class="col-sm-1 control-label">选择视频 (*)</label>
                            <div class="col-sm-11" id="fileImgParent">
                                <input type="file" style="width: 60%;height: 32px;padding-top: 6px;float: left" id="fileImg" class="myfile" ref="img1" >
                                <input class="btn btn-default" type="button" value="上传" style="float:left;height: 32px;margin: 0 30px;" @click="upImg1()"/>
                                <!-- <div class="spinner" style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow">
                                    <div class="spinner-container container1">
                                        <div class="circle1"></div>
                                        <div class="circle2"></div>
                                        <div class="circle3"></div>
                                        <div class="circle4"></div>
                                    </div>
                                    <div class="spinner-container container2">
                                        <div class="circle1"></div>
                                        <div class="circle2"></div>
                                        <div class="circle3"></div>
                                        <div class="circle4"></div>
                                    </div>
                                    <div class="spinner-container container3">
                                        <div class="circle1"></div>
                                        <div class="circle2"></div>
                                        <div class="circle3"></div>
                                        <div class="circle4"></div>
                                    </div>
                                </div> -->
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="imgOk">
                                    <i class="fa fa-check AM-check" aria-hidden="true"></i>
                                    上传成功
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="imgChecked">
                                    <i class="fa fa-check AM-check" aria-hidden="true"></i>
                                    已选择，请上传
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="imgFail">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    上传失败
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="imgCheck">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    请选择
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="imgUpLoad">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    请上传
                                </div>

                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-1 control-label">选择封面 (*)</label>
                            <input class="btn btn-default" type="button" value="抽帧" style="float:left;height: 32px;margin-left:15px;" v-if="!is_frame" @click="getImgList"/>
                            <div class="spinner" style="margin: 6px; float: left; margin-right: 30px;" v-if="frame_show">
                                <div class="spinner-container container1">
                                    <div class="circle1"></div>
                                    <div class="circle2"></div>
                                    <div class="circle3"></div>
                                    <div class="circle4"></div>
                                </div>
                                <div class="spinner-container container2">
                                    <div class="circle1"></div>
                                    <div class="circle2"></div>
                                    <div class="circle3"></div>
                                    <div class="circle4"></div>
                                </div>
                                <div class="spinner-container container3">
                                    <div class="circle1"></div>
                                    <div class="circle2"></div>
                                    <div class="circle3"></div>
                                    <div class="circle4"></div>
                                </div>
                            </div>
                            <div class="col-sm-11">
                                <div class="videoUploadImgBox">
                                    <div v-for="(obj, index) in videoImgList">
                                        <input type="radio" class="videoUploadRadio" :value="[obj.path, obj.id]" name="r1" v-model.trim="videoImgUrl">
                                        <i class="fa fa-check videoUploadCheckImg" aria-hidden="true"></i>
                                        <span><img :src="obj.url"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-1 control-label">tags (*)</label>
                            <div class="col-sm-11">
                                <input type="text" class="form-control" placeholder="请用英文，隔开" v-model.trim="newtag">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-1 control-label">title (*)</label>
                            <div class="col-sm-11">
                                <input type="text" class="form-control" placeholder="title" v-model.trim="newtitle">
                            </div>
                        </div>
                        <div class="addTips">
                            {{addATips1}}
                        </div>
                        <div class="addTips2">
                            {{addATips2}}
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="addUnion">确认</button>
                    <button type="button" class="btn btn-default" @click="resetaddUnion">取消</button>
                </div>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
import utils from '../utils/utils.js';
export default {
    data() {
        return {
            agentL: [],
            name: "",
            newtags: [{"tag": ""}],
            newtag: "",
            newtitle: "",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            agencyN: "",
            agencyUpID: "",
            AMtips1: "",
            AMtips2: "",
            v_file: "",
            videoFile:{},
            videoMd5: "",
            videoSize: 0,
            normalSize: 1024*1024*10,
            videoFiles: "",
            is_video: false,
            is_uploadVideoEd: false,
            is_loading: false,
            videoImgList: [],
            videoImgUrl: [],
            videoImgPath: "",
            videoImgId: "",
            videoShortId: "",
            videoImgType: "",
            videoImgTag: "",
            progressWidth: 0,
            upText: 0,
            imgChecked: false,
            imgOk: false,
            imgFail: false,
            imgCheck: false,
            imgUpLoad: false,
            upshow: false,

            is_frame: false,
            frame_show: false,

            isClickUpload: false,

            imgFileUploadFn: null,
            qiniuDomainImg: 'http://i1.live.aisoqu.com/',
            qiniuDomainLive: 'http://s1.live.aisoqu.com/',
            fileImgUrl: "",
            fileHash: "",
            fileName: "",
            fileSize: "",
            fileType: "",
            fileInterval: "",
            videoWidth: "",
            videoHeight: "",
        }
    },

    methods: {

        resetaddUnion() {
            const that = this;
            that.videoSize = "";
            that.videoMd5 = "";
            that.videoImgList = [];
            that.is_video = false;
            that.is_uploadVideoEd = false;
            that.is_loading = false;
            that.videoFiles = "";
            that.newtags = [{"tag": ""}];
            that.newtitle = "";
            that.progressWidth = 0;
            that.upText = 0;
            that.videoShortId = "";


            that.videoImgUrl = [];
            that.videoImgPath =  "";
            that.videoImgId =  "";
            that.is_frame = false;
            that.frame_show = false;
            that.imgChecked = false;
            that.imgOk = false;
            that.imgFail = false;
            that.imgCheck = false;
            that.imgUpLoad = false;
            that.upshow = false;
            that.newtag = "";

            that.isClickUpload = false;

            that.imgFileUploadFn = null;
            that.fileImgUrl = "";

            that.fileHash = "";
            that.fileName = "";
            that.fileSize = "";
            that.fileType = "";
            that.fileInterval = "";

            // that.uploadImg();
        },
        


        addUnion() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            that.videoImgPath = that.videoImgUrl[0];
            that.videoImgId = that.videoImgUrl[1];
            if( !that.imgOk ){
                that.addATips1 = '请上传视频';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( !that.is_frame ) {
                that.addATips1 = '请抽帧';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.videoImgUrl == "" || that.videoImgUrl === "" ) {
                that.addATips1 = '请选择封面';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newtag == "" || that.newtag === "" ) {
                that.addATips1 = '请填写tag';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newtitle == "" || that.newtitle === "" ) {
                that.addATips1 = '请填写title';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/shortvideo/save',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "playback_url": that.fileImgUrl, 
                        "md5": that.fileHash, 
                        "path": that.videoImgPath, 
                        "name": that.fileName, 
                        "type": that.fileType, 
                        "size": that.fileSize,
                        "interval": that.fileInterval, 
                        "videoid": that.videoShortId,
                        "key": that.videoImgId.toString()+"."+that.videoImgType,
                        "tags": that.newtag,
                        "title": that.newtitle,
                        "width": that.videoWidth,
                        "height": that.videoHeight
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            setTimeout(function() {
                                that.addATips2 = '';
                                // $('#addAgentModal').modal('hide');
                            }, 1000);
                            that.resetaddUnion()
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addUnion);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function() {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }
            
        },

        


        getImgList() {
            const that = this;
            that.frame_show = true;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/shortvideo/screenhot/take',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "post",
                data: {
                    url: that.fileImgUrl
                },
                success: function (data) {
                    console.log(data)
                    if( that.isEmptyObject(data.data) ){
                        that.addATips1 = '抽帧失败';
                        setTimeout(function() {
                            that.addATips1 = '';
                        }, 1000);
                        that.is_frame = false;
                        that.frame_show = false;
                        return false;
                    }else{
                        that.videoImgList = data.data.screens;
                        that.videoShortId = data.data.id;
                        that.is_frame = true;
                        that.frame_show = false;
                    }
                },
                fail: function () {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            })
        },

        isEmptyObject(e) {
            let t;
            for (t in e)
                return !1;
            return !0
        },


        upImg1() {
            const that = this;
            // that.imgFile1 = this.$refs.img1.files[0];
            // console.log(that.imgFile1);
            // let formData = new FormData();
            // const reader = new FileReader();
            // reader.onload = function (e) {
            //     formData.append('avatar', that.imgFile1);
            // }
            if( that.imgChecked ){
                that.imgChecked = false;
                that.imgFileUploadFn.start();
                that.upshow = true;
            } else {
                that.imgCheck = true;
                setTimeout(function(){
                    that.imgCheck = false;
                }, 1000)
            }
            
        },

        uploadImg() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/qiniu/media/token',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "post",
                success: function (data) {
                    that.imgFileUploadFn = Qiniu.uploader({
                        runtimes: 'html5,flash,html4',    //上传模式,依次退化
                        browse_button: "fileImg",       //上传选择的点选按钮，**必需**
                        // uptoken_url: data.data.uptoken,            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                        uptoken : data.data.uptoken, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                        // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                        save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
                        domain: that.qiniuDomainLive,   //bucket 域名，下载资源时用到，**必需**
                        get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                        container: "fileImgParent",           //上传区域DOM ID，默认是browser_button的父元素，
                        max_file_size: '100mb',           //最大文件体积限制
                        // flash_swf_url: 'libs/Moxie.swf',  //引入flash,相对路径
                        max_retries: 3,                   //上传失败最大重试次数
                        dragdrop: true,                   //开启可拖曳上传
                        drop_element: "fileImgParent",        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                        chunk_size: '4mb',                //分块上传时，每片的体积
                        auto_start: false,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                        init: {
                            'FilesAdded': function(up, files) {
                                console.log('up:---',up)
                                console.log('files:---',files)
                                that.progressWidth = '';
                                

                                that.imgChecked = true;
                                that.imgOk = false;
                                that.imgFail = false;
                                that.imgCheck = false;
                                that.imgUpLoad = false;
                                plupload.each(files, function(file) {
                                    // 文件添加进队列后,处理相关的事情
                                    
                                });
                            },
                            'BeforeUpload': function(up, file) {
                                // 每个文件上传前,处理相关的事情
                            },
                            'UploadProgress': function(up, file) {
                                // 每个文件上传时,处理相关的事情
                                // console.log(up)
                                // console.log(file)
                                var percent = Math.floor(event.loaded / event.total * 100) ;
                                // 设置进度显示
                                that.progressWidth = percent+"%";
                            },
                            'FileUploaded': function(up, file, info) {
                                // 每个文件上传成功后,处理相关的事情
                                // 其中 info 是文件上传成功后，服务端返回的json，形式如
                                // {
                                //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                                //    "key": "gogopher.jpg"
                                //  }
                                // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                                // var domain = up.getOption('domain');
                                // var res = parseJSON(info);
                                // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                                that.fileImgUrl = that.qiniuDomainLive + JSON.parse(info.response).key;
                                that.fileHash = JSON.parse(info.response).hash;
                                that.fileName = file.name;
                                that.fileSize = file.size;
                                that.fileType = file.type;
                                that.imgChecked = false;
                                that.imgFail = false;
                                that.imgCheck = false;
                                that.imgUpLoad = false;
                                that.imgOk = true;
                                that.upshow = false;
                                $.ajax({
                                    url: that.fileImgUrl+"?avinfo",
                                    type: "GET",
                                    success:function(data){
                                        // if( data.error ){

                                        // }else{
                                            // console.log(data.streams)
                                            for(var i in data.streams){
                                                for(var j in data.streams[i]){
                                                    // console.log(j)
                                                    if( j == 'width' ){
                                                        that.videoWidth = data.streams[i].width;
                                                    }else if( j == 'height' ){
                                                        that.videoHeight = data.streams[i].height;
                                                    }
                                                }
                                            }
                                            // console.log(that.videoWidth)
                                            // console.log(that.videoHeight)
                                            // console.log(data.format.duration)
                                            // console.log(Math.ceil(data.format.duration*1000))
                                            that.fileInterval = Math.ceil(data.format.duration*1000)
                                        // }
                                        
                                    }
                                })
                            },
                            'Error': function(up, err, errTip) {
                                //上传出错时,处理相关的事情
                                that.imgFail = true;
                                that.upshow = false;
                                console.log('失败')
                            },
                            'UploadComplete': function() {
                                //队列文件处理完毕后,处理相关的事情
                            },
                            'Key': function(up, file) {

                                
                                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                                // 该配置必须要在 unique_names: false , save_key: false 时才生效
                                var key = "";
                                // do something with key here
                                return key
                            }
                        }
                    });
                },
                fail: function () {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            })
        },

        create_info(arr) {
            const that = this;
            that.videoImgTag = "";
            arr.push({
                "tag": that.videoImgTag
            })
        },

        del_info(index, arr) {
            arr.splice(index,1)
        },

       

    },

    mounted() {
        this.$store.dispatch('tabChanger', 42);
        this.$store.dispatch('subChanger', 'sub8');
        this.uploadImg();
        // this.unionList(this.page, this.size);
    }
}
</script>
