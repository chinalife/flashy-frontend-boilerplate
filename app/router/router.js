define('router',function(require, exports, module) {

    window.Brands = {};
    window.Brands.Models = {};   //Model构造函数
    window.Brands.Views = {};    //View构造函数
    window.Brands.Router = {};   //Router构造函数
    window.Brands.cache = {};    //Model实例
    window.Brands.main = null;   //主View实例
    window.Brands.widgets = {};  //其他View实例
    window.Brands.widgets.dialog = {};
    window.Brands.router = null; //Router实例

    var Backbone = require('backbone');
    require('HeadView');
    require('NavView');
    require('FootView');
    require('EditModel');
    require('EditView');
    require('AdminModel');
    require('AdminView');
    require('StatModel');
    require('StatView');
    require('StatKeywordModel');
    require('StatKeywordView');
    require('RoleModel');
    require('RoleView');

    Brands.Router = Backbone.Router.extend({
        //路由规则
        routes: {
            "": "admin", //首页
            "edit/*query": "edit",   //编辑
            "admin/*query": "admin", //管理
            "stat/": "stat",   //统计客户
            "stat/keyword/*query": "statKeyword", //统计关键词
            "role/": "role"          //角色管理
        },

        //初始化
        initialize: function() {
            //创建头部View
            Brands.widgets.Head = new HeadView();
            //创建导航View
            Brands.widgets.Nav = new NavView();
            //创建底部View
            Brands.widgets.Foot = new FootView();
        },

        //销毁主View
        destroy: function() {
            var main = Brands.main;
            main && main.destroy && main.destroy();
        },

        //解析参数
        parseQuery: function(query) {
            return typeof query == "undefined" ? "" : query;
        },

        //编辑表单
        edit: function(query) {
            this.destroy();
            if(Auth.view || Auth.editInfo || Auth.editStyle){
                document.title = "发布 - 品牌专区";
                //创建Model(或读缓存)
                var model = Brands.cache.Edit || (Brands.cache.Edit = new EditModel());
                //创建View
                Brands.main = new EditView({model: model});

                var args = (query !== "") ? query.split(',') : "";
                var status = (args !== "") ? args[1] : "";//状态
                var type = (args !== "") ? args[2] : "";//查看Or修改
                brandadId = (args !== "") ? args[0] : "";//品专ID

                model.set({"brandadId": brandadId});
  
                //渲染View
                Brands.main.render(this.parseQuery(status, type));
            } else {
                this.navigate('admin/', {trigger: true});
            }
        },
        
        //管理
        admin: function(query) {
            this.destroy();
            document.title = "管理- 品牌专区";
            var model = Brands.cache.Admin || (Brands.cache.Admin = new AdminModel());
            Brands.main = new AdminView({model: model});
            Brands.main.render(this.parseQuery(query));
        },
        
        //统计客户
        stat: function(query) {
            this.destroy();
            document.title = "报告- 品牌专区";
            var model = Brands.cache.Stat || (Brands.cache.Stat = new StatModel());
            Brands.main = new StatView({model: model});
            Brands.main.render(this.parseQuery(query));
        },
        
        //统计关键词
        statKeyword: function(query) {
            this.destroy();
            document.title = "报告- 品牌专区";
            var model = Brands.cache.StatKeyword || (Brands.cache.StatKeyword = new StatKeywordModel());
            Brands.main = new StatKeywordView({model: model});
            Brands.main.render(this.parseQuery(query));
        },
        
        //角色管理
        role: function() {
            this.destroy();
            document.title = "角色管理- 品牌专区";
            var model = Brands.cache.Role || (Brands.cache.Role = new RoleModel());
            Brands.main = new RoleView({model: model});
            Brands.main.render();
        }
    });
    
    exports.init = function() {
        //实例化Router
        Brands.router = new Brands.Router();
        //开始监听hash
        Backbone.history.start();
    };
});
