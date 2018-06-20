jQuery.extend({
    pms_controls: {
        wfUpload: {
            render: function (control, _data) {
                // var control = datafield.control;
                control.empty();
                control.data("uploadfile", null);
                var area = $("<div class='area'/>").appendTo(control);
                var uploadbtn = $("<div class='button' display-only='normal'><span class='paper-clip'>&nbsp;</span><span class='explain'></span></div>").appendTo(control);
                uploadbtn.find(".explain").html($.translate("上传相关附件,最大不超过5MB!"));
                var self = this;
                var uid = 0;
                if (control.attr("uid") != "" && typeof (control.attr("uid")) != 'undefined') {
                    uid = control.attr("uid");
                }

                uploadbtn.wijupload({
                    autoSubmit: true,
                    multiple: false,
                    uploadBtn: uploadbtn.find(".paper-clip"),
                    maximumFiles: 1,
                    upload: function (e, data) {
                        btnWrap(true);
                        $(".wijmo-wijupload-cancel").bind("click", function () {
                            btnWrap(false);
                        });
                        $(".wijmo-wijupload-upload").hide();
                    },
                    change: function (e, data) {
                        if (control.attr("filter") != "" && typeof (control.attr("filter")) != 'undefined') {
                            var flag = false;
                            var filter = control.attr("filter");
                            var exts = filter.split(',');
                            var extend = data[0].value.substring(data[0].value.lastIndexOf("."));

                            if (extend != "") {

                                for (var i = 0; i < exts.length; i++) {
                                    if (extend.toUpperCase() == exts[i].toUpperCase()) {
                                        flag = true;
                                    }
                                }
                            }

                            if (!flag) {
                                alert($.translate('文件格式不正确!'));
                                return false;
                            }
                        }

                        if (control.triggerHandler("upload_change", [e, data]) == false) return false;
                    },
                    complete: function (e, obj) {
                        btnWrap(false);

                        self._result(obj.response, control, area);
                    },
                    action: "/Modules/Question/Pages/Handler/Upload.ashx?action=uploadfiles&uid=" + uid + "&tms=" + (new Date()).getTime()
                });

                //绑定现有附件
                if (_data != null && typeof (_data) != 'undefined') {
                    $.each(_data, function (i, file) {
                        if (uid == file.differenceid) {

                            self._addfile(file, control, area);
                            self._saveData(file, control);
                        }
                    });
                }

                if (control.attr("viewmodel") == "view") {
                    uploadbtn.hide();
                }

                var btnWrap = function (flag) {
                    if (flag) {
                        $('.button').attr('disabled', 'true');
                        $("button", window.parent.document).each(function (i, j) {
                            $(j).attr('disabled', 'true');
                        });
                    }
                    else {
                        $('.button').removeAttr('disabled');
                        $("button", window.parent.document).each(function (i, j) {
                            $(j).removeAttr('disabled');
                        });
                    }
                }


                //end
            },
            _result: function (strJson, control, area) {
                if (strJson == '') {
                    alert($.translate('上传相关附件,最大不超过5MB!'));
                    return false;
                }
                var res = eval('(' + strJson + ')');
                var self = this;
                if (res.success) {
                    $.each(res.data, function (i, file) {
                        if (control.triggerHandler("wfUpload_complete", [file, control]) == false) return false;
                        self._addfile(file, control, area);
                        //添加附件
                        self._saveData(file, control);

                    });
                }
                else if (res.errorCode == 301) {
                    alert($.translate(res.message));
                }
            },
            _addfile: function (file, control, area) {
                var self = this;
                var container = $("<div class='file' style='display:none;'></div>").appendTo(area);
                var spanStr = file.OrigFilename;
                var div;

                if (spanStr.length >= 55) {
                    spanStr = spanStr.substring(0, 55);
                    div = jQuery('<div class="desc_ellipsis" style="width:542px;" ></div>').attr("title", file.OrigFilename).html(spanStr);
                }
                else {
                    div = jQuery('<div></div>').attr("title", file.OrigFilename).html(spanStr);
                }

                var link = $("<a style=\"display:inline-block;\" target='_blank'></a>").attr("href", file.PhysicalPath).append(div).appendTo(container);

                if (file.FileID != null) {
                    link.attr("href", "/Modules/Question/Pages/downloadfile.aspx?FileNO=" + file.FileID);
                }


                if (control.attr("viewmodel") != "view") {
                    var cancel = $("<span style=\"width:5px;\" class='delete'>&nbsp;</span>").attr("title", $.translate("取消")).appendTo(container);

                    cancel.bind("click", function () {
                        container.fadeOut(500, function () {
                            container.remove();
                        });
                        //删除附件
                        self._deleteData(file, control);

                    });
                }
                var clear = $(".clear", area);
                if (clear.length > 0) {
                    clear.remove();
                }
                $("<div class='clear'></div>").appendTo(area);
                container.fadeIn(1500);
            },
            GetFiles: function (control) {
                var data = control.data("uploadfile");

                return data;
            },
            _saveData: function (file, control) {

                var data = control.data("uploadfile");
                if (data == null || typeof (data) == 'undefined') {
                    data = [];
                }
                file.MStatus = "New";
                data.push(file);
                control.data("uploadfile", data);
            },
            _deleteData: function (file, control) {

                var data = control.data("uploadfile");

                if (data == null || typeof (data) == 'undefined') {
                    data = [];
                }
                for (var i = 0; i < data.length; i++) {
                    if (typeof (data[i].Filename) == 'function') {
                        if (data[i].Filename() == file.Filename) {
                            data[i].MStatus("Delete");
                            break;
                        }
                    }
                    else {
                        if (data[i].Filename == file.Filename) {
                            data[i].MStatus = "Delete";
                            break;
                        }
                    }
                }
                control.data("uploadfile", data);

            }

        },
        Upload: {
            render: function (control, _data) {
                var field = control.parent().empty();
                control.appendTo(field);
                control.height(0);
                control.width(0);
                control.css("padding", "0px");
                control.css("display", "none");

                var uploadContainer = $('<div display-only="normal"></div>');
                uploadContainer.attr("name", control.attr("name") + "_wijupload");
                var viewContainer = $('<div class="wijmo-wijupload" ><ul class="wijmo-wijupload-filesList"></ul></div><div>');
                var filter;
                if (control.attr("filtermes") != "" && typeof (control.attr("filter")) != 'filtermes') {
                    filter = $('<div  class="explain" style=\"color:#bf1a09;font-size:12px;font-weight:bold;line-height:20px;\"><div/>').html(control.attr("filtermes"));
                } else {
                     filter = $('<div  class="explain" style=\"color:#bf1a09;font-size:12px;font-weight:bold;line-height:20px;\"><div/>').html($.translate("文件格式") + ":(" + control.attr("filter") + ")");
                }
                if (control.attr("filter") != "" && typeof (control.attr("filter")) != 'undefined') {
                    control.after(filter);
                }
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
                    label: $.translate("取消")
                }).appendTo(buttonContainer);
                cancel.bind("click", function () {

                    btnWrap(false);
                    //    datafield.group.form.value(datafield.name, datafield.group.name, "");
                    control.data("uploadfile", null);
                    //删除附件
                    //   jQuery.pas_controls.Upload.deleteData(viewContainer.data("uploadfile"));
                    uploadContainer.show();
                    viewContainer.hide();

                    if (control.attr('IsPreView') == "true") {
                        $('#' + control.attr('PreViewId')).removeAttr('src').hide();
                    }

                });



                var uploadBtn = $("<a href='#'><input type='file' onclick='return false;' style='width:90%'/></a>");
                if (control.attr("data-width")) {
                    uploadContainer.width(control.attr("data-width"));
                    viewContainer.width(control.attr("data-width"));
                    filter.width(control.attr("data-width"));
                }
                uploadContainer.wijupload({
                    autoSubmit: true,
                    multiple: false,
                    maximumFiles: 1,
                    uploadBtn: uploadBtn,
                    upload: function (e, data) {
                        btnWrap(true);
                        $(".wijmo-wijupload-cancel").bind("click", function () {
                            btnWrap(false);
                        });

                        $(".wijmo-wijupload-upload").hide();
                    },
                    change: function (e, data) {

                        if (control.attr("filter") != "" && typeof (control.attr("filter")) != 'undefined') {
                            var flag = false;
                            var filter = control.attr("filter");
                            var exts = filter.split(',');
                            var extend = data[0].value.substring(data[0].value.lastIndexOf("."));

                            if (extend != "") {

                                for (var i = 0; i < exts.length; i++) {
                                    if (extend.toUpperCase() == exts[i].toUpperCase()) {
                                        flag = true;
                                    }
                                }
                            }
                            if (!flag) {
                                alert($.translate('文件格式不正确!'));

                                return false;
                            }
                        }

                        if (control.triggerHandler("upload_change", [e, data]) == false) return false;


                    },
                    complete: function (e, obj) {



                        try {
                            if (obj.response == '') {
                                alert($.translate('上传相关附件,最大不超过5MB!'));

                                return false;
                            }
                            var json = eval('(' + obj.response + ')');
                            if (json.success) {
                                if (control.triggerHandler("upload_complete", [json.data[0], control]) == false) return false;

                                viewContainer.data("uploadfile", json.data[0]);
                                control.data("uploadfile", json.data[0]);
                                callback(true);
                                //datafield.group.form.value(datafield.name, datafield.group.name, json.data[0].Filename);
                                //添加附件

                                //  jQuery.pas_controls.Upload.saveData(json.data[0]);
                                if (control.attr('IsPreView') == "true") {
                                    $('#' + control.attr('PreViewId')).attr('src', json.data[0].PhysicalPath).show();
                                }
                            }
                            else if (json.errorCode == 301) {
                                alert($.translate(json.message));

                            }
                        } catch (e) { } finally {
                            btnWrap(false);
                        }

                    },
                    action: "/Modules/Question/Pages/Handler/Upload.ashx?action=uploadfiles&uid=-1&tms=" + (new Date()).getTime()
                });

                var btnWrap = function (flag) {
                    if (flag) {
                        $('.button').attr('disabled', 'true');
                        $("button", window.parent.document).each(function (i, j) {
                            $(j).attr('disabled', 'true');
                        });
                    }
                    else {
                        $('.button').removeAttr('disabled');
                        $("button", window.parent.document).each(function (i, j) {
                            $(j).removeAttr('disabled');
                        });
                    }
                }

                var callback = function (newVal) {
                    filenameContainer.empty();
                    if (newVal) {
                        var data = viewContainer.data("uploadfile");

                        var link = $("<a href='" + data.PhysicalPath + "' target='_blank'></a>").appendTo(filenameContainer);
                        if (data.FileID != null) {
                            link.attr("href", "/Modules/Question/Pages/downloadfile.aspx?FileNO=" + data.FileID);
                        }
                        link.text(data.OrigFilename);

                        if (control.attr('IsPreView') == "true") {
                            $('#' + control.attr('PreViewId')).attr('src', data.PhysicalPath).show();
                        }

                        viewContainer.show();
                        uploadContainer.hide();
                    }
                    else {
                        viewContainer.hide();
                        uploadContainer.show();
                    }
                };
                if (_data != null && typeof (_data) != 'undefined') {
                    var val = control.attr("filepath");
                    if (val) {

                        $.each(_data, function (i, file) {
                            if (file.Filename == val) {
                                viewContainer.data("uploadfile", file);
                                control.data("uploadfile", file);
                                callback(val);
                                return false;
                            }
                        });
                    }
                }

                if (control.attr("viewmodel") == "view") {
                    var val = control.attr("filepath");
                    if (val) {
                        viewContainer.show();
                    }
                    uploadContainer.hide();
                    $("[display-only='normal']").hide();
                }
            },
            GetFiles: function (control) {
                var data = control.data("uploadfile");
                return data;
            }
        },
        Select: {
            bind: function (control, data, textField, valueField, options) {
                control.empty();
                var defaults = jQuery.fn.wisform.defaults.option;
                var hasDefault = true;
                if (options) {
                    if (options.defaults) defaults = options.defaults;
                    if (options.hasDefault == false) hasDefault = false;
                }
                if (hasDefault) {
                    $("<option />").appendTo(control).attr("value", defaults.Value).html(defaults.Text);
                }
                if (!data) return false;
                var array = new Array();
                $.each(data, function (m, n) {
                    var item = $("<option value='" + n[valueField] + "'  >" + n[textField] + "</option>"); //.appendTo(control);
                    if (n.Selected) {
                        item.attr("selected", "selected");
                    }
                    array.push(item[0].outerHTML);


                });
                control.append(array.join(""));
            },
            value: function (control, val) {
                if (val != undefined) {
                    control.val(val);
                }
                else val = control.val();

                return val;
            }
        }
    }
});