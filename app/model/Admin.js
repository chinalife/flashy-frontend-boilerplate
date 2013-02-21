/*
 * 管理 Model
 * @date 2012-09
 */

define('AdminModel', function(require, exports, module) {

var Backbone = require('backbone');
require('dwr');
require('dwrRequest');
require('BrandadAction');

window.AdminModel = Backbone.Model.extend({
    defaults: {
        list: null,
        basic: null
    },
    
    //获取列表
    getList: function(args) {
        var me = this;
        me.set({list : null}, {silent : true});
        
        dwr.request.run({
            method: "BrandadAction.searchBrandadList",
            args: [args],
            success: function(response) {
                me.set({list: response.data});
            },
            fail: me.fail
        });
    },
    
    //获取客户信息
    getBasic: function(args) {
        var me = this;
        me.set({basic : null}, {silent : true});
        
        dwr.request.run({
            method: "BrandadAction.getBrandadById",
            args: [args],
            success: function(response) {
                me.set({basic: response.data});
            },
            fail: me.fail
        });
    },
    
    fail: function(response) {
        var errorMsgList = [];
        for(var i = 0; i< response.errors.length; i++){                                
            errorMsgList.push('['+ i +'].' + response.errors[i].errorMsg);
        }
        alert('错误消息：' + '\n' + errorMsgList.join('\n'));
    }
});

return AdminModel;

});
