function getContextPath(){
	
	return "/app";
}

jQuery(function () {

    textareaMaxlength();
    inputvalidate();
    //所有弹出的子页面屏蔽右键菜单。
    //    if (window.parent && (!window.parent.RootPage)) {
    //        document.oncontextmenu = function () {
    //            event.returnValue = false;
    //        }


    //    }


    // activeMenu();//自动激活菜单


    $('.popupWindow').bind('dialogbeforeclose', function (event, ui) {
        if ($(this).find('iframe').length > 0) {
            var obj = $(this).find('iframe').attr('id');

            var iframe = document.getElementById(obj);
            iframe.contentWindow.document.documentElement.scrollTop = 0; //关闭Dialog窗口时，Dialog Iframe滚动条滚动到 最顶端
            $(".wisui-validate", $(document.getElementById(obj).contentWindow.document.body)).hide(); //关闭Dialog窗口时，隐藏Iframe 中的验证消息
        }


    }).bind("dialogopen", function () {

        $(this).parent().find(".ui-dialog-titlebar-close").focus();
    });





    //处理页面中所有IFrame 都不显示横线滚动条
    //    $("iframe").each(function () {
    //        $(this).css("overflow-x", "hidden");
    //        $(this).parent().css("overflow-x", "hidden");
    //    });


    jQuery.pasCore.addmessages(messagelist);

});



//根据加载的页面路径自动激活菜单
function activeMenu() {

    if (window.parent && window.parent.RootPage && window.parent.activeMenu) {
        window.parent.activeMenu(location.pathname + location.search);
    }
}

jQuery.extend({
    pasCore: {
        bindField: function (data, _frame) {
            var obj = _frame == null ? window : window.frames[_frame];
            jQuery.each(jQuery("[field]", obj.document.body), function (i, f) {
                var field = jQuery(f);
                var fieldId = field.attr("field");
                if (field.attr("data-control") == "Radio" || field.attr("data-control") == "Checkbox") {
                    if (data[fieldId] != null && jQuery(f).val().toString() == data[fieldId].toString()) {
                        jQuery(f).attr("checked", "checked");
                    } else if (data[fieldId] == null) {
                        jQuery(f).attr("checked", false);
                    }

                } else if (field.attr("data-control") == "Select") {
                    field.val((data[fieldId] != null) ? data[fieldId] : "");

                } else if (field.attr("data-control") == "Text") {
                    if (field.attr("data-type") == 'date') {
                        jQuery(f).val(data[fieldId] == null ? "" : data[fieldId].substr(0, 10));
                    } else {

                        jQuery(f).val(data[fieldId] == null ? "" : data[fieldId]);
                    }
                } else if (field.is("span") || field.is("div")) {
                    if (field.attr("data-action") == 'html') {
                        if (field.attr("data-type") == 'date') {
                            jQuery(f).html(data[fieldId] == null ? "" : data[fieldId].substr(0, 10));
                        } else {
                            jQuery(f).html(data[fieldId] == null ? "" : data[fieldId]);
                        }
                    }
                    else {
                        if (field.attr("data-type") == 'date') {
                            jQuery(f).html(data[fieldId] == null ? "" : HTMLEnCode(data[fieldId].substr(0, 10)));
                        } else {
                            jQuery(f).html(data[fieldId] == null ? "" : HTMLEnCode(data[fieldId]));
                        }
                    }
                } else {
                    jQuery(f).val(data[fieldId] == null ? "" : data[fieldId]);
                }

            });
        },
        LoadDate: function (handler, action, param) {
            var row = null;
            if (param != null) {

                $.wisCore.syncAction(handler, action, param, function (res) {
                    if (res.success == false) {
                        jQuery.Alert(res.message);
                        return false;
                    }
                    else {

                        if (res.rows != null && typeof (res.rows) != 'undefined') {
                            row = res.rows[0];
                            $.pasCore.bindField(row);
                        } else {
                            row = res;
                            $.pasCore.bindField(res);
                        }

                    }
                });
            }
            return row;

        },
        getFieldData: function (data, _element, isSearch)//获取页面中field数据创建对象
        {
            var _data = {};
            var _Others = {};
            var _SearchOperator = {};
            if (data) {
                _data = data;
            }

            jQuery.each(jQuery("[field]", _element), function (i, f) {
                var field = jQuery(f);
                var fieldName = field.attr("field");
                data[fieldName] = field.val();
                if (isSearch) { //获取查询条件特殊处理

                    _SearchOperator[fieldName] = jQuery(this).attr("SearchOperator");

                }
            });
            _data["SearchOperator"] = _SearchOperator;

            return _data;
        },
        getWhere: function (_element) {
            var data = {};
            //var jsondata = {};
            jQuery.pasCore.getFieldData(data, _element, true);
            //jsondata["data"] = ko.mapping.toJSON(data);
            
            return data;
        },
        getJsonWhereByData: function (_element) {
            var data = {};
            var jsondata = {};
            jQuery.pasCore.getFieldData(data, _element, true);
            jsondata["data"] = ko.mapping.toJSON(data);
            return jsondata;
        },
        
        messages: {},
        addmessages: function (data) {

            jQuery.each(data, function (key, value) {

                jQuery.pasCore.messages[key] = value;
            });
        }

    }

});

