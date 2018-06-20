/**
 * wisgrid - jQuery WisUI
 * 
 * created by xgz [ xiaguangze@wisdomin.com ] 
 *
 * Copyright 2012 wisdomin 
 * 
 *属性：
    width:控件宽
    height:控件高
    url:数据请求地址
    idField:主键名称
    checkbox:是否显示复选框
    columns:表格的列集合
    pageNumber:当前页
    pageSize:页加载数量
    total:数据总数
    headAlign:表头对齐方式
    rows:数据集合
    pagination:是否分页
    queryParams:传递参数
    showFooter:是否显示页脚,
    showEmptyRowText:是否显示空行提示
 *方法：
 * 
 *事件：
    onLoadSuccess:成功加载数据事件
 */
jQuery.widget("wisui.wisgrid", {
    widgetEventPrefix: 'wis',
    options: {
        width: 'auto',
        height: 'auto',
        url: '',
        idField: 'ID',
        checkbox: true,
        radiobutton: false,
        selectAlign: 'First',
        columns: null,
        pageNumber: 1,
        pageSize: 10,
        total: 0,
        headAlign: 'left',
        showFooter: false,
        rows: null,
        dataOther: null,
        footer: null,
        pagination: true,
        queryParams: {},
        onLoadSuccess: function () { },
        fields: [],
        showEmptyRowText: false
    },
    _create: function () {
        var options = this.options;
        jQuery.extend(options, jQuery.fn.wisgrid.defaults);

        //添加复选框列
        if (options.checkbox) {
            if (options.selectAlign == "Last") {
                options.columns.push({ checkbox: true, field: this.options.idField, align: 'center' });
            } else {
                options.columns.unshift({ checkbox: true, field: this.options.idField, align: 'center' });
            }

        }
        if (options.radiobutton) {
            if (options.selectAlign == "Last") {
                options.columns.push({ radiobutton: true, field: this.options.idField, align: 'center' });
            } else {
                options.columns.unshift({ radiobutton: true, field: this.options.idField, align: 'center' });
            }
        }
    },
    _init: function () {
        this.render();
        this.bindData();
    },

    //重构控件
    render: function () {
        var target = this, options = target.options, element = target.element;
        element.empty();
        if (!options.columns) return false;
        element.attr("class", "r_table_content_grid");
        var wrap = jQuery("<div class='wisgrid-wrap'/>").appendTo(element)
                    .width(options.width)
                    .height(options.height);
        var grid = jQuery('<table class="table table-bordered table-hover table-striped" style="table-layout:fixed"/>')
                    .appendTo(wrap)
                    .width(options.width)
                    .height(options.height);
        element.data("grid", grid);
        //创建header
        this._createHeader(grid, options.columns);


        jQuery("<tbody/>").appendTo(grid);
        //加载分页控件
        if (options.pagination) {
            var pager = jQuery("<div/>").appendTo(element);
            pager.wispagination({
                width: '98%',
                pageNumber: options.pageNumber,
                pageSize: options.pageSize,
                total: 0,
                onSelectPage: function (pageNumber, pageSize) {
                    options.pageNumber = pageNumber;
                    options.pageSize = pageSize;
                    target._loadData(false);
                }
            });
            element.data("pagination", pager);
        }
    },
    _setOption: function (name, value) {
        this._super(name, value);
        if (name == "pageNumber" && this.element.data("pagination")) {
            this.element.data("pagination").wispagination("option", "pageNumber", value);
        }
        else if (name == "pageSize" && this.element.data("pagination")) {
            this.element.data("pagination").wispagination("option", "pageSize", value);
        }

    },
    _parseColumns: function (columns) {

        var rows = [];

        function get_cidx(c) {
            var cidx = 1;
            if (c.columns && c.columns.length > 0) {
                cidx = 0;
                for (var i = 0; i < c.columns.length; i++) {
                    cidx += get_cidx(c.columns[i]);
                }
            }
            return cidx;
        }

        function init_row(cols, ridx) {
            var row = [];
            if (ridx >= rows.length) {
                rows.push(row);
            }
            else {
                row = rows[ridx];
            }
            for (var i = 0; i < cols.length; i++) {
                row.push(cols[i]);
                if (cols[i].columns && cols[i].columns.length > 0) {
                    init_row(cols[i].columns, ridx + 1);
                    cols[i].colspan = get_cidx(cols[i]);
                }
            }
        }

        init_row(columns, 0);
        return rows;
    },
    _createHeader: function (grid, columns) {
        var options = this.options;
        //创建header
        var header = jQuery("<thead class='alert-success'/>").appendTo(grid);

        var rows = this._parseColumns(columns);

        for (var i = 0; i < rows.length; i++) {
            var tr = jQuery("<tr/>").attr("class", "t_bg_title").appendTo(header);
            for (var j = 0; j < rows[i].length; j++) {
                var col = rows[i][j];
                var attr = '';
                if (!col.columns && (i + 1) != rows.length) attr += 'rowspan="' + (rows.length - i) + '" ';
                if (col.colspan) attr += 'colspan="' + col.colspan + '" ';
                var th = jQuery('<th ' + attr + '></th>').appendTo(tr);
                if (col.checkbox) {
                    var checkbox = jQuery('<input type="checkbox" />');
                    if (options.selectAlign == "Last") {
                        checkbox.prependTo(th)
                    } else {
                        checkbox.appendTo(th)
                    }
                    checkbox.attr("field", col.field);
                    checkbox.data("field", col.field);
                    checkbox.bind("click", function () {
                        var checked = jQuery(this).prop("checked");
                        var chks = grid.children("tbody").find("[field='" + checkbox.attr("field") + "']");
                        jQuery.each(chks, function (i, c) {
                            if (!jQuery(c).children("input[type='checkbox']").prop("disabled")) {
                                jQuery(c).children("input[type='checkbox']").prop("checked", checked);
                            }
                        });
                    });
                    th.width(60);
                    th.css("text-align", "center");
                } else if (col.radiobutton) {
                    th.html("&nbsp;");
                    th.width(60);
                    th.css("text-align", "center");
                }
                else {
                    if (col.title) th.html(col.title);
                    if (col.width) th.width(col.width);
                    if (options.headAlign) th.css("text-align", options.headAlign);
                }
                //if(col.align) th.css("text-align", col.align);

            }
        }

        //初始化字段
        this._initFields(columns);
    },
    _createHeadRow: function (header, cols, ridx, rowtotal) {
        //获取当前列的colspan值

        function get_cidx(c) {
            var cidx = 1;
            if (c.columns && c.columns.length > 0) {
                for (var i = 0; i < c.columns.length; i++) {
                    cidx += get_cidx(c.columns[i]);
                }
            }
            return cidx;
        }

        var tr = jQuery("<tr/>").attr("class", "header").appendTo(header);

        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            col.colspan = get_cidx(col);
            if (col.colspan == 1 && !col.rowspan) {
                col.rowspan = (rowtotal - ridx);
            }

            var attr = '';
            if (col.rowspan) attr += 'rowspan="' + col.rowspan + '" ';
            if (col.colspan) attr += 'colspan="' + col.colspan + '" ';
            var th = jQuery('<th ' + attr + '></th>').appendTo(tr);
            if (col.checkbox) {
                var checkbox = jQuery('<input type="checkbox" />')
                if (options.selectAlign == "Last") {
                    checkbox.prependTo(th)
                } else {
                    checkbox.appendTo(th)
                }
                checkbox.data("field", col.field);
                checkbox.bind("click", function () {
                    var checked = checkbox.prop("checked");
                    var chks = grid.children("tbody").find("[field='" + checkbox.data("field") + "']");
                    jQuery.each(chks, function (i, c) {
                        if (!jQuery(c).children("input[type='checkbox']").prop("disabled")) {
                            jQuery(c).children("input[type='checkbox']").prop("checked", checked);
                        }
                    });
                });
                th.width(60);
            } else if (col.radiobutton) {
                th.html("&nbsp;");
                th.width(60);
                th.css("text-align", "center");
            } else {
                if (col.title) th.html(col.title);
                if (col.width) th.width(col.width);
            }
            if (col.align) th.css("text-align", col.align);
        }
    },
    bindData: function () {
        //this.option("pageNumber", 1);
        if (this.options.url != '') {
            this._loadData(true);
        }
        else {
            this.options.total = this.options.rows.length;
            this._buildRows();
        }
    },
    getSelections: function () {
        var target = this, options = target.options, element = target.element;
        var grid = element.data("grid");

        var chks = grid.children("tbody").find("[field='" + options.idField + "']");

        var rows = [];
        jQuery.each(chks, function (i, c) {

            if (options.checkbox) {
                var checkbox = jQuery(c).children("input[type='checkbox']");
                if (checkbox.prop("checked")) {
                    rows.push(checkbox.data("row"));
                }
            } else if (options.radiobutton) {
                var radio = jQuery(c).children("input[type='radio']");
                if (radio.prop("checked")) {
                    rows.push(radio.data("row"));
                }
            }


        });
        return rows;
    },
    _initFields: function (columns) {
        var target = this, options = target.options, element = target.element;

        function getFields(cols) {
            var fields = [];
            jQuery.each(cols, function (i, col) {
                if (col.columns && col.columns.length > 0) {
                    var ff = getFields(col.columns);
                    fields = fields.concat(ff);
                }
                else {
                    fields.push(col);
                }
            });
            return fields;
        }

        options.fields = getFields(columns);
    },
    _loadData: function (isInit) {

        var target = this, options = target.options, element = target.element;
        var grid = element.data("grid");

        var body = grid.children("tbody");

        element.data("grid").find("input[type='checkbox']")
            .prop("checked", false);
        var params = jQuery.extend({}, options.queryParams);
        params["pageNumber"] = options.pageNumber;
        params["pageSize"] = options.pageSize;
        var wrap = jQuery('.wisgrid-wrap', element);
        jQuery('<div class="wisgrid-mask"></div>').css({
            display: 'block',
            width: wrap.width(),
            height: wrap.height()
        }).appendTo(wrap);
        jQuery('<div class="wisgrid-mask-msg"></div>')
			.html(options.loadingText)
			.appendTo(wrap)
			.css({
			    display: 'block',
			    left: (wrap.width() - jQuery('.wisgrid-mask-msg', wrap).outerWidth()) / 2,
			    top: (wrap.height() - jQuery('.wisgrid-mask-msg', wrap).outerHeight()) / 2
			});
        jQuery.wisCore.invokeAjax(options.url, params,
            function (res) {
                jQuery('.wisgrid-mask', wrap).remove();
                jQuery('.wisgrid-mask-msg', wrap).remove();

                if (res.success == false) {
                    $.Alert(res.message);
                    return false;
                }
                options.total = res.data.count;
                options.rows = res.data.items;
                options.footer = res.data.footer;
                options.dataOther = res.data.Other;
                if (isInit && element.data("pagination")) {
                    element.data("pagination").wispagination("option", "total", res.data.count);
                }
                target._buildRows();
            },
            function (e, m, s) {
                jQuery('.wisgrid-mask', wrap).remove();
                jQuery('.wisgrid-mask-msg', wrap).remove();
                throw (e);
            }
        );
    },
    _buildRows: function () {
        var target = this, options = target.options, element = target.element;
        var grid = element.data("grid");

        var body = grid.children("tbody");

        body.empty();

        //增加空文本行提示, modified by xgz, at 2013-10-9
        if (options.showEmptyRowText && options.total === 0 && options.rows.length === 0) {
            var row = jQuery("<tr/>").appendTo(body);
            var cell = jQuery("<td/>").attr("colSpan", options.fields.length).appendTo(row);
            jQuery("<div class='wisgrid-empty-row'/>").text(options.emptyRowText).appendTo(cell);


            if (options.pagination) {
                element.data("pagination").hide();
            }
        }
        else {
            if (options.pagination) {
                element.data("pagination").show();
            }
            jQuery.each(options.rows, function (i, data) {
                var row = jQuery("<tr/>").appendTo(body);
                data.rowindex = i + 1;
                data.rowtotal = options.rows.length;
                row.data("row", data);
                row.bind("click", function () {

                }).bind("mouseover", function () {
                    row.css("background-color", "#ECF2F7");
                }).bind("mouseout", function () {
                    row.css("background-color", "");
                });
                if (i % 2 == 1) {
                    row.attr("class", "alternat");
                }
                jQuery.each(options.fields, function (j, col) {
                    var cell = jQuery("<td/>").appendTo(row);

                    var dataVal = data[col.field];

                    if (col.checkbox == true) {
                        var checkbox = jQuery('<input type="checkbox" />');
                        if (options.selectAlign == "Last") {
                            checkbox.prependTo(cell)
                        } else {
                            checkbox.appendTo(cell)
                        }

                        checkbox.val(dataVal);
                        checkbox.data("row", data);
                        checkbox.data("field", col.field);
                        checkbox.attr("field", col.field);
                        checkbox.bind("click", function () {
                            var checked = jQuery(this).prop("checked");
                            if (!checked) {
                                var headchk = grid.children("thead").find("input[field='" + checkbox.data("field") + "']");
                                if (headchk.prop("checked")) {
                                    headchk.prop("checked", checked);
                                }
                            }
                        });
                    } else if (col.radiobutton == true) {
                        var radio = jQuery('<input type="radio" />');

                        if (options.selectAlign == "Last") {
                            radio.prependTo(cell)
                        } else {
                            radio.appendTo(cell)
                        }

                        radio.val(dataVal);
                        radio.data("row", data);
                        radio.data("field", col.field);
                        radio.attr("field", col.field);
                        radio.attr("name", 'wisgrid');
                    }
                    else {

                        if (col.field == "_orderNo") {
                            cell.html((options.pageNumber - 1) * options.pageSize + i + 1);
                        }
                        else if (col.formatter) {
                            var formatterValue = col.formatter(dataVal, data);
                            if (!formatterValue) formatterValue = "&nbsp;";
                            if (formatterValue instanceof jQuery) {
                                cell.append(formatterValue);
                            }
                            else {
                                if (formatterValue === null || formatterValue === undefined || formatterValue === "") {
                                    formatterValue = "&nbsp;";
                                }
                                cell.html(formatterValue);
                            }
                        }
                        else {
                            if (dataVal === null || dataVal === undefined || dataVal === "") {
                                dataVal = "&nbsp;";
                            }
                            cell.html(dataVal);
                        }
                    }
                    cell.attr("field", col.field);
                    if (col.width) cell.width(col.width);
                    if (col.align) cell.css("text-align", col.align);
                });
            });

            if (options.showFooter) {

                if (!options.footer) return;
                var row = jQuery("<tr/>").appendTo(body);
                jQuery.each(options.fields, function (j, col) {
                    var cell = jQuery("<td/>").appendTo(row);

                    var dataVal = options.footer[col.field];

                    if (col.checkbox != true) {
                        if (col.field == "_orderNo") {
                            cell.html("&nbsp;");
                        }
                        else if (col.footerFormatter) {
                            var formatter = col.footerFormatter;
                            if (formatter == true) {
                                formatter = col.formatter;
                            }
                            var formatterValue = formatter(options.footer[col.field], options.footer);
                            if (formatterValue instanceof jQuery) {
                                cell.append(formatterValue);
                            }
                            else {
                                if (formatterValue === null || formatterValue === undefined || formatterValue === "") {
                                    formatterValue = "&nbsp;";
                                }
                                cell.html(formatterValue);
                            }
                        }
                        else {
                            if (dataVal === null || dataVal === undefined || dataVal === "") {
                                dataVal = "&nbsp;";
                            }
                            cell.html(dataVal);
                        }
                    }
                    else cell.html("&nbsp;");

                    if (col.width) cell.width(col.width);
                    if (col.align) cell.css("text-align", col.align);
                });
            }
        }
        if (options.onLoadSuccess) options.onLoadSuccess(target);
    }
});
jQuery.fn.wisgrid.defaults = {
    loadingText:"Loading ...."
};



