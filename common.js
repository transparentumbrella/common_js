/*
 * 通用代码库，可在任意位置调用
 */

/*
 * 将时间戳转为日期格式字符  按日 向前向后显示
 * param timestamp [int] 时间戳，单位秒 可选填，为false则为当前时间戳（输入null/0/''/false 等情况）
 * param ruler [int] 日期尺度，也就是前几天，后几天，-1 向前一天（昨天），2 向后2天（后天） 默认0
 * return [str] 返回标准日期格式字符如：2014-06-18 10:33:24  时间格式：Y-m-d H:i:s
 * eg: timestampToDate(1403058804) //2014-06-18 10:33:24
 * 获取当前时间戳（单位秒） Date.parse(new Date())/1000
 */
function timestampToDate(timestamp,ruler) {
    timestamp = timestamp || Date.parse(new Date())/1000;
    ruler = ruler || 0;
    let originalDate = timestamp * 1000 + (ruler * 24 * 3600 * 1000);
    let date = new Date(originalDate);//由于此处使用毫秒计算，故乘1000将秒转为毫秒
    let Y = date.getFullYear();
    let m = date.getMonth()+1;
    let d = date.getDate();
    let H = date.getHours();
    let i = date.getMinutes();
    let s = date.getSeconds();
    m = (m < 10) ? '0' + m : m;
    d = (d < 10) ? '0' + d : d;
    H = (H < 10) ? '0' + H : H;
    i = (i < 10) ? '0' + i : i;
    s = (s < 10) ? '0' + s : s;
    //此处可自由拼接时间格式， H，i，s 都是已补0的两位数  如：2014-06-18 10:33:24
    return Y+'-'+m+'-'+d +' '+ H+':'+i+':'+s;
}

/*
    获取指定时间戳的年月日
    timestamp 时间戳，精确到秒，不填则默认为当前时间戳
    rule 偏移天数  表示向前或向后偏移一天
 */
function getDate(timestamp,ruler) {
    timestamp = timestamp || Date.parse(new Date())/1000;
    ruler = ruler || 0;
    let originalDate = timestamp * 1000 + (ruler * 24 * 3600 * 1000);
    let date = new Date(originalDate);//由于此处使用毫秒计算，故乘1000将秒转为毫秒
    let Y = date.getFullYear();
    let m = date.getMonth()+1;
    let d = date.getDate();
    m = (m < 10) ? '0' + m : m;
    d = (d < 10) ? '0' + d : d;
    //此处可自由拼接时间格式， H，i，s 都是已补0的两位数  如：2014-06-18 10:33:24
    return Y+'-'+m+'-'+d;
}

/*
    获取指定时间戳的时分秒
    timestamp 时间戳，精确到秒，不填则默认为当前时间戳
 */
function getTime(timestamp) {
    timestamp = timestamp || Date.parse(new Date())/1000;
    let originalDate = timestamp * 1000;
    let date = new Date(originalDate);//由于此处使用毫秒计算，故乘1000将秒转为毫秒
    let H = date.getHours();
    let i = date.getMinutes();
    let s = date.getSeconds();
    H = (H < 10) ? '0' + H : H;
    i = (i < 10) ? '0' + i : i;
    s = (s < 10) ? '0' + s : s;
    //此处可自由拼接时间格式， H，i，s 都是已补0的两位数  如：2014-06-18 10:33:24
    return H+':'+i+':'+s;
}


