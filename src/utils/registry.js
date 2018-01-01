/**
 * 全局注册表
 * 2018-1-1
 */
export default class Registry {

	// 全局变量区
	static val = {};

    static set = function(key, value) {
    	this.val[key] = value;
    }

    static get = function(key) {
    	return this.val[key];
    }

    static del = function(key){
    	return this.val[key];
    }

    static trash = function(){
    	this.val = {};
    }
}