jQuery.extend({
    getmessage: function (key) {
        if (!jQuery.pasCore.messages[key]) return key;
        return jQuery.pasCore.messages[key];
    },
    format: function (source, params) {
        if (arguments.length == 1)
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.format.apply(this, args);
            };
        if (arguments.length > 2 && params.constructor != Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor != Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
        });
        return source;
    },
    pas_text: function (element, val) {

        if (val != null) {
            $(element).text(val);
        } else {
            $(element).text("");
        }
    },
    Alert: function (text, title, fn,width, height) {
        var html =
            '<div class="dialog" id="dialog-message"  style="vertical-align:middle;">' +
            ' <p style="margin-top:15px;">' +
            ' <span style="float: left; margin: 0 7px 0 0;">' + text + '</span>'
        ' </p>' +
            '</div>';

        var param = {
            resizable: false,
            modal: true,
            show: {
                effect: 'fade',
                duration: 300
            },
            open: function () {

            },

            title: title || "提示信息",
            buttons: {
                "确定": function () {
                    var dlg = $(this).dialog("close");

                }
            },
            close: function (event, ui) {
                $(this).dialog("destroy");
                $("#dialog-message").remove();
                fn && fn.call(true);
            }
        }
        if (width ) {
            param.width = width;
        }
        if (height) {
            param.height = height;
        }

        $(html).dialog(param);

    },
    // jQuery UI confirm弹出确认提示    
    Confirm: function (text, title, fn1, fn2,width,height) {
        var flag = true;
        var html =
        '<div class="dialog" id="dialog-confirm" style="vertical-align:middle;">' +
        ' <p style="margin-top:15px;">' +
        //' <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>' + text +    
        ' <span style="float: left; margin: 0 7px 20px 0;">' + text + '</span>'
        ' </p>' +
        '</div>';

        var param = {
            //autoOpen: false,    
            resizable: false,
            modal: true,
            show: {
                effect: 'fade',
                duration: 300
            },
            title: title || "提示信息",
            buttons: {
                "确定": function () {
                    var dlg = $(this).dialog("close");
                    fn1 && fn1.call(dlg, true);
                },
                "取消": function () {
                    var dlg = $(this).dialog("close");
                    fn2 && fn2(dlg, false);
                }
            },
            close: function (event, ui) {
                $(this).dialog("destroy");
                $("#dialog-confirm").remove();
            }
        }
        if (width) {
            param.width = width;
        }
        if (height) {
            param.height = height;
        }

        return $(html).dialog(param);

        
    },
    // jQuery UI 模态dialog框   
    Mybox: {
        show: function (myurl, mytitle, myheight, mywidth) {
            var html = '<div class="dialog" id="dialog-mybox"></div>';
            $(html).dialog({
                resizable: false,
                height: myheight,
                width: mywidth,
                modal: true,
                show: { effect: 'fade', duration: 300 },
                open: function () { $(this).load(myurl); },
                title: mytitle,
                //buttons: dlgbtns,   
                close: function (event, ui) {
                    $(this).dialog("destroy");
                    $("#dialog-mybox").remove();
                }
            });
        },
        hide: function () {
            $("#dialog-mybox").dialog("close");
        }
    },
    replaceMeetingTitle: function (meetingTitle) {
        return meetingTitle.replace("\\n", "");
    }
});



//-----------------------字符串格式化---------------------------\\

