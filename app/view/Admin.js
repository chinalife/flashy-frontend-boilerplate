/*
 * 管理 View
 * @author liangxiao
 * @date 2012-10
 */

define('AdminView', function(require, exports, module) {

var Backbone = require('backbone'),
    Mustache = require('mustache'),
    $ = require('jquery'),
    esui = require('esui'),
    baidu = require('tangram'),
    adminValidator = require('adminValidator'),
    Calendar = require('calendar'),
    TPL_ADMIN = require('adminTpl'),
    TPL_ADMIN_LIST = require('adminlistTpl'),
    TPL_ADMIN_RENEW = require('adminrenewTpl');
    require('jdialog');
    require('limiter')($);
    
window.AdminView = Backbone.View.extend({
    el: "#Main",
    
    events: {
        "click #query": "onQueryClick",
        "change #page-top select": "onPageTopChange",
        "change #page-bottom select": "onPageBottomChange",
        "click .renewal": "onRenewalClick"
    },
    
    initialize: function() {
        //绑定model事件
        this.model.bind("change:list", this.onListChange);
        this.model.bind("change:basic", this.onBasicChange);
    },
    
    destroy: function() {
        this.model.unbind();
        this.$el.unbind();
        this.$el.html("");
        $("#dialog-admin-renew").jdialog("destroy");
    },
    
    render: function(query) {
        //初始化页面
        Brands.widgets.Nav.setActive(1);
        this.$el.html(TPL_ADMIN);
        
        //初始化控件
        esui.init();
        var view = this;
        esui.get("PageNoTop").onchange = function(page) {
            var pagerBottom = esui.get("PageNoBottom");
            pagerBottom.page = page;
            pagerBottom.render();
            
            view.args.pageNo = page + 1;
            view.query(view.args);
        };
        esui.get("PageNoBottom").onchange = function(page) {
            var pagerTop = esui.get("PageNoTop");
            pagerTop.page = page;
            pagerTop.render();
            
            view.args.pageNo = page + 1;
            view.query(view.args);
        };
        
        //初始请求
        this.args = {};
        this.getArgs();
        this.args.sizeOfPerPage = 50;
        this.args.pageNo = 1;
        this.pageRendered = false;
        this.query(this.args);
    },
    
    //获取参数
    getArgs: function() {
        this.args.projectionType = parseInt($("#projection-type").val(), 10);
        this.args.projectionStr = $.trim($("#projection-str").val());
        this.args.keyword = $.trim($("#keyword").val());
        this.args.status = parseInt($("#status").val(), 10);
    },
    
    //点击查询
    onQueryClick: function(evt) {
        this.getArgs();
        this.args.pageNo = 1;
        this.pageRendered = false;
        this.query(this.args);
    },
    
    //切换顶部页码
    onPageTopChange: function(evt) {
        var value = $(evt.target).val();
        this.$("#page-bottom select").val(value);
        this.args.sizeOfPerPage = parseInt(value, 10);
        this.args.pageNo = 1;
        this.pageRendered = false;
        this.query(this.args);
    },
    
    //切换底部页码
    onPageBottomChange: function(evt) {
        var value = $(evt.target).val();
        this.$("#page-top select").val(value);
        this.args.sizeOfPerPage = parseInt(value, 10);
        this.args.pageNo = 1;
        this.pageRendered = false;
        this.query(this.args);
    },
    
    //查询
    query: function(args) {
        this.model.getList(args);
    },
    
    //点击续费
    onRenewalClick: function(evt) {
        this.model.getBasic({
            brandadId: $(evt.target).parent().parent().attr("id")
        });
    },
    
    //渲染表格
    onListChange: function(model, list) {
        var view = Brands.main,
            args = view.args,
            totalNumber = list.totalNumber;
        
        if (totalNumber == 0) {
            view.$("#tips").show();
            view.$("#data").hide();
            view.$("#download").attr({
                href: 'javascript:void(0)'
            });
        } else {
            view.$("#tips").hide();
            view.$("#data").show();
            
            //页码
            if (!view.pageRendered) {
                var total = Math.ceil(totalNumber / args.sizeOfPerPage),
                    pagerTop = esui.get("PageNoTop"),
                    pagerBottom = esui.get("PageNoBottom");
                pagerTop.total = pagerBottom.total = total;
                pagerTop.page = pagerBottom.page = 0;
                pagerTop.render();
                pagerBottom.render();
                view.pageRendered = true;
            }
            view.$(".row-count").html("共 " + totalNumber + " 条");
            
            //下载
            view.$("#download").attr({
                href: '../../download?'+ baidu.url.jsonToQuery({
                    reportName: 'pz_brandad_list',
                    projectionType: args.projectionType,
                    projectionStr: encodeURIComponent(args.projectionStr),
                    keyword: encodeURIComponent(args.keyword),
                    status: args.status
                })
            });
            
            //表格
            var html = Mustache.to_html(TPL_ADMIN_LIST, {
                list: list.brandads
            });
            view.$(".table-wrap").html(html);
            
            //修改操作权限
            view.$(".table-wrap .status").each(function(index, elem) {
                var opRow = $(elem).next().next(),
                    viewLink = opRow.children("a.view"),
                    editLink = opRow.children("a.edit"),
                    renewalLink = opRow.children("a.renewal");
                if (!Auth.view) viewLink.remove();
                if (!Auth.editInfo && !Auth.editStyle) editLink.remove();
                if (!Auth.renewal) renewalLink.remove();
                
                if ($(elem).attr("status") == "4") {
                    editLink.remove(); //下线不可编辑
                }
                if ($(elem).attr("status") == "1" || $(elem).attr("status") == "101") {
                    renewalLink.remove(); //未提交不可续费
                }
            });
        }
    },
    
    //渲染续费窗口
    onBasicChange: function(model, basic) {
        var view = Brands.main;
        var options = {
            autoOpen: true,
            destroyContent: true,
            title: "续费操作",
            width: 650,
            buttons: {    
                "确定": $.proxy(view.onOK, view),      
                "取消": $.proxy(function() {
                    $("#dialog-admin-renew").jdialog("destroy");
                 }, view)
            }
        };
        $('body').append(Mustache.to_html(TPL_ADMIN_RENEW, {
            basic: basic
        }));
        adminValidator.init();
        var cal_start = new Calendar({trigger: '#admin-renew-sdate',zIndex: 1200});
        var cal_end = new Calendar({trigger: '#admin-renew-edate',zIndex: 1200});   
        $('#admin-renew-contractno').limiter({wrapper:'#admin-renew-contractnoLimiter', max:200});
        $('#admin-renew-contractnum').limiter({wrapper:'#admin-renew-contractnumLimiter', max:13});
        //创建对话框
        $("#dialog-admin-renew").jdialog(options);
    },
    
    //点击提交续费确定
    onOK: function() {
        function callback(error){
            if(!error){
                this.submitRenew();
            }
        }
        adminValidator.getInstance().execute($.proxy(callback,this));
    },
    //提交续费
    submitRenew: function() {
        var view = Brands.main,
            basic = view.model.get("basic");
            
        var args = {
            brandadId: basic.brandadId,
            custId: basic.custId,
            custName: basic.custName,
            custDomain: basic.custDomain,
            keywords: basic.keywords,
            salerId: basic.salerId,
            salerName: basic.salerName,
            //必填
            contractNo: $("#admin-renew-contractno").val(),
            amount: $("#admin-renew-contractnum").val(),
            startDateStr: $("#admin-renew-sdate").val(),
            endDateStr: $("#admin-renew-edate").val()
        };
        
        dwr.request.run({
            method: "BrandadAction.republishBrandad",
            args: [args],
            success: function(response) {
                $("#dialog-admin-renew").jdialog("destroy");
                //刷新列表
                view.args.pageNo = 1;
                view.pageRendered = false;
                view.query(view.args);
            },
            fail: view.model.fail
        });
    }
});

return AdminView;

});
