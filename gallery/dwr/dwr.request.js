define('dwrRequest',function(require, exports, module) {
    require('dwr');
    // require('BrandadAction');
/*
 * DWR请求封装
 * @author : liangxiao
 * @date   : 2012
 */

window.dwr.request = (function() {
    var defaults = {
        timeout: 300000, //超时
        httpMethod: 'POST', //请求方法
        
        //回调
        getCallback: function(success, fail, context) {
            return function(data) {
                if (!data || data.success == false) {
                    //show error
                    fail && fail(data, context);
                } else {
                    success && success(data, context);
                }
            };
        },
        
        //回调异常
        getErrorHandler: function(method, context) {
            return function(error) {
                //hide loading
                throw new Error(method + ' error: ' + error);
            };
        },
        
        //请求前执行
        getPreHook: function(httpMethod, context) {
            var method = httpMethod;
            return function() {
                //show loading
            };
        },
        
        //请求后执行
        postHook: function(context) {
            return function() {
                //hide loading
            };
        }
    };
    
    var run = function(options) {
        if (!options) return;
        
        var methods = options.method.split('.'), //方法名
            args = options.args || [], //参数
            success = options.success, //成功回调
            fail = options.fail,
            context = options.context,
            timeout = options.timeout || defaults.timeout,
            httpMethod = options.httpMethod || defaults.httpMethod,
            callback = options.callback || defaults.getCallback(success, fail, context),
            errorHandler = options.errorHandler || defaults.getErrorHandler(options.method, context),
            preHook = options.preHook || defaults.getPreHook(httpMethod, context),
            postHook = options.postHook || defaults.postHook(context);
        
        try {
             window.method = window[methods[0]][methods[1]];
        } catch (e) {
            throw new Error('DWRAction does not exist: ' + methods[0] + '.' + methods[1]);
        }
        
        args.push({
            timeout: timeout,
            httpMethod: httpMethod,
            callback: callback,
            errorHandler: errorHandler,
            preHook: preHook,
            postHook: postHook
        });
        
        method && method.apply(window, args);
    };
    
    return {
        run: run
    };
})();

});