// 金额格式 ###,###,##0.00
function convertMoney(money) {
    var s = GetMoney(money, 2); //获取小数型数据
    s += "";
    if (s.indexOf(".") == -1) s += ".0"; //如果没有小数点，在后面补个小数点和0
    if (/\.\d$/.test(s)) s += "0";   //正则判断
    while (/\d{4}(\.|,)/.test(s))  //符合条件则进行替换
        s = s.replace(/(\d)(\d{3}(\.|,))/, "$1,$2"); //每隔3位添加一个
    return s;
}
//金额格式 ###,###,##0.00 转换为数字
function convertNumber(money) {
    if (isNaN(money)) {
        return money.replace(",", "");
    }
    return money;
}

//获取金额，digits表示保留小数位数
function GetMoney(number, digits) {
    if ((number == undefined || number == null || number == "" || number == "null") && number != 0) {
        return 0.00;
    }
    else {
        if (number == 0)//等于0时只显示0
        {
            return number.toFixed(0);
        }
        else {
            return number.toFixed(digits);
        }
    }
}

//-----------------------字符串格式化---------------------------\\



//-----------------------验证---------------------------\\

//文本框输入验证
function inputvalidate() {

    textareaMaxlength();
    Text_Price(12);
    Text_NUMBER();
    //统一处理时间控件文本框不允许输入，按Backspace键 清除内容
    datepickerClear();
    //解决只读文本框获得焦点之后按Backspace 键返回到上一页的问题
    input_Backspace();
    // SelectTrip();

}

//统一处理时间控件文本框不允许输入，按Backspace键 清除内容
function datepickerClear() {

    jQuery("input[data-control='datepicker']").each(function () {
        pas_datepicker($(this));
    });
    jQuery("input[data-control='Datebox']").each(function () {
        pas_datepicker($(this));
    });


}

function pas_datepicker(obj) {
    $(obj).css("imeMode", "disabled").removeAttr("readOnly")
    .bind("copy cut paste dragenter", function (e) {
        e.preventDefault();
    })
    .bind("keydown", function (i) {


        var keynum = window.event ? event.keyCode : event.which;

        if (keynum == 8) {

            $(this).val("");
            return false;
        } else if (keynum == 9) {
            return true;
        }
        else {
            return false;
        }
    });
}

function $maxlength(_this, maxLength) {

    //  console.log(maxLength);
    if (maxLength != 0) {
        if ($(_this).val().length > (maxLength)) {
            var val = $(_this).val().substring(0, maxLength)
            $(_this).val(val);

            try {
                var field = $(_this).attr("data-bind").replace("value:", "");
                $(".wisui-form").wisform("value", field, null, val);
            } catch (e) {

            }
        }
    }
}

function $textKeyPress(_this, maxLength) {

    var oEvent = window.event;
    if ((oEvent.keyCode >= 112 && oEvent.keyCode <= 123)//F1-F12
    || (oEvent.keyCode >= 8 && oEvent.keyCode <= 46)//功能按键
    ) {
        return true;
    }

    if ($(_this).val().length >= maxLength) {

        return false;
    } else {
        return true;
    }

}

