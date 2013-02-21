define('BrandadAction',function(require, exports, module) {
	require('dwr');
    require('dwrError');
    require('dwrRequest');

	var dwr = window.dwr;
	if (dwr.engine == null) dwr.engine = {};
	if (DWREngine == null) var DWREngine = dwr.engine;
	if (BrandadAction == null) var BrandadAction = {};
	BrandadAction._path = SUPERZONE_BASE_URL + '/dwr';

	BrandadAction.getChannelDeparts = function(callback) {
	  dwr.engine._execute(BrandadAction._path, 'BrandadAction', 'getChannelDeparts', callback);
	};
	BrandadAction.getChannelSellers = function(p0, callback) {
	  dwr.engine._execute(BrandadAction._path, 'BrandadAction', 'getChannelSellers', p0, callback);
	};
	BrandadAction.getBrandadById = function(p0, callback) {
	  dwr.engine._execute(BrandadAction._path, 'BrandadAction', 'getBrandadById', p0, callback);
	};
	BrandadAction.updateBrandad = function(p0, callback) {
	  dwr.engine._execute(BrandadAction._path, 'BrandadAction', 'updateBrandad', p0, callback);
	};
	BrandadAction.next = function(p0, callback) {
	  dwr.engine._execute(BrandadAction._path, 'BrandadAction', 'next', p0, callback);
	};
	BrandadAction.searchBrandadList = function(p0, callback) {
      dwr.engine._execute(BrandadAction._path, 'BrandadAction', 'searchBrandadList', p0, callback);
    };
    BrandadAction.republishBrandad = function(p0, callback) {
      dwr.engine._execute(BrandadAction._path, 'BrandadAction', 'republishBrandad', p0, callback);
    };
    BrandadAction.updateBrandadAndNext = function(p0, callback) {
      dwr.engine._execute(BrandadAction._path, 'BrandadAction', 'updateBrandadAndNext', p0, callback);
    };
	exports.BrandadAction = BrandadAction;
	window.BrandadAction = window.BrandadAction || BrandadAction;
});