function getConfig(configName){
    function getParameter(url,name){
        if(!url){
            return '';
        };
        var qs = url.split('?');
        if(qs.length >= 2){
            var ps = qs[1].split('&');
            for(var i = 0; i < ps.length; i++){
                var p = ps[i].split('=');
                if(p[0] === name){
                    return p[1];
                }
            }
        }
    }
    var scripts = document.getElementsByTagName('script')
    for(var i = 0; i < scripts.length; i++){
        if(scripts[i].src.indexOf('config.js') > 0){
            return getParameter(scripts[i].src,configName);
        }
    }
    return '';
}

var isDebug = getConfig('debug') === 'true';
var version = getConfig('v');
seajs.config({
    alias: {
        '$': 'seajs/modules/jquery/1.7.2/jquery.js?v='+version,
        'jquery': 'seajs/modules/jquery/1.7.2/jquery.js?v='+version,
        'jqueryui': 'lib/jqueryui/1.8.17/jquery-ui-1.8.17.js?v='+version,
        'jdialog': 'lib/jdialog.js?v='+version,
        'cursor': 'lib/cursor.js?v='+version,
        'jQueryMustache': 'lib/jquery-Mustache.js?v='+version,

        'plugin-base': 'plugin-base.js?v='+version,
        'plugin-json': 'plugin-json.js?v='+version,
        'plugin-text': 'plugin-text.js?v='+version,
        'plugin-combo': 'plugin-combo.js?v='+version,

        'underscore': 'seajs/modules/underscore/1.3.3/underscore.js?v='+version,
        'backbone': 'seajs/modules/backbone/0.9.2/backbone.js?v='+version,
        'handlebars': 'seajs/modules/handlebars/1.0.0/handlebars.js?v='+version,
        'events': 'seajs/modules/events/1.0.0/events.js?v='+version,
        'base': 'seajs/modules/base/1.0.1/base.js?v='+version,
        'class': 'seajs/modules/class/1.0.0/class.js?v='+version,
        'mask': 'seajs/modules/overlay/mask.js?v='+version,
        'overlay': 'seajs/modules/overlay/overlay.js?v='+version,
        'position': 'seajs/modules/position/position.js?v='+version,
        'iframe-shim': 'seajs/modules/iframe-shim/iframe-shim.js?v='+version,
        'widget': 'seajs/modules/widget/1.0.2/widget.js?v='+version,
        'validator': 'seajs/modules/validator/validator.js?v='+version,
        'moment': 'seajs/modules/moment/1.6.2/moment.js?v='+version,
        'templatable': 'seajs/modules/widget/1.0.2/templatable.js?v='+version,
        'lang': 'seajs/modules/calendar/lang.js?v='+version,
        'calendar': 'seajs/modules/calendar/calendar.js?v='+version,
        'json': 'seajs/modules/json/1.0.2/json.js?v='+version,
        'mustache': 'seajs/modules/mustache/0.5.0/mustache.js?v='+version,

        //validator core
        'item': 'seajs/modules/validator/item.js?v='+version,
        'rule': 'seajs/modules/validator/rule.js?v='+version,
        'core': 'seajs/modules/validator/core.js?v='+version,
        'async': 'seajs/modules/validator/async.js?v='+version,
        'validator-util': 'seajs/modules/validator/utils.js?v='+version,

        //widget
        'daparser': 'seajs/modules/widget/1.0.2/daparser.js?v='+version,
        'auto-render': 'seajs/modules/widget/1.0.2/auto-render.js?v='+version,
        'calendarTpl': 'seajs/modules/calendar/calendar.tpl?v='+version,
        'CalendarModel': 'seajs/modules/calendar/model.js?v='+version,

        //base
        'aspect': 'seajs/modules/base/1.0.1/aspect.js?v='+version,
        'attribute': 'seajs/modules/base/1.0.1/attribute.js?v='+version,

        //dwr lib
        'dwr': 'lib/dwr/dwr.engine.js?v='+version,
        'dwrRequest': 'lib/dwr/dwr.request.js?v='+version,
        'dwrError': 'lib/dwr/dwr.error.js?v='+version,

        //jquery-ui & flash
        'bizc': 'lib/bizc.js?v='+version,
        'bgiframe': 'lib/bgiframe.js?v='+version,
        'uploader': 'lib/uploader.js?v='+version,
        'tangram': 'lib/tangram-1.5.2.1.js?v='+version,
        'esui': 'lib/esui-2.0.4.js?v='+version,
        'swfobject': 'lib/swfobject.js?v='+version,
        'limiter': 'lib/limiter.js?v='+version,
        'util': 'lib/util.js?v='+version,
        'bizUtil': 'app/util/bizUtil.js?v='+version,
        'uniform': 'lib/jquery.uniform.js?v='+version,

        //dwr actions
        'BrandadAction': 'app/actions/BrandadAction.js?v='+version,
        'BrandadStatAction': 'app/actions/BrandadStatAction.js?v='+version,
        'BrandStyleGetAction': 'app/actions/BrandStyleGetAction.js?v='+version,
        'BrandStyleSetAction': 'app/actions/BrandStyleSetAction.js?v='+version,
        'StyleSelectAction': 'app/actions/StyleSelectAction.js?v='+version,
        'StyleSubmitAction': 'app/actions/StyleSubmitAction.js?v='+version,
        'StyleReviewAction': 'app/actions/StyleReviewAction.js?v='+version,
        'UserAuthAction': 'app/actions/UserAuthAction.js?v='+version,
        
        //validator
        'adminValidator': 'app/validator/adminValidator.js?v='+version,
        'basicValidator': 'app/validator/basicValidator.js?v='+version,
        'headnormalValidator': 'app/validator/headnormalValidator.js?v='+version,
        'headleftimgValidator': 'app/validator/headleftimgValidator.js?v='+version,
        'headrightlistValidator': 'app/validator/headrightlistValidator.js?v='+version,
        'headrightimgValidator': 'app/validator/headrightimgValidator.js?v='+version,
        'rightImgValidator': 'app/validator/rightImgValidator.js?v='+version,
        'rightFlvValidator': 'app/validator/rightFlvValidator.js?v='+version,
        'footbtnValidator': 'app/validator/footbtnValidator.js?v='+version,
        'footsearchValidator': 'app/validator/footsearchValidator.js?v='+version,
        'footTableValidator': 'app/validator/footTableValidator.js?v='+version,
        'midlistValidator': 'app/validator/midlistValidator.js?v='+version,
        'midTabValidator': 'app/validator/midTabValidator.js?v='+version,
        'midmultiValidator': 'app/validator/midmultiValidator.js?v='+version,
        
        'main': 'main.js?v='+version,
        'router': 'app/routers/router.js?v='+version,

        //Models
        'AdminModel': 'app/models/Admin.js?v='+version,
        'EditModel': 'app/models/EditModel.js?v='+version,
        'RoleModel': 'app/models/Role.js?v='+version,
        'StatModel': 'app/models/Stat.js?v='+version,
        'StatKeywordModel': 'app/models/StatKeyword.js?v='+version,

        //Views
        'AdminView': 'app/views/Admin.js?v='+version,
        'EditView': 'app/views/Edit.js?v='+version,
        'FootView': 'app/views/Foot.js?v='+version,
        'RoleView': 'app/views/Role.js?v='+version,
        'HeadView': 'app/views/Head.js?v='+version,
        'NavView': 'app/views/Nav.js?v='+version,
        'StatView': 'app/views/Stat.js?v='+version,
        'StatKeywordView': 'app/views/StatKeyword.js?v='+version,

        //dialog models
        'DialogFootTableModel': 'app/models/DialogFootTable.js?v='+version,
        'DialogMidTabModel': 'app/models/DialogMidTab.js?v='+version,
        
        //dialog views
        'DialogHeadNormalView': 'app/views/DialogHeadNormal.js?v='+version,
        'DialogHeadLeftImageView': 'app/views/DialogHeadLeftImage.js?v='+version,
        'DialogHeadRightListView': 'app/views/DialogHeadRightList.js?v='+version,
        'DialogHeadRightImageView': 'app/views/DialogHeadRightImage.js?v='+version,
        'DialogFootSearchView': 'app/views/DialogFootSearch.js?v='+version,
        'DialogFootTableView': 'app/views/DialogFootTable.js?v='+version,
        'DialogFootBtnView': 'app/views/DialogFootButton.js?v='+version,
        'DialogTabView': 'app/views/DialogMidTab.js?v='+version,
        'DialogMidListView': 'app/views/DialogMidList.js?v='+version,
        'DialogMidMultiView': 'app/views/DialogMidMulti.js?v='+version,
        'DialogRightImgView': 'app/views/DialogRightImage.js?v='+version,
        'DialogRightFlvView': 'app/views/DialogRightFlv.js?v='+version,
    
        //page template
        'basicformTpl' : 'templates/basic-form.tpl?v='+version,
        'departlistTpl': 'templates/departlist.tpl?v='+version,
        'personlistTpl': 'templates/personlist.tpl?v='+version,
        'selectformTpl': 'templates/select-form.tpl?v='+version,
        'editformTpl': 'templates/edit-form.tpl?v='+version,
        'successTpl': 'templates/publish-success.tpl?v='+version,
        'adminTpl': 'templates/admin.tpl?v='+version,
        'adminlistTpl': 'templates/admin-list.tpl?v='+version,
        'adminrenewTpl': 'templates/admin-renew.tpl?v='+version,
        'statkeywordTpl': 'templates/stat-keyword.tpl?v='+version,
        'headerTpl': 'templates/header.tpl?v='+version,
        'footerTpl': 'templates/footer.tpl?v='+version,
        'statkeywordlistTpl': 'templates/stat-keyword-list.tpl?v='+version,
        'statcustTpl': 'templates/stat-cust.tpl?v='+version,
        'statcustlistTpl': 'templates/stat-cust-list.tpl?v='+version,
        'rolelistTpl': 'templates/role-list.tpl?v='+version,
        'roleeditTpl': 'templates/role-edit.tpl?v='+version,
        'navTpl': 'templates/nav.tpl?v='+version,

        //dialog template
        'headNormalTpl': 'templates/dialog-head-normal.tpl?v='+version,
        'headleftimgTpl': 'templates/dialog-head-left-img.tpl?v='+version,
        'headrightimgTpl': 'templates/dialog-head-right-img.tpl?v='+version,
        'headrightlistTpl': 'templates/dialog-head-right-list.tpl?v='+version,

        'midtabTpl': 'templates/dialog-mid-tab.tpl?v='+version,
        'midlistTpl': 'templates/dialog-mid-list.tpl?v='+version,
        'midmultiTpl': 'templates/dialog-mid-multi.tpl?v='+version,
        
        'footTableTpl': 'templates/dialog-foot-table.tpl?v='+version,
        'footbtnTpl': 'templates/dialog-foot-btn.tpl?v='+version,
        'footsearchTpl': 'templates/dialog-foot-search.tpl?v='+version,
                
        'rightImgTpl': 'templates/dialog-right-img.tpl?v='+version,
        'rightFlvTpl': 'templates/dialog-right-video.tpl?v='+version
    },
    charset: 'utf-8',
    // debug: isDebug, 
    debug: true,
    comboSyntax: ['combo/??', ','],
    comboExcludes: /.*.tpl/,
    preload: ['plugin-base', 'plugin-json', 'plugin-text', 'plugin-combo']
    
});




 