/*
    打开图片预览，本方法依赖 jquery.js、viewer.css、viewer.js
    @param string img_src  图片地址，必须是一个可正常打开的图片地址
    @param [boolean] img_assembly 是否显示图片组件，组件包含包含放大缩小、旋转、翻转等功能按钮 默认 false 不显示
    @return boolean 打开结果，若img_src或Viewer对象不存在，则返回false，否则返回true
    使用方法：
        1)导入依赖文件
            导入css文件 <link type="text/css"  rel="stylesheet" href="__STATIC__/Public/Admin/Viewerjs/1.9.0/dist/viewer.css" />
            导入jquery文件  <script type="text/javascript" charset="utf-8" src="__STATIC__/Public/Admin/js/jquery-2.1.1.min.js" ></script>
            导入jquery文件  <script type="text/javascript" charset="utf-8" src="__STATIC__/Public/Admin/Viewerjs/1.9.0/dist/viewer.js" ></script>
            导入common文件  <script type="text/javascript" charset="utf-8" src="__STATIC__/Public/Admin/Common/js/common.js" ></script>
        2) 点击执行 openImage('http://xxxx.com/xxx.jpg');
            默认只能看图，没有旋转等控件，要显示所有控件则设置img_assembly为true，如：openImage('http://xxxx.com/xxx.jpg',true);
            打开blob文件也是一样的 onclick="openImage('blob:http://xxxx.com/xxxx-xxxx-xxxx');"
*/
function openImage(img_src,img_assembly = false) {
    if(typeof Viewer == 'undefined'){
        return false;
    }
    if (img_src.length < 1){
        return false;
    }
    let id  ='open_image_990kfdjicpoas6783jl_hljy23d';
    let imgObj = $('#'+id);
    if (imgObj.length == 0){
        let html = '<img id="'+id+'" style="display: none;" src="'+img_src+'" alt="">';
        $('body').append(html);
        imgObj = $('#'+id);
    }
    let config = {
        navbar:false,
        button:true,
        fullscreen:true,
        title:false,
        play:false,
        toolbar:false,
        zIndex:99999,
    };
    if (img_assembly){
        config.title=true;
        config.play=true;
        config.toolbar=true;
    }
    imgObj.attr('src',img_src);
    new Viewer(imgObj[0],config);
    imgObj.click();
    return true;
}

// 检验 undefined 和 null
function isEmpty(obj) {
    if (!obj && obj !== 0 && obj !== '') {
        return true;
    }
    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
        return true;
    }
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
        return true;
    }
    return false;
}


/*
    触发一个咆哮提示框  本方法依赖growljs插件
    @param string  msg   消息文字
    @param string  time  持续显示时间 单位毫秒 1000毫秒 = 1秒 |300000 毫秒 = 5秒
    @param string type   消息类型 目前只 default（灰色）、error（红色）、warning（黄色）、【默认】notice(绿色)
    使用方法：
        1）导入css文件 <link href="__STATIC__/Public/Common/jquery-growl/css/jquery.growl.css"  type="text/css">
        2）导入jquery文件 <script src="__STATIC__/Public/Common/jquery-growl/js/jquery.growl.js" type="text/javascript"></script>
        3）执行growlNotice('123')
 */
function growlNotice(msg = '', time = 5000, type = 'notice'){
    if(typeof $.growl == 'undefined'){
        return false;
    }
    $.growl({
        title: '',
        message: msg,
        style:type,
        duration:time,
    });
}

/**
 * 判断数组里是否有指定值
 * @param  string [search] 参数名
 * @param  array [array] url地址
 * @return boolean 判断结果
 * 使用方法
 *     in_array('id',[1,2,3,4,5,'id']);//true
 *     in_array('6',[1,2,3,4,5,'name']);//false
 */

function in_array(search,array){
    for(let i in array){
        if(array[i]==search){
            return true;
        }
    }
    return false;
}

/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return URL参数字符串
 */
