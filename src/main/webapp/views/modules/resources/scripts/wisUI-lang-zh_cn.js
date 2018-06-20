jQuery(function () {
    if (jQuery.fn.wisgrid) {
        jQuery.fn.wisgrid.defaults.loadingText = "正在加载数据....";
        jQuery.fn.wisgrid.defaults.emptyRowText = "没有匹配结果";
    }
    if (jQuery.fn.wispagination) {
        jQuery.fn.wispagination.defaults.pagesText = "页";
        jQuery.fn.wispagination.defaults.paginationText = "分页";
        jQuery.fn.wispagination.defaults.totalText = "共: {total} 条记录";

        jQuery.fn.wispagination.defaults.firstPageText = "第一页";
        jQuery.fn.wispagination.defaults.previousPageText = "上一页";
        jQuery.fn.wispagination.defaults.nextPageText = "下一页";
        jQuery.fn.wispagination.defaults.lastPageText = "最末页";
    }
});