//文本域限制长度
function textareaMaxlength() {

    $("textarea[maxlength]").each(function () {
        var maxLength = parseInt($(this).attr("maxlength"));
        if (maxLength != 0) {
            $(this).removeAttr("data-length");
        } else {
            maxLength = parseInt($(this).attr("data-length"));
            if (maxLength != 0) {
                $(this).removeAttr("maxlength");
            }
        }
    });

    $("textarea[maxlength]").bind('input propertychange blur', function (event) {

        // if (window.event.propertyName.toString() != "value") return;
        var maxLength = parseInt($(this).attr("maxlength"));
        $maxlength($(this), maxLength);
    }).bind("keypress", function (event) {
        var maxLength = parseInt($(this).attr("maxlength"));
        return $textKeyPress($(this), maxLength)
    }).bind("keydown", function () {
        var maxLength = parseInt($(this).attr("maxlength"));
        return $textKeyPress($(this), maxLength)
    });

    $("textarea[data-length]").bind('input propertychange blur', function (event) {
        // if (window.event.propertyName.toString() != "value") return;
        var maxLength = parseInt($(this).attr("data-length"));
        $maxlength($(this), maxLength);

    }).bind("keypress", function (event) {
        var maxLength = parseInt($(this).attr("data-length"));

        return $textKeyPress($(this), maxLength)
    }).bind("keyup", function () {
        var maxLength = parseInt($(this).attr("maxlength"));
        return $textKeyPress($(this), maxLength)
    });
}
//金额输入框 只能输入数字，一位小数点，2位小数，不能复制，全整数只能输入9位
function Text_Price(digits) {
    var length = digits - 3;
    //屏蔽粘贴，拖拽
    $("input[pas_valid='Price']").bind("copy cut paste dragenter", function (e) {
        e.preventDefault();
    });

    $("input[pas_valid='Price']").css("imeMode", "disabled").attr("maxlength", digits)
    //只能输入数字，一位小数点，2位小数
    .bind("keypress", function (i) {

        var keynum = window.event ? event.keyCode : event.which;
        var index = $(this).val().indexOf('.');
        if ((48 <= keynum && keynum <= 57) || ((index == -1) && keynum == 46)) {


            if (index != -1) {

                //当大于2位小数
                if ($(this).val().substring(index + 1).length >= 2) {
                    var par = { rule: 'Price', data: $(this).val() };
                    //判断当前值符合格式，并有整数部分小于9位，或者有值被选择
                    if ((format_validate(par) && $(this).val().substr(0, index).length < length) || document.selection.createRange().text != ""
                    ) {
                        return true;
                    }
                    // 删除 Mantis No.11208 陈兵兵 20131211 
                    //return false;
                }
                return true;
            } else {
                if ($(this).val().length >= length && keynum != 46 && document.selection.createRange().text == "") {
                    return false;
                }
                return true;
            }
        }
        else {
            return false;
        }
    })
    .bind("keyup", function () {
        var index = $(this).val().indexOf('.');
        if (index == -1 && $(this).val().length > length) {
            $(this).val($(this).val().substr(0, length));
        }

        if (index != -1 && $(this).val().substring(index + 1).length >= 3) {

            $(this).val($(this).val().substr(0, $(this).val().length - 1));
        }
    })
    .bind("blur", function () {
        //格式验证0.000
        if ($(this).attr("PriceZero") != "true") {
            if ($(this).val().length > 0) {
                var par = { rule: "PriceZero", data: $(this).val() };

                if (format_validate(par) == true) {
                    $.wisvalidate.showError(jQuery(this), $.getmessage("PASG90010I121"));
                }
            }
        }
    });
}
//整数输入框 只能输入数字
function Text_NUMBER() {

    //屏蔽粘贴，拖拽
    $("input[pas_valid='NUMBER']").bind("copy cut paste dragenter", function (e) {
        e.preventDefault();
    });

    $("input[pas_valid='NUMBER']").css("imeMode", "disabled")
    //只能输入整数
    .bind("keypress", function (i) {

        var keynum = window.event ? event.keyCode : event.which;
        var index = $(this).val().indexOf('.');
        if ((48 <= keynum && keynum <= 57)) {
            return true;
        }
        else {
            return false;
        }
    })
}

//只读文本框，按Backspace 键时不退回到上一页
function input_Backspace() {
    document.documentElement.onkeydown = function (evt) {
        var b = !!evt, oEvent = evt || window.event;
        if (oEvent.keyCode == 8) {

            var node = b ? oEvent.target : oEvent.srcElement;

            var reg = /^(input|textarea)$/i, regType = /^(text|textarea)$/i;
            if (!reg.test(node.nodeName) || !regType.test(node.type) || node.readOnly || node.disabled) {

                if (b || node.type == 'password') {
                    if (typeof (oEvent.stopPropagation) != 'undefined') {
                        oEvent.stopPropagation();
                    }
                }
                else {

                    oEvent.cancelBubble = true;
                    oEvent.keyCode = 0;
                    oEvent.returnValue = false;
                }
            }
        }
    }
    //只读文本框至灰处理
    //    $("input[readOnly]").attr("disabled", "disabled");
    //    $("[disabled]").attr("disabled", "disabled");
}


//下拉列表控件鼠标悬浮显示全部
function SelectTrip() {
    $("select option").each(function () {
        $(this).attr("title", $(this).text());
    });
    $("select").bind("change", function () {
        $(this).attr("title", $(this).find("option:selected").text());
    });
}