function urlEncode(param, key, encode) {
    if(param==null) return '';
    let paramStr = '';
    let t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
    } else {
        for (let i in param) {
            let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
}

//字节转KB/M/G/T
function getfilesize(size) {
    if (!size)  return "";
    let num = 1024.00; //byte
    if (size < num)
        return size + "B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "KB"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

/**
 * 获取URL中的指定参数值
 * @param  string [queryName] 参数名
 * @param  string [url] url地址
 * @return string 参数值
 * 使用方法
 *      GetQueryValue('id','qq.com?id=123&name=小明')
 *      GetQueryValue('id')
 */
function GetQueryValue(queryName,url) {
    url = url || window.location.search;
    queryName = queryName || '';
    if (queryName == ''){
        return '';
    }
    //截断问号前的字符
    url = url.split("?")[1];
    let reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
    let r = url.match(reg);
    if ( r != null ){
        return decodeURI(r[2]);
    }
    return '';
}
/**
 * 获取URL中的指定参数值
 * @param  string [queryName] 参数名
 * @param  string [url] url地址
 * @return string 参数值
 * 使用方法
 *      GetQueryValue('id','qq.com?id=123&name=小明')
 *      GetQueryValue('id')
 */
function GetQueryValue(queryName,url = '') {
    let queryNameTmp = queryName || '';
    if (queryNameTmp == ''){
        return '';
    }
    if (url.length < 1){
        url = window.location.search;
    }
    url = url.split("?")[1]; //截断问号前的字符
    if (url == '' || typeof url == 'undefined'){
        return '';
    }
    let reg = new RegExp("(^|&)" + queryNameTmp + "=([^&]*)(&|$)", "i");
    let r = url.match(reg);
    if ( r != null ){
        return decodeURI(r[2]);
    }
    return '';
}

/**
 * 获取URL中的所有参数值
 * @param  string [urlStr] 当该参数不为空的时候，则解析该url中的参数集合
 * @return obj 参数集合
 * 使用方法
 *      GetQueryValueALL('qq.com?id=123&name=小明')
 *      GetQueryValueALL()
 */
function GetQueryValueALL(urlStr) {
    urlStr = urlStr || window.location.search;
    let url = '';
    if (typeof urlStr == "undefined") {
        url = decodeURI(location.search); //获取url中"?"符后的字符串
    } else {
        url = "?" + urlStr.split("?")[1];
    }
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
        let strs = url.substr(1).split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/*
获取文件名后缀
 */
function getFileSuffix(fileName){
    if (fileName.lastIndexOf('.')  == -1){
        return  '';
    }
    return fileName.substring(fileName.lastIndexOf('.') + 1);
}

/*
获取文件名，不带后缀
 */
function getFileName(fileName){
    return fileName.substring(0,fileName.lastIndexOf('.'));
}

/**
 * AES加密
 * word 加密字符
 * iv 是密钥偏移量，这个一般是接口返回的，或者前后端协定一致。
 * key 由于对称解密使用的算法是 AES-128-CBC算法，数据采用 PKCS#7 填充 ， 因此这里的 key 需要为16位
 * 依赖文件：
 <script src="__STATIC__/Public/Common/crypto-js/core.js"> /script>
 <script src="__STATIC__/Public/Common/crypto-js/cipher-core.js"> /script>
 <script src="__STATIC__/Public/Common/crypto-js/pad-zeropadding.js"> /script>
 <script src="__STATIC__/Public/Common/crypto-js/enc-base64.js"> /script>
 <script src="__STATIC__/Public/Common/crypto-js/aes.js"> /script>
 */

function AESencrypt(word, keyStr, ivStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * base64解码
 author github@zong86
 time v1 2023-07-12 21:06:20

 @param str {string} 待解码文本
 @return {string} base64解码字符

 */
function base64decode(str){
    let base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    let c1, c2, c3, c4, i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        }
        while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        }
        while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

/**
    base64编码
    author github@zong86
    time v1 2023-07-12 21:06:20

    @param str {string} 待编码文本
    @return {string} base64编码字符

 */
function base64encode(str){
    let base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let c1, c2, c3, i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}


/*
    rsa加密，本方法依赖JSEncrypt库

    响应值response处理  依赖 growlNotice方法
    author github@zong86
    time v1 2023-07-12 21:06:20

    @param text {string} 待加密文本
    @param public_key {string} 公钥
    @return {string} 返回加密字符

 */
function ras_encrypt(text, public_key) {
    text = text || "";
    public_key = public_key || '';
    let crypt = new JSEncrypt();
    crypt.setKey(public_key);
    return crypt.encrypt(text);
}

/*
 日期字符转时间戳
 date日期字符
 return int 时间戳
 */
function dateTotimestamp(date) {
    date = date || (new Date());
    return new Date(date).getTime()/1000;
}


/*
    html字符 转 html实体符号
    str 字符
    return 转义后字符
 */
function html_encode(str){
    let s = "";
    if (str.length < 1){
        return ""
    }
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br/>");

    console.log(s)

    return s;
}
/*
    html实体符号符号
    str 字符
    return 转义后字符
 */
function html_decode(str){
    let s = "";
    if (str.length < 1){
        return ""
    }
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    // s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br\/>/g, "\n");
    return s;
}


/*
    转义特殊字符
 */
function html_decode_df(str) {
    let s = "";
    if (str.length < 1){
        return ""
    }
    //转义特殊字符
    s = str.replace(/<script/g, "<<span></span>script");
    s = s.replace(/<\/script/g, "<<span></span>/script");
    s = s.replace(/<link/g, "<<span></span>link");
    s = s.replace(/<!DOCTYPE/g, "<<span></span>!DOCTYPE");
    s = s.replace(/<html/g, "<<span></span>html");
    s = s.replace(/<head/g, "<<span></span>head");
    s = s.replace(/<head/g, "<<span></span>head");
    s = s.replace(/<meta/g, "<<span></span>meta");
    s = s.replace(/<body/g, "<<span></span>body");
    s = s.replace(/<title/g, "<<span></span>title");
    s = s.replace(/\n/g, "\\n");
    return s;
}

/**
    响应值response处理  依赖 growlNotice方法
    author github@zong86
    time v1 2023-07-12 21:06:20

    @param response 响应体
    @return {bool} 正常返回true，异常返回false

 */
function response_code_analysis(response) {
    if (response.code != 1){ //网络请求异常
        // layer.msg(response.msg, {time:3000});
        growlNotice(response.msg, 8000,'error');
        return false;
    }else if(response.data.code != 1){
        // layer.msg(response.data.msg, {time:3000});
        growlNotice(response.data.msg, 8000,'error');
        return false;
    }
    return true;
}

/**
    请求网络
    本方法依赖jquery库，使用前请先引入jquery.js文件
    本方法通过包装jquery.ajax参数实现

    author github@zong86
    time v1 2023-07-12 21:06:20

    @param {string} url 请求地址
    @param {object} parame 请求参数
    可以是一个FormData 对象
        let formData = new FormData();
        formData.append('name','jack');
        formData.append('age',21);
        formData.append('filed',$('#filed')[0].files[0]);//添加文件
    也可以是一个键值对象
        let formData = {
            name:'jack',
            age:21,
        }
    @param {string} method 请求方法 不区分大小写  可选 POST 和 GET
    @param {Object} requestHeader 自定义请求头，一个键值对的对象，不填默认空对象。
                                       注意1：键名不能带底杠（_） 符号，且避免区分大小写，服务器端接收时将首字母自动转大写，会造成混乱
                                       注意2：按照W3C组织规定有部分名字不可自定义（无效），原因详询https://www.w3.org/TR/2010/CR-XMLHttpRequest-20100803/#the-setrequestheader-method
    @param {int} timeout 超时时间 单位：秒，默认25  取值范围： 0-360   上传文件时要置为0，表示取消超时时间，否则可能会报499 400 错误
    @param {string} lockName 锁名称 默认空字符（不锁）  设置非空字符时后，方法内部会上锁，上锁期间多次重复执行（例如双击）本函数会返 {code:4,msg:'操作过快，请稍后',httpCode:0}
                             只有上一次请求结束（解锁）后才可开始下一次请求，用于防双击或强一致性请求等场景使用，一般不用设置
    @param {string} returnType 返回值解析方式 默认json 可选 json jsonp text xml html script
    @param {Object} uploadCallback  obj  上传回调，一个回调函数，可获取上传进度，参数里有：
                                        total:总共需要上传的字节
                                        loaded:已上传的字节
                                        upload_percentage:上传的进度百分比 取值：0-100
    @return {Object} 返回一个Promise对象 成功触发then() 失败触发 catch()
                    不管成功或失败，返回值都有固定结构：{code:0,msg:'',data:{},httpCode:0}，字段解释：
                        code:联网结果  1成功（此处仅代表网络连接成功，并不是业务层面成功，具体得获取到返回值在上层自行判断）  0失败
                        msg: 联网失败时的原因，成功时统一返回【请求成功】，目前有：
                            请求成功
                            url参数错误
                            timeout参数错误
                            操作过快，请稍后
                            网络连接超时
                            网络连接失败（可能为url错误、option请求或跨域请求被拦截、本机网络断开等，详情请检查控制台报错信息）
                            程序异常
                        data:返回值
                        httpCode:http状态码，如200、302、500，0表示联网失败或发生异常

    使用方法：
            极简get请求
                requestNetworkV1('https://qq.com').then(function(response){
                    console.log(response)
                }).catch(function(error){ //网络请求失败
                    let error_msg = error.msg || error.message;
                    console.log(error_msg)
                });
            post文本和文件组合请求
                let formData = new FormData();
                formData.append('name','zhangsan');
                formData.append('age',21);
                formData.append('filed',$('#filed')[0].files[0]);//添加文件
                let requestHeader = {
                    'header1':111,
                    'header2':222,
                };
                let timeout = 25;
                let lockName = 'lock_1';
                let returnType = 'json';
                let uploadCallback = function (total,loaded,upload_percentage) {
                    console.log(total,loaded,upload_percentage)
                };
                requestNetwork('https://qq.com',formData,'post',requestHeader,timeout,lockName,returnType,uploadCallback).then(function(response){
                    console.log(response)
                }).catch(function(error){ //网络请求失败
                    let error_msg = error.msg || error.message;
                    console.log(error_msg)
                });
            请求时上锁
                let formData = new FormData();
                formData.append('name','zhangsan');
                formData.append('age',21);
                formData.append('filed',$('#filed')[0].files[0]);//添加文件
                let requestHeader = {
                    'header1':111,
                    'header2':222,
                };
                let timeout = 10;
                let lockName = 'lock_1';//需要上锁
                requestNetwork('https://qq.com',formData,'post',requestHeader,timeout,lockName).then(function(response){
                    console.log(response)
                }).catch(function(error){ //网络请求失败
                    let error_msg = error.msg || error.message;
                    console.log(error_msg)
                });
            自定义请求头
                let formData = new FormData();
                formData.append('name','zhangsan');
                formData.append('age',21);
                let requestHeader = {
                    // 注意1：键名不能带底杠（_） 符号，且避免区分大小写，服务器端接收时将首字母自动转大写，会造成混乱
                    // 注意2：按照W3C组织规定有部分名字不可自定义（无效），原因详询https://www.w3.org/TR/2010/CR-XMLHttpRequest-20100803/#the-setrequestheader-method
                    'header1':111,//自定义头1
                    'header2':222,//自定义头2
                };
                requestNetwork('https://qq.com',formData,'post',requestHeader).then(function(response){
                    console.log(response)
                }).catch(function(error){ //网络请求失败
                    let error_msg = error.msg || error.message;
                    console.log(error_msg)
                });

*/
function requestNetworkV1(url, method = 'GET', parame = {}, requestHeader = {}, timeout = 25, lockName = '', returnType = 'json', uploadCallback = null){
    return new Promise(function(resolve, reject){
        if (!url || url.length < 1){ //请求地址必填
            reject({code:0, msg:'url参数错误', data:{},httpCode:0});
            return;
        }
        if (timeout < 0){ //超时时间不可小于0秒 0 为不限，用于文件上传
            reject({code:0,msg:'timeout参数错误',data:{},httpCode:0});
            return '';
        }
        let isLock = false;
        if (lockName != ''){
            isLock = true;
            if(typeof request_network_lock_a8sk7d0vp0609 == 'undefined'){
                request_network_lock_a8sk7d0vp0609 = {};
            }
            if ((typeof request_network_lock_a8sk7d0vp0609[lockName] == 'boolean') && (request_network_lock_a8sk7d0vp0609[lockName] == true)) { //已存在
                reject({code:0,msg:'操作过快，请稍后',data:{},httpCode:0});
                return;
            }
            request_network_lock_a8sk7d0vp0609[lockName] = true;//上锁
        }
        //自适应FormData对象（文件上传场景）
        let processDataD = true;
        let contentTypeD = 'application/x-www-form-urlencoded';
        let requestParameType = Object.getPrototypeOf(parame).toString();
        if (requestParameType == '[object FormDataPrototype]' || requestParameType == '[object FormData]'){
            processDataD = false;
            contentTypeD = false;
        }
        let timeoutD = timeout * 1000;
        let methodType = (method.toUpperCase() == 'GET') ? 'GET' :'POST';
        let upload_percentage = null;//上传文件的进度百分比
        let percentage = 0;//进度
        //上传进度监听方法
        let xhrOnProgress = function(fun) {
            xhrOnProgress.onprogress = fun; //绑定监听
            //使用闭包实现监听绑
            return function() {
                let xhr = $.ajaxSettings.xhr();//通过$.ajaxSettings.xhr()获得XMLHttpRequest对象
                if(typeof xhrOnProgress.onprogress !== 'function'){ //判断监听函数是否为函数
                    return xhr;
                }
                if(xhrOnProgress.onprogress && xhr.upload) { //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
                    xhr.upload.onprogress = xhrOnProgress.onprogress;
                }
                return xhr;
            }
        };
        try {
            $.ajax({
                url: url,//请求地址
                type: methodType,//请求方式
                timeout: timeoutD,//ajax 联网超时时间 默认10秒  注意，有文件上传时要置为0 否则服务器可能会报499 400 错误
                data: parame,//请求参数
                headers: requestHeader,//请求头
                beforeSend:function(XMLHttpRequest){}, //请求前调用
                complete:function(XMLHttpRequest, textStatus){},//请求状态改变后调用（如成功、失败、解析错误、上传中时）
                xhr: xhrOnProgress(function(e) {
                    if(typeof uploadCallback !== 'function'){ //判断监听函数是否为函数
                        return;
                    }
                    percentage = Math.floor(( e.loaded / e.total)*100);
                    if (percentage == upload_percentage){
                        return true;
                    }
                    upload_percentage = percentage;
                    uploadCallback(e.total,e.loaded,upload_percentage);
                }),
                success: function(data,readyState,httpData){ //请求成功后调用
                    isLock && (request_network_lock_a8sk7d0vp0609[lockName] = false);//解锁
                    resolve({code:1,msg:'操作成功',data:data,httpCode:httpData.status});
                },
                error:function(e){ //请求错误后调用
                    isLock && (request_network_lock_a8sk7d0vp0609[lockName] = false);//解锁
                    if (e.statusText == 'timeout'){
                        reject({code:0,msg:'网络连接超时',data:{},httpCode:e.readyState});
                        return;
                    }
                    reject({code:0,msg:'网络连接失败',data:{},httpCode:e.readyState});
                },
                dataType: returnType,//返回值解析方式 可选 json jsonp text xml html script
                async:true,//是否异步 默认true 异步 false 同步
                cache: false,//jQuery 1.2 新功能，设置为 false 将不会从浏览器缓存中加载请求信息。
                processData: processDataD,//是否将参数转换为对象（从技术角度来讲并非字符串）以配合默认内容类型"application/x-www-form-urlencoded"  默认true
                contentType: contentTypeD,//(默认: "application/x-www-form-urlencoded") 发送信息至服务器时内容编码类型。默认值适合大多数应用场合
                global:false,
                ifModified:false,
                jsonp:'',
                username:'',
                password:'',
            });
        }catch (e) {
            isLock && (request_network_lock_a8sk7d0vp0609[lockName] = false);//解锁
            reject({code:0,msg:e.message,data:{},httpCode:0});
        }
    });
}


