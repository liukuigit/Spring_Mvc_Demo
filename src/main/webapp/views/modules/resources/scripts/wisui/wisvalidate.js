/**
 * wisvalidate - jQuery WisUI
 * 
 * created by xgz [ xiaguangze@wisdomin.com ] 
 *
 * Copyright 2012 wisdomin 
 * 
 *属性：
 *方法：
 * 
 *事件：
 */
 var _validate_no = 1;
 jQuery.extend({
    wisvalidate:{

        showError: function(element, err, direction){
            var title="error";
            var error = null;
            if(typeof(err) == 'string'){
                title = err;
                error = jQuery("<div class='content'/>").append(err);
            }
            else if(typeof(err) == 'object'){
                title = jQuery(err).text();
                if(title == '') return;
                error = jQuery("<div class='content'/>").html(jQuery(err).text());
            }
            else return;
            
            var validnumber = element.attr("validate-no");
                      
            var dialog = jQuery('<div class="wisui-validate ui-state-error"><div class="arrow"><span class="ui-icon"></span></div><span class="ui-icon ui-icon-alert" style="margin: 3px; float: left;"/></div>');
            if(validnumber){
                dialog = element.parent().find(".wisui-validate[validate-no='" + validnumber + "']");
                jQuery(".content", dialog).remove();
                dialog.show();
            }
            else {
                if(!error) return;
                element.after(dialog);
                dialog.data("element", element);
                dialog.attr("validate-no", _validate_no);
                element.attr("validate-no", _validate_no);
                _validate_no += 1;
                
            }
            error.appendTo(dialog);
            
            this._setdirection(dialog, element, direction);
           // this._setdirection(dialog, element, direction);//2013-10-23 liukui add 重复调用，为了解决有滚动条的列表验证提示位置不正确的问题，导致问题的原因暂时不清楚
            dialog.bind("click", function () {
                dialog.fadeOut();
            });
            dialog.oneTime(1000, function(){
                try{
                dialog.fadeOut();
                }
                catch(e){}
            });
        },
        _setdirection: function(dialog, element, direction){
            if(!direction){
                if(element.attr("wisui-direction")){
                    direction = element.attr("wisui-direction");
                }
                else direction = "bottom";
            }
            var arrows = {top:"s", bottom:"n", left: "e", right: "w"};
            
            var arrow = jQuery(".arrow", dialog);
            jQuery("span", arrow).attr("class", 'ui-icon ui-icon-triangle-1-' + arrows[direction]);
            
            var arrow_offset = {top:0, left:0};
            var dlg_offset = {top:0, left:0};
            
            switch(direction){
                case "top":
                    dlg_offset = { top: element.offset().top - dialog.height() - 18, left: element.offset().left };
                    arrow_offset = { top: dialog.height() + 5, left: 5};
                    break;
                case "bottom":
                    dlg_offset = { top: element.offset().top + element.height() + 5, left: element.offset().left };
                    arrow_offset = { top: -11, left: 5};
                    break;
                case "right":
                    dlg_offset = { top: element.offset().top - dialog.height() / 2 + 2, left: element.offset().left + element.width() + 10 };
                    arrow_offset = { top: dialog.height() / 2 - 2, left: -11};
                    break;
                case "left":
                    dlg_offset = { top: element.offset().top - dialog.height() / 2 + 2, left: element.offset().left - dialog.width() - 28 };
                    arrow_offset = { top: dialog.height() / 2 - 2, left: dialog.width() + 14};
                    break;    
            }
            arrow.css("top", arrow_offset.top).css("left", arrow_offset.left);
            dialog.offset(dlg_offset);

        }
        
    }
 });
 
jQuery.widget("wisui.wisvalidate", {
    widgetEventPrefix: 'wis_',
    options: {            
    },
    _create: function () {
        jQuery.extend(this.options, jQuery.fn.wisvalidate.defaults);
    },
    _init: function() {
        this.render();
    },
    //重构控件
    render: function() {
        var target = this, options = target.options, element = target.element;
        var opts = jQuery.extend({}, options, {
            //debug:true,
            errorElement: "div",
            errorPlacement: function (error, element) {
                jQuery.wisvalidate.showError(jQuery(element), error);
            },
            highlight: function (element, errorClass, validClass) {
                var dialog = jQuery(element).parent().find(".wisui-validate");
                if(dialog.is(":visible")) return;
                dialog.stopTime();
                jQuery.wisvalidate.showError(jQuery(element));
            },
            success: function (element) {
                var dialog = element.parent().find(".wisui-validate");
                dialog.hide();
                dialog.stopTime();
            }
        });
        
        element.validate(opts);
    },
    valid: function(){
        var target = this, options = target.options, element = target.element;
        var result = element.valid();
        element.validate().focusInvalid();
        element.oneTime(500, function(){
            element.validate().resetForm();
        });
        
        return result;
    }
});
jQuery.fn.wisvalidate.defaults = {
};
