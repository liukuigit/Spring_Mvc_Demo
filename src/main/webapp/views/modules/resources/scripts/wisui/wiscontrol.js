if(jQuery.fn.wisform){
    jQuery.fn.wisform.controls = {
        //下拉框
        Select:{
            bind: function(control, data, textField, valueField, options){
                control.empty();
                var defaults = jQuery.fn.wisform.defaults.option;
                var hasDefault = true;
                if(options){
                    if(options.defaults) defaults = options.defaults;
                    if(options.hasDefault == false) hasDefault = false;
                }
                if(hasDefault){
                    $("<option />").appendTo(control).attr("value", defaults.Value).html(defaults.Text);
                }
                if(!data) return false;
                $.each(data, function(m, n){
                     var item = $("<option value='" + n[valueField] + "'>" + n[textField] + "</option>").appendTo(control);
                     if(n.Selected){
                        item.attr("selected", "selected");
                     }
                    
                });
            },
            value: function(control, val){
                if(val != undefined){
                    control.val(val);
                }
                else val = control.val();
                
                return val;
            }
        },
        Radio:{
            bind: function(control, data, textField, valueField){
                control.empty();
                var name = control.attr("name") + "_radio";
                $.each(data, function(m, n){
                    var id = name + "_" + n[valueField];
                    $("<li><input type='radio' id='" + id + "' name='" + name + "' value='" + n[valueField] + "'/><label for='" + id + "'>" + n[textField] + "</label></li>").appendTo(control);
                    
                });
                
            },
            value: function(control, val){
                if(val != undefined){
                    $("input[value='" + val + "']").prop("checked", "checked");
                }
                else val = $("input[name='" + control.attr("name") + "_radio']:checked").val();
                return val;
            }
        },
        Checkbox:{
            bind: function(control, data, textField, valueField){
                control.empty();
                var name = control.attr("name") + "_checkbox";
                $.each(data, function(m, n){
                    var id = name + "_" + n[valueField];
                    $("<li><input type='checkbox' id='" + id + "' name='" + name + "' value='" + n[valueField] + "'/><label for='" + id + "'>" + n[textField] + "</label></li>").appendTo(control);
                    
                });
                
            },
            value: function(control, val){
                if(val != undefined){
                    $("input[value='" + val + "']").prop("checked", "checked");
                }
                else val = $("input[name='" + control.attr("name") + "_checkbox']:checked").val();
                return val;
            }
        },
        wfUpload:{
            render: function(datafield){
                var control = datafield.control;
                var area = $("<div class='area'/>").appendTo(control);
                var uploadbtn = $("<div class='button' display-only='normal'><span class='paper-clip'>&nbsp;</span><span class='explain'></span></div>").appendTo(control);
                uploadbtn.find(".explain").html($.translate("上传相关附件,最大不超过5MB"));
                var self = this;
                var uid = 0;
                if(control.attr("data-uid")){
                    uid = control.attr("data-uid");
                }
                
                uploadbtn.wijupload({ 
                    autoSubmit: true,
                    multiple: false,
                    uploadBtn: uploadbtn.find(".paper-clip"),
                    maximumFiles:1,
                    upload:function(e, data){
                        datafield.group.form.wrap(true, $.translate("正在上传中..."));
                    },
                    complete: function (e, obj) { 
                        datafield.group.form.wrap(false);
                        self._result(obj.response, datafield, area);
                    }, 
                    action: "/modelforms/framework/upload.ashx?action=uploadfiles&uid=" + uid + "&tms=" + (new Date()).getTime()
                });
                //绑定现有附件
                var data = $(".wisui-form").wisform("option", "data");
                $.each(data.Attachments, function(i, file){
                    if(uid == file.differenceid){
                        self._addfile(file, datafield, area);
                    }
                });
                //end

            },
            _result: function(strJson, datafield, area){
                
                if(strJson == ''){
                    alert($.translate('上传相关附件,最大不超过5MB'));
                    return false;
                }
                var res = eval('(' + strJson + ')');
                var self = this;
                if(res.success){
                    $.each(res.data, function(i, file){
                        if(datafield.control.triggerHandler("wfUpload_complete", [file, datafield]) == false) return false;
                        self._addfile(file, datafield, area);
                        //添加附件
                        jQuery.fn.wisform.controls.Upload.saveData(file);

                    });
                }
                else if(res.errorCode == 301){
                    alert($.translate(res.message));
                }
            },
            _addfile: function(file, datafield, area){
                var container = $("<div class='file' style='display:none;'></div>").appendTo(area);
                var link = $("<a target='_blank'></a>").attr("href", file.PhysicalPath).html(file.OrigFilename).appendTo(container);
                if(file.FileID > 0){
                    link.attr("href", "/portal/downloadfile.aspx?FileNO=" + file.FileID);
                }
                if(datafield.group.mode != "view"){
                    var cancel = $("<span class='delete'>&nbsp;</span>").attr("title", $.translate("取消")).appendTo(container);
                    cancel.bind("click", function(){
                        container.fadeOut(500,function(){
                            container.remove();
                        });
                        //删除附件
                        jQuery.fn.wisform.controls.Upload.deleteData(file);
                        
                    });
                }
                var clear = $(".clear", area);
                if(clear.length > 0){
                    clear.remove();
                }
                $("<div class='clear'></div>").appendTo(area);
                container.fadeIn(1500);
            }
        },
        Upload:{
            render: function(datafield){
                var control = datafield.control;
                control.width(1);
                var uploadContainer = $('<div display-only="normal"></div>');
                uploadContainer.attr("name", control.attr("name") + "_wijupload");
                var viewContainer = $('<div class="wijmo-wijupload"><ul class="wijmo-wijupload-filesList"></ul></div>');
                control.after(uploadContainer).after(viewContainer);
                var viewLi = $('<li class="wijmo-wijupload-fileRow ui-widget-content ui-corner-all"></li>').appendTo(viewContainer.find("ul"));
                var filenameContainer = $('<span data-type="title" class="wijmo-wijupload-file ui-state-highlight ui-corner-all"></span>').appendTo(viewLi);
                viewContainer.hide();
                
                var buttonContainer = $('<span display-only="normal" class="wijmo-wijupload-buttonContainer"></span>').appendTo(viewLi);
                var cancel = $("<a/>").button({
                    text: false,
                    icons: {
					    primary: "ui-icon-cancel"
				    },
                    label:$.translate("取消")}).appendTo(buttonContainer);
                cancel.bind("click", function(){
                    datafield.group.form.value(datafield.name, datafield.group.name, "");
                    
                    //删除附件
                    jQuery.fn.wisform.controls.Upload.deleteData(viewContainer.data("uploadfile"));
                    
                    viewContainer.hide();
                    uploadContainer.show();
                });
                
                var uploadBtn = $("<a href='#'><input type='file' onclick='return false;' style='width:100%'/></a>");
                if(control.attr("data-width")){
                    uploadContainer.width(control.attr("data-width"));
                    viewContainer.width(control.attr("data-width"));
                }
                uploadContainer.wijupload({ 
                    autoSubmit: true,
                    multiple: false,
                    maximumFiles: 1,
                    uploadBtn: uploadBtn,
                    upload:function(e, data){
                        datafield.group.form.wrap(true, $.translate("正在上传中..."));
                    },
                    change: function(e, data){
                        if(control.triggerHandler("upload_change", [e, data]) == false) return false;
                    },
                    complete: function (e, obj) { 
                        datafield.group.form.wrap(false);
                        try{
                            if(obj.response == ''){
                                alert($.translate('上传相关附件,最大不超过5MB'));
                                return false;
                            }
                            var json = eval('(' + obj.response + ')');
                            if(json.success){
                                if(datafield.control.triggerHandler("upload_complete", [json.data[0], datafield]) == false) return false;

                                viewContainer.data("uploadfile", json.data[0]);
                                datafield.group.form.value(datafield.name, datafield.group.name, json.data[0].Filename);
                                //添加附件
                                jQuery.fn.wisform.controls.Upload.saveData(json.data[0]);
                            }
                            else if(json.errorCode == 301){
                                alert($.translate(json.message));
                            }
                        }catch(e){}
                        
                    }, 
                    action: "/modelforms/framework/upload.ashx?action=uploadfiles&uid=-1" + "&tms=" + (new Date()).getTime()
                });
                

                var callback = function(newVal){
                    filenameContainer.empty();
                    if(newVal){
                        var data = viewContainer.data("uploadfile");

                        var link = $("<a href='" + data.PhysicalPath + "' target='_blank'></a>").appendTo(filenameContainer);
                        
                        link.html(data.OrigFilename);
                            
                        viewContainer.show();
                        uploadContainer.hide();
                    }
                    else{
                        
                        viewContainer.hide();
                        uploadContainer.show();
                    }
                };
                
                var val = datafield.group.form.value(datafield.name, datafield.group.name);
                if(val){
                    var data = $(".wisui-form").wisform("option", "data");
                    $.each(data.Attachments, function(i, file){
                        if(file.Filename == val){
                            viewContainer.data("uploadfile", file);
                            callback(val);
                            return false;
                        }
                    });
                    
                }
                datafield.group.form.subscribe(datafield.name, datafield.group.name, callback);
            },
            saveData:function(file){
                var data = $(".wisui-form").wisform("option", "viewModel");
                file.MStatus = "New";
                data.Attachments.push(file);
            },
            deleteData: function(file){
                var data = $(".wisui-form").wisform("option", "viewModel");
                for(var i =0; i< data.Attachments().length; i++){
                    if(typeof(data.Attachments()[i].Filename) == 'function'){
                        if(data.Attachments()[i].Filename() == file.Filename){
                            data.Attachments()[i].MStatus("Delete");
                            break;
                        }
                    }
                    else{
                        if(data.Attachments()[i].Filename == file.Filename){
                            data.Attachments()[i].MStatus = "Delete";
                            break;
                        }
                    }
                }
            }
        }
    }
}
if(typeof(ko) != "undefined"){
    //支持绑定控件显示文本
    ko.bindingHandlers.wisoptionText = {
          init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

          },
          update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                
              var value = valueAccessor();
              var valueUnwrapped = ko.utils.unwrapObservable(value); 
              var fieldName = $(element).attr("data-field");
                    var text = '';
              if(valueUnwrapped != undefined){
                  var options = $(element).data("options");
                  if(options){
                      if(typeof(valueUnwrapped) != 'object'){
                          text = options[valueUnwrapped];
                      }else if(valueUnwrapped.length > 0){
                          $.each(valueUnwrapped, function(i, data){
                              if(text != '') text += ', ';
                              text += options[data];
                          });
                      }
                    
                  }
              }
              $(element).text(text);
          }
    };
    
    ko.bindingHandlers.wischecked = {
          init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var observable = valueAccessor(),
                    interceptor = ko.computed({
                        read: function() {
                            if(!observable) return null;
                            var val = observable();
                            
                            if(typeof(val) == 'boolean'){
                                return val.toString();
                            }
                            else return val;
                        },
                        write: function(newValue) {
                            if(observable){
                                observable(newValue);
                            }
                        }                   
                    });
                
                ko.applyBindingsToNode(element, { checked: interceptor });
          }
    };

    ko.bindingHandlers.wistext = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            var fieldName = $(element).attr("data-field");
            var text = '';
            if (valueUnwrapped != undefined) {
                text = valueUnwrapped;
                var dataType = $(element).attr("data-type");
                var convertMoney = function (money) {
                    var s = money; //获取小数型数据
                    s += "";
                    if (s.indexOf(".") == -1) s += ".0"; //如果没有小数点，在后面补个小数点和0
                    if (/\.\d$/.test(s)) s += "0";   //正则判断
                    while (/\d{4}(\.|,)/.test(s))  //符合条件则进行替换
                        s = s.replace(/(\d)(\d{3}(\.|,))/, "$1,$2"); //每隔3位添加一个
                    return s;
                }
                switch (dataType) {
                    case "date":
                        text = text.substr(0, 10);
                        break;
                    case "money":
                        text = convertMoney(text);
                        break;
                }
            }
            $(element).text(text);
            var html = $(element).html();
            $(element).html(html.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br />"));

        }
    };
}
