define('dwrError',function(require, exports, module) {
	require('dwr');
/*
 * DWR错误码定义
 * @author : liangxiao
 * @date   : 2012
 */

window.dwr.error = (function() {
    var config = {
        '-1': '系统繁忙，请您稍后再试。'
    };
    
    var getText = function(code) {
        return config[code] ? config[code] : config[-1];
    };
    
    return {
        getText: getText
    };
})();

});