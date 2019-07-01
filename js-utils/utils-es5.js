
/*
xxx(ES5) 由blogwy维护

作者GitHub：https://github.com/blogwy

作者个人博客：http://www.wangyu.link

本项目GitHub开源，欢迎热心网友修改源码，无需注明出处。
*/

var utils = {
  // --------字符串模块--------
  /**
   * @description 去掉参数str中的空格
   * @method trim
   * @param {string} str 参数名
   * @param {number} type 参数名  1-所有空格  2-前后空格  3-前空格 4-后空格
   * @return {string} 去掉空格是str
   */
  trim: function (str, type) {
    str = str.toString();
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  },
  /**
   * @description 替换字符串
   * @method replaceStr
   * @param {string} str 被替换的字符串
   * @param {string} startStr 开始字符串 为空则从开头匹配
   * @param {string} endStr 结束字符串 为空则从结尾匹配
   * @param {string} repStr 替换的字符串
   * @return {string} 替换后的字符串
   * @example replaceStr("wangbilibiliyu","wang","yu","acfun") --> "wangacfunyu"
   * */
  replaceStr: function (str,startStr,endStr,repStr) {
    var str1 = '',str2 = '';
    str1 = str.match(new RegExp(startStr + '(\\S*)' + endStr))[1];
    str2 = str.replace(new RegExp(str1),repStr);
    return str2;
  },
  // --------数组模块--------
  /**
   * @description 深拷贝数组、对象
   * @method deepCopy
   * @param {string} obj 参数名
   * @return {string} 拷贝后的数组、对象
   */
  deepCopy: function (obj) {
    var _obj = JSON.stringify(obj),
        resObj = JSON.parse(_obj);
    return resObj;
  },

  // --------验证模块--------

  // --------其他模块--------
  /**
   * @description 获取url里面的具体参数
   * @method getUrlParam
   * @param {string} paramName 参数名
   * @return {string} 返回要获取的参数值
   */
  getUrlParam: function (paramName) {
    var url = document.location.toString();
    var arrObj = url.split("?");
    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;
      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        if (arr != null && arr[0] == paramName) {
          return arr[1];
        }
      }
      return "";
    }else {
      return "";
    }
  },
  /**
   * @description 格式化时间戳
   * @method formatTimestamp
   * @param {Boolean} options.isNow 是否是当前时间,默认false
   * @param {string} options.rules 时间格式,默认为YYYY-MM-DD hh:mm:ss W
   * @param {number} options.timestamp 时间戳,如果isNow为true此项不填
   * @return {string} 格式化后的当前时间
   * @example formatTimestamp({"rules": ""}) --> "2019-02-15 15:43:24 星期五"
   */
  formatTimestamp: function (options) {
    var date,
        str = options.rules ? options.rules : "YYYY-MM-DD hh:mm:ss W",
        isNow = typeof(options.isNow) == "undefined" ? false : options.isNow,
        timestamp = options.timestamp ? options.timestamp : 0,
        week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    if (isNow){
      date = new Date();
    }else {
      if (timestamp.toString().length === 10){
        date = new Date(timestamp*1000);
      }
      if (timestamp.toString().length === 13) {
        date = new Date(timestamp);
      }
    }

    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));

    str = str.replace(/MM/, date.getMonth() > 8 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
    str = str.replace(/M/g, date.getMonth() + 1);

    str = str.replace(/w|W/g, week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());

    return str;
  },
	/**
	 * @description 在当前时间基础上获取时间戳
	 * @param {Boolean} options.isNow 默认false
	 * @param {String} options.type 可选值year/month/day/hour/minute/second
	 * @param {number} options.offset
	 * @param {Boolean} options.isAdd
	 * @return {number} 时间戳(13位)
	 */
	getDateTime: function (options) {
		var isNow = typeof(options.isNow) == "undefined" ? false : options.isNow,
				type = options.type,
				offset = options.offset,
				isAdd = options.isAdd,
				now = new Date().getTime(),
				oneSecond = 1000,
				oneMinute = 60 * oneSecond,
				oneHour = 60 * oneMinute,
				oneDay = 24 * oneHour,
				oneMonth = 30 * oneDay,
				oneYear = 12 * oneMonth;
		if (isNow){
			return now;
		}else {
			switch (type){
				case 'year':
					if (isAdd){
						return new Date(now + (oneYear * offset)).getTime();
					}else {
						return new Date(now - (oneYear * offset)).getTime();
					}
				case 'month':
					if (isAdd){
						return new Date(now + (oneMonth * offset)).getTime();
					}else {
						return new Date(now - (oneMonth * offset)).getTime();
					}
				case 'day':
					if (isAdd){
						return new Date(now + (oneDay * offset)).getTime();
					}else {
						return new Date(now - (oneDay * offset)).getTime();
					}
				case 'hour':
					if (isAdd){
						return new Date(now + (oneHour * offset)).getTime();
					}else {
						return new Date(now - (oneHour * offset)).getTime();
					}
				case 'minute':
					if (isAdd){
						return new Date(now + (oneMinute * offset)).getTime();
					}else {
						return new Date(now - (oneMinute * offset)).getTime();
					}
				case 'second':
					if (isAdd){
						return new Date(now + (oneSecond * offset)).getTime();
					}else {
						return new Date(now - (oneSecond * offset)).getTime();
					}
				default:
					return now;
			}
		}
	},
  /**
   * @description 数组转对象
   * @method arrayToObject
   * @param {Array} array 需要转化的数组
   * @return {Object} 格式化后的对象
   */
  arrayToObject: function (array) {
    var keyItem = [],keys,result = {};
    keys = Object.keys(array[0]);
    keys.forEach(function (item,index) {
      var obj = {};
      obj.key = item;
      obj.val = [];
      keyItem.push(obj);
    });

    array.forEach(function (item,index) {
      keys.forEach(function (item0,index0) {
        keyItem[index0].val.push(item[keyItem[index0].key])
      })
    });

    keyItem.forEach(function (item,index) {
      result[item.key] = item.val;
    });
    console.log(result);
    return result;
  },
  /**
	 * @description mm转px,此函数只适用于屏幕为96DPI的设备(大部分都是)
	 * @method mmTopx
	 * @param {number} mm 毫米
	 * @return {number} px 像素
	 */
	function mmToPx(mm) {
		var m = parseFloat(mm);
		var px = (m*0.0393*96).toFixed(2);
		return px;
	}
};