function Pas_validate(element) {
    var valid = true;
    var firstValid = true;
    $.each(jQuery("[field]", element), function (fn, f) {
        var field = jQuery(f);
        var showalign = "bottom";
        if (field.attr("wisui-direction")) {
            showalign = field.attr("wisui-direction");
        }

        if (field.attr("pas_null")) {
            // 非空验证

            var pas_null = field.attr("pas_null");
            if ((pas_null == "true" || pas_null == "True") && $.trim(field.val()) == "") {
                var mesid = "PASG90010I101";
                if (typeof (jQuery(f).attr("mesid")) != 'undefined') {
                    mesid = jQuery(f).attr("mesid");
                }
                $.wisvalidate.showError(jQuery(f), $.getmessage(mesid), showalign);
                valid = false;
                //第一个验证为空的获得焦点
                if (firstValid) {
                    jQuery(f).focus();
                    firstValid = false;
                }
            }
        }

        if (field.attr("pas_valid") && $.trim(field.val()) != "") {

            var pas_valid = field.attr("pas_valid");
            var par = { rule: pas_valid, data: field.val() };
            //格式验证
            if (pas_valid == "Price") {
                if ($(this).attr("PriceZero") != "true") {
                    var par1 = { rule: "PriceZero", data: field.val() };
                    if (format_validate(par1) == true) {
                        $.wisvalidate.showError(jQuery(f), $.getmessage("PASG90010I121"), showalign);
                        valid = false;
                        //第一个验证为空的获得焦点
                        if (firstValid) {
                            jQuery(f).focus();
                            firstValid = false;
                        }
                    }
                }
            }

            if (format_validate(par) == false) {
                var mesid = "PASG90010I113";
                if (typeof (jQuery(f).attr("mesid")) != 'undefined') {
                    mesid = jQuery(f).attr("mesid");
                }
                $.wisvalidate.showError(jQuery(f), $.getmessage(mesid), showalign);
                valid = false;
                //第一个验证为空的获得焦点
                if (firstValid) {
                    jQuery(f).focus();
                    firstValid = false;
                }
            }
        }


        if (field.attr("pas_null") && (field.attr("data-control") == "Radio" || field.attr("data-control") == "Checkbox")) {

            if (jQuery("[name='" + field.attr("name") + "']:checked").val() == null) {

                var mesid = "PASG90010I101";
                if (typeof (jQuery("[name='" + field.attr("name") + "']:first").attr("mesid")) != 'undefined') {
                    mesid = jQuery("[name='" + field.attr("name") + "']:first").attr("mesid");
                }

                $.wisvalidate.showError(jQuery("[name='" + field.attr("name") + "']:first").parent(), $.getmessage(mesid), showalign);
                valid = false;
                //第一个验证为空的获得焦点
                if (firstValid) {
                    jQuery(f).focus();
                    firstValid = false;
                }
            }
        }

        if (field.attr("pas_max")) {
            if (parseFloat(field.val()) > parseFloat(field.attr("pas_max"))) {
                $.wisvalidate.showError(jQuery(f), $.format($.getmessage("PASG90010I121"), field.attr("pas_max")), showalign);
                valid = false;
                //第一个验证为空的获得焦点
                if (firstValid) {
                    jQuery(f).focus();
                    firstValid = false;
                }
            }
        }
        if (field.attr("pas_min")) {
            if (parseFloat(field.val()) < parseFloat(field.attr("pas_min"))) {
                $.wisvalidate.showError(jQuery(f), $.format($.getmessage("PASG90010I119"), field.attr("pas_min")), showalign);
                valid = false;
                //第一个验证为空的获得焦点
                if (firstValid) {
                    jQuery(f).focus();
                    firstValid = false;
                }
            }
        }


    });

    return valid;
}


