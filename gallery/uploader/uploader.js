define('uploader', function(require, exports, module){ 
    /*
     * 上传文件
     * @date 2012-09
     */

    /*
     * Uploader类
     * @param {Object} options
     *   options.maxSize  : 最大字节数
     *   options.container: Flash容器(id)
     *   options.objectId : Flash对象id
     *   options.status   : 状态信息容器(id)
     *   [options.param   ： 参数]
     *   [options.onUploadSuccess: 成功回调]
     */
     var JSON = require('json');
     var Swfobject = require('swfobject');
   
    Uploader = function(options) {
        this.maxSize = options.maxSize;
        this.container = options.container;
        this.objectId = options.objectId;
        this.status = options.status;
        this.param = options.param || {};
        this.onUploadSuccess = options.onUploadSuccess;
    };

    /*
     * 类属性
     */
    Uploader.MAX_IMG_SIZE = 80 * 1024;
    Uploader.MAX_HEAD_IMG_SIZE = 5 * 1024;
    Uploader.MAX_LEFT_IMG_SIZE = 20 * 1024;
    Uploader.MAX_HEAD_RIGHT_IMG_SIZE = 10 * 1024;
    Uploader.MAX_TAB_IMG_SIZE = 15 * 1024;
    Uploader.MAX_RIGHT_IMG_SIZE = 80 * 1024;
    Uploader.MAX_RIGHT_SHARE_SIZE = 50 * 1024;
    Uploader.MAX_RIGHT_FLV_SIZE = 700 * 1024;
    Uploader.MAX_RIGHT_FRAME_SIZE = 30 * 1024;
    Uploader.UPLOAD_FLV = SUPERZONE_BASE_URL+"/asset/swf/uploadFlv.swf";
    Uploader.UPLOAD_IMG = SUPERZONE_BASE_URL+"/asset/swf/uploadImg.swf";
    Uploader.UPLOAD_SWF = SUPERZONE_BASE_URL+"/asset/swf/uploadSwf.swf";
    Uploader.INSTALL_SWF = SUPERZONE_BASE_URL+"/asset/swf/expressInstall.swf";
    Uploader.UPLOAD_URL = SUPERZONE_BASE_URL + "/upload";
    Uploader.ERROR_CODE = {
        "101": "图片尺寸不正确",
        "102": "图片格式不正确",
        "103": "图片过大"
    };

    Uploader.prototype = {
        /*
         * 准备上传(Flash调用)
         * @public
         * @param {String} name 文件名(带扩展名)
         * @param {Number} size 文件字节数
         */
        startUpload: function(name, size) {
            this.name = name;
            this.size = size;
            this.object = Swfobject.getObjectById(this.objectId);
            
            if (size == 0 || size > this.maxSize) {
                this.showMsg("error", size == 0 ? "文件不能为0kb" : "文件不能超过" + this.maxSize / 1024 + "kb");
                this.object.cancelUploadFile();
            } else {
                //上传
                this.object.startUploadFile(Uploader.UPLOAD_URL, this.param);
            }
        },
        
        /*
         * 显示上传进度(Flash调用)
         * @public
         * @param {Number} size 已上传字节数
         */
        showProgress: function(size) {
            this.showMsg("", "上传中... " + parseInt(size * 100 / this.size) + "%");
        },
        
        /*
         * 上传结束(Flash调用)
         * @public
         * @param {String} msg 返回信息
         */
        endUpload: function(msg) {
            //Flash返回
            if (msg == "uploadFailed") {
                this.showMsg("error", "网络异常");
                this.object.cancelUploadFile();
                return;
            }
            
            //验证数据格式
            try {
                var response = JSON.parse(msg);
            } catch(e) {
                this.showMsg("error", "解析异常");
                this.object.cancelUploadFile();
                return;
            }
            
            //Server返回
            if (!response.success) {
                this.showMsg("error", Uploader.ERROR_CODE[response.errorCode + ""]);
                this.object.cancelUploadFile();
            } else {
                this.showMsg("success", "上传成功");
                //成功回调
                this.onUploadSuccess && this.onUploadSuccess(response.url);
            }
        },
        
        /*
         * 上传过程中再次点击上传(Flash调用)
         * @public
         */
        stop: function() {
            alert("请等待文件上传完毕");
        },
        
        /*
         * 显示信息
         * @private
         * @param {String} style 样式
         * @param {String} text 文本
         */
        showMsg: function(style, text) {
            var status = typeof this.status == "string" ? $("#" + this.status) : this.status;
            status.attr({"class": style}).html(text);
        }
    };

    return Uploader;
});
