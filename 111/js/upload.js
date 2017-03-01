var load=$(".inputs");
load.on("change",function(){

    var len=this.files.length;
    var exists=$(".up_uls").find("li").length;//应经存在的li
    if((len+exists)>3){//添加的 + 已经存在的 不能超过3张
        alert("最多只能上传3张");
        return;
    }
    if((len+exists)==3){
        $(".upload_file label").hide();
        $(".inputs").hide();
    }
    for(var i=0;i<len;i++){
        //转换成DataURL的base64
        var reader=new FileReader();

        var type=this.files[0].type;//是个对象 下边有type属性  即toDataURL(image/png,0-1之间的数)
        var name=this.files[i].name;
        var size=this.files[i].size;

        //用fileReader的readAsDataURL()方法
        reader.readAsDataURL(this.files[i]);

        reader.onload=function(){
            var res=this.result;//图片的编码

            //压缩
            var image=new Image();
            image.src=res;//图片的编码可作为图片路径
            image.onload=function(){
                //console.log(this.width)

                //压缩图片调用
                var scaleSrc=compress(this,0.8);
                //动态创建li 追加到ul里 可以在页面中预览图片
                $('<li><img src="'+scaleSrc+'"></li>').appendTo($(".up_uls"));
            };

        }
    }
    //压缩图片
    function compress(target,scale){//target指创建的image对象
        var canvas=document.createElement("canvas");
        var cvs=canvas.getContext("2d");
        canvas.width=target.width;//设置画布=图片一样大小
        canvas.height=target.height;
        cvs.drawImage(target,0,0,target.width,target.height);
        return canvas.toDataURL(type,scale);
    }
});