function format_validate(para) {
    //定义默认的验证规则
    var defaultVal = {
        NUMBER: "^[0-9]*$",    //数字
        COUNT: "^[1-9]+[0-9]*$",    //数量
        AC_NO: "^[^\\u4E00-\\u9FA5]+$",    //银行卡
        ZIPCODE: "^[0-9]{6}$", //5位数字
        TEL: "^((?:\\d{11})|(?:\\d{3}-\\d{7,8})|(?:\\d{0,3}-\\d{3}-\\d{7,8}))$",  //电话格式：1：手机11位 2：国内电话 3位区号-7位或8位电话号码 3：国内电话前面追加国际码 3位
        IP: "^((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])$",
        MOBILE: "^1(3[0-9]|5[0-35-9]|8[0235-9])\\d{8}$", //手机格式
        //修改 20140327 邮箱验证（特殊字符）修改 chenbingbing Start
        //MAIL: "^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$", //邮箱地址格式
        MAIL: "^[!#-9A-~]+@+[a-zA-Z0-9]+.+[^.]$", //邮箱地址格式
        //修改 20140327 邮箱验证（特殊字符）修改 End
        IDENTITY: "((11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91)\\d{4})((((19|20)(([02468][048])|([13579][26]))0229))|((20[0-9][0-9])|(19[0-9][0-9]))((((0[1-9])|(1[0-2]))((0[1-9])|(1\\d)|(2[0-8])))|((((0[1,3-9])|(1[0-2]))(29|30))|(((0[13578])|(1[02]))31))))((\\d{3}(x|X))|(\\d{4}))",
        CHINESE: "^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$",
        URL: "^http[s]?://[\\w\\.\\-]+$",
        Price: "((^([1-9][\\d]{0,30}))|(^0))(\\.[\\d]{1,2})?$",  //金额格式验证，如果整数，必须小于等于9位 ，，整数部分超过2位时，首位不能为0,如果有小数，则必须小于2位小数。
        PriceZero: "((^0))(\\.[0]{1,3})?$"
    };

    var flag = false;
    if (para.rule == 'OTHER') {//自定义的验证规则匹配
        flag = new RegExp(para.regString).test(para.data);
    }
    else {
        if (para.rule in defaultVal) {//默认的验证规则匹配
            flag = new RegExp(defaultVal[para.rule]).test(para.data);
        }
    }

    return flag;
}

//-----------------------验证---------------------------\\

function contextmenu() {
    event.returnValue = false;
}





function HTMLEnCode(str) {
    //jQuery.Alert(str);
    var s = "";
    if (str.length == 0) return "";
    s = str.toString().replace(/\&/ig, "&amp;");
    s = s.replace(/\</ig, "&lt;");
    s = s.replace(/\>/ig, "&gt;");
    s = s.replace(/-b-r-/ig, "<br/>");

    return s;
}

//移动已经加载过的js/css
function removejscssfile(filename, filetype) {
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none"
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none"
    var allsuspects = document.getElementsByTagName(targetelement)
    for (var i = allsuspects.length; i >= 0; i--) {
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
            allsuspects[i].parentNode.removeChild(allsuspects[i])
    }
}

//动态加载Js，css 文件
function loadjscssfile(filename, filetype) {

    if (filetype == "js") {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    } else if (filetype == "css") {

        var fileref = document.createElement('link');
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }

}
//loadjscssfile("/apps/pas/Scripts/Tools.js", "js");//自动加载JS



function LoadingToggle(flag,mes,element) {

    if (element != null && typeof (element) != 'undefined') {alert();
        jQuery(element).addClass("wisgrid-wrap");
    }

    var meswrap = "";
    if (typeof (mes) != "undefined") {
        meswrap="<div class='wisgrid-mask-msg-image-mes'>"+mes+"</div>";
    }

    var wrap = jQuery(".wisgrid-wrap");
    if (flag) {
        jQuery('<div class="wisgrid-mask"></div>').css({
            display: 'block',
            width: wrap.width(),
            height: wrap.height()
        }).appendTo(wrap);
        jQuery('<div class="wisgrid-mask-msg-image"></div>')
			    .html(meswrap+"<img src='/content/images/loading.gif' />")
			    .appendTo(wrap)
			    .css({
			        display: 'block',
			        left: (wrap.width() - jQuery('.wisgrid-mask-msg-image', wrap).outerWidth()) / 2,
			        top: (wrap.height() - jQuery('.wisgrid-mask-msg-image', wrap).outerHeight()) / 2
			    });
    } else {
        jQuery('.wisgrid-mask', wrap).remove();
        jQuery('.wisgrid-mask-msg-image', wrap).remove();
    }

}


//控制按钮权限
function buttonRight(buttonList) {
    jQuery("[right='true']").hide();
    $.each(buttonList, function (i, m) {
        $("[rightID='" + m.ID + "']").show();
    });
}