jQuery.widget("wisui.wispagination", {
    widgetEventPrefix: 'wis',
    options: {
        width: '98%',
        height: '20px',
        total: 1,
        pageSize: 10,
        pageNumber: 1,
        pageTotal: 1,
        buttons: null,
        onSelectPage: function (pageNumber, pageSize) { },
        beforePageText: 'Page',
        afterPageText: 'of {pages}'
    },
    _create: function () {
        jQuery.extend(this.options, jQuery.fn.wispagination.defaults);
    },
    _init: function () {
        this.render();
    },
    _setOption: function (name, value) {
        this._super(name, value);
        if (name == "total") {
            this.render();
        }

    },
    //重构控件
    render: function () {

        var target = this, options = target.options, element = target.element;
        element.empty();

        var pager = jQuery('<table class="wispagination" border="0" cellpadding="0" cellspacing="0" style="margin: 6px;"/>')
                    .appendTo(element)
                    .width(options.width)
                    .height(options.height);
        element.data("pagination", pager);

        var row = jQuery("<tr/>").appendTo(pager);
        var left = jQuery("<td/>").appendTo(row);
        left.append(options.totalText.replace(/{total}/, options.total));
        left.append("&nbsp;&nbsp;&nbsp;");
        left.append(options.paginationText + "：");
        var pageSlt = jQuery("<select style='width:auto;height:auto;'/>").appendTo(left);
        element.data("pagination-select", pageSlt);
        pageSlt.bind("change", function () {
            target.setPageNumber(pageSlt.val());
        });
        var nums = parseInt(options.total / options.pageSize) + parseInt(options.total % options.pageSize == 0 ? 0 : 1);
        if (nums < 1) nums = 1;

        for (var i = 1; i <= nums; i++) {
            pageSlt.append("<option value='" + i + "'>" + i + "</option>");
        }

        pageSlt.val(options.pageNumber);
        left.append(" / " + nums + "  " + options.pagesText);

        options.pageTotal = nums;

        var right = jQuery("<td/>").appendTo(row).css("text-align", "left");

        var container = jQuery("<ul class='pager'/>").appendTo(right);
        var firstPage = jQuery("<li  pagination='first'><a href='javascript:void(0);'>" + options.firstPageText + "</a></li>").appendTo(container).bind("click", function () { target.setPageNumber(1); });
        var prePage = jQuery("<li pagination='previous'><a href='javascript:void(0);'>" + options.previousPageText + "</a></li>").appendTo(container).bind("click", function () { target.setPageNumber(parseInt(options.pageNumber) - 1); });
        var nextPage = jQuery("<li pagination='next'><a href='javascript:void(0);'>" + options.nextPageText + "</a></li>").appendTo(container).bind("click", function () { target.setPageNumber(parseInt(options.pageNumber) + 1); });
        var lastPage = jQuery("<li pagination='last'><a href='javascript:void(0);'>" + options.lastPageText + "</a></li>").appendTo(container).bind("click", function () { target.setPageNumber(nums); });
//        var firstPage = jQuery("<a class='wispagination-button' pagination='first' href='javascript:void(0);'/>").appendTo(right)
//                        .html(options.firstPageText).bind("click", function(){ target.setPageNumber(1); });
//        var prePage = jQuery("<a class='wispagination-button' pagination='previous' href='javascript:void(0);'/>").appendTo(right)
//                        .html(options.previousPageText).bind("click", function(){ target.setPageNumber(parseInt(options.pageNumber) - 1); });
//        var nextPage = jQuery("<a class='wispagination-button' pagination='next' href='javascript:void(0);'/>").appendTo(right)
//                        .html(options.nextPageText).bind("click", function(){ target.setPageNumber(parseInt(options.pageNumber) + 1); });
//        var lastPage = jQuery("<a class='wispagination-button' pagination='last' href='javascript:void(0);'/>").appendTo(right)
//                        .html(options.lastPageText).bind("click", function(){ target.setPageNumber(nums); });
        target.setPageNumber(options.pageNumber, true);

    },
    setPageNumber: function (num, isInit) {
        var target = this, options = target.options, element = target.element;
        if (num < 1 || num > options.pageTotal) return false;

        var pager = element.data("pagination");
        pager.find("[pagination='first']").attr("class", "");
        pager.find("[pagination='previous']").attr("class", "");
        pager.find("[pagination='next']").attr("class", "");
        pager.find("[pagination='last']").attr("class", "");
        if (num <= 1) {
            num = 1;
            pager.find("[pagination='first']").attr("class", "disabled");

            pager.find("[pagination='previous']").attr("class", "disabled");
        }
        if (num >= options.pageTotal) {
            num = options.pageTotal;
            pager.find("[pagination='next']").attr("class", "disabled");
            pager.find("[pagination='last']").attr("class", "disabled");
        }

        if (num == options.pageNumber) return false;

        options.pageNumber = num;
        if (element.data("pagination-select").val() != num) {
            element.data("pagination-select").val(num);
        }


        if (!isInit) {
            options.onSelectPage(num, options.pageSize);
        }
    }
});
jQuery.fn.wispagination.defaults = {
    pagesText:"pages",
    paginationText:"Page",
    totalText:"Total: {total} items",
    
    firstPageText:"First",
    previousPageText:"Previous",
    nextPageText:"Next",
    lastPageText:"Last"
};
