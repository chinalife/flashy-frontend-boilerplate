define(function(require){

	var $ = jQuery = require('jquery');
	var _ = require('underscore');

	//暴露到全局
	window.$ = $;
	window._ = _;

	$(function(){
		var router = require('router');
		router.init();
	});

});