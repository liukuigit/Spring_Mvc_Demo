
/*
 
   增加了Asp.Net调用的方法
   调用方法:
        function test1(){

			var data = 
			[
				{id: "10",name: "苹果"},
				{id: "20",name: "香蕉"},
				{id: "30",name: "西瓜"},
				{id: "40",name: "桃子"},
				{id: "50",name: "葡萄"}
			];

			$("#test1").mulitselector({
				title:"请选择类别-自定义标题",
				data:data
			});
			//alert(document.getElementById("bd").innerHTML);
		}
		当出现选项样式不整齐时在页面中放置 <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
  

 */
 var index=0;
 function checkAllBox(checkall){

		    jQuery("#allItems1 li input:checkbox").each(function(){
		        jQuery(this).attr("checked",jQuery(checkall).attr("checked"));
		    });
		    
		  
		}
(function($) {


	
	$.fn.mulitselector = function(options) { 
		
		if ($("#mulitSelector").length != 0) return;

		var $input = $(this);

		var ms_html;

		var settings = 
		{
			title: "请选择类别",
			selectAll:"全选",
			btnOk:"确定",
			btnClear:"清空",
			data: null,
			value:"",
			location_ename:"",
			location_cname:"",
			Lang:"zh-cn",  //语言 现有(zh-cn/en-US)两种
			firstInit:0    //第一次点击是否展开选择项 0不展开 1展开
			
		};

		if (options){
			jQuery.extend(settings, options);
			if(settings.firstInit == 1)
			{
			index=settings.firstInit;
			}
		}

		function initialise(){
			initContent();
			initEvent();
			FindCheckAll();
		}

		function initEvent() {

			$("#ms_bt_ok").click(function() {
				var result = "";
				var sid = "";
				var ename="";
				var cname="";  
				var objall = $("#allItems1 .itemCk");   //取得选中之后的对象
				
			var obj=$(objall).find("input:checked");
			
				
				
				for(var i=0; i<obj.length; i++)
				{
			
					result += (i==0?"":"+")+obj[i].value.split("@")[1];  //取得选择的文字集合
					 sid += (i==0?"":"+")+obj[i].value.split("@")[0];  //取得选择的ID集合
					 
					 ename+= (i==0?"":"+")+obj[i].value.split("@")[2];  //取得选择的英文名称
					 cname+= (i==0?"":"+")+obj[i].value.split("@")[1];  //取得选择的中文名称
					 
					 
					var temp = $("#abc"+$(obj[i]).attr("id")).find("ol input:checked");
			//alert(temp.length);
					for(var j=0;j<temp.length;j++)
					{

					    sid += "+"+temp[j].value.split("@")[0];  //取得选择的ID集合
					}
					
					
			    }
			    
			    
			    $(objall).find("input").each(function(){
			      if(  !$(this).attr("checked") )
			      {
			          var temp = $("#abc"+$(this).attr("id")).find("ol input:checked");
			          
			          for(var i=0;i<temp.length;i++)
					{
					
					  result += (result.length==0?"":"+")+temp[i].value.split("@")[1];  //取得选择的文字集合
					  sid += (sid.length==0?"":"+")+temp[i].value.split("@")[0];  //取得选择的ID集合
					  ename+= (ename.length==0?"":"+")+temp[i].value.split("@")[2];  //取得选择的英文名称 
					  cname+= (cname.length==0?"":"+")+temp[i].value.split("@")[1];  //取得选择的中文名称
					}
					
			      }
			    });
			    
			  
			    if(settings.Lang=="en-US")
			    {
			    $input.val(ename); 
			    }else
			    {
			      $input.val(result);    //将选择的结果取出来放到文件框上
			    }

				$("#"+settings.value).val(sid);
				
				$("#"+settings.location_ename).val(ename);
				$("#"+settings.location_cname).val(cname);
				//$input.attr("title",sid);   //将选择的ID取出来放到文件框的属性title上
				//alert(sid);
				ms_html.remove();
				
			});

			$("#ms_bt_clear").click(function() {
				ms_html.remove();
				$input.val(""); 
				$("#"+settings.value).val("");
			});

			$("#ms_img_close").click(function() {
				ms_html.remove();
			});
			
			
		$("#allItems1 li").each(function(){
		    
		   var id= $(this).attr("abbr");
//alert($("#"+id).parent().html());
		        $("#"+id).click(function(){
		        /****************liukui update 兼容jQuery 1.6.1 版本以前 和1.6.1 版本*****************************/
		            var check =  $("#"+id).attr("checked");
		         // alert(check);
		            if(typeof(check) =="undefined")
		            {check='';
		           //设置选中子节点颜色
		               // $("#abc"+id).parent().parent().find("ol li").attr("style","background-color:#EBEBEB");
		            }
        		   
		    	        $("#subitem"+id).find("input[type=checkbox]").each(function(){
        		    	
		                    $(this).attr("checked",check);
            		      
		                });
		        /****************liukui update 兼容jQuery 1.6.1 版本以前 和1.6.1 版本*****************************/
		        });
		});
		
		$("#allItems1 .subitemCk input").each(function(){
		    var ischeck=  $("#"+ $(this).attr("pid")).attr("checked");
		   if(ischeck)
		   {
		   $(this).attr("checked",ischeck);
		   }
		   $(this).click(function(){
		      isck=$("#"+$(this).attr("pid")).attr("checked");
		       if(isck)
		       {
		         $(this).attr("checked",isck);
		         
		       }else
		       {
		            
		       }
		       
		   });
		   

		   
		});
		
		
			

		}
		
		function initContent() {

			var offset = $input.offset();
			var divtop = 1 + offset.top + document.getElementById($input.attr("id")).offsetHeight + 'px';
			var divleft = offset.left + 'px';
			var popmask = document.createElement('div');

			var html = [];	

			html.push('<div id="mulitSelector" style="display:block; top:'+divtop+';left:'+divleft+'; position: absolute; z-index: 1999;">');
			html.push('    <div id="pslayer"  class="alert_div sech_div ms_width">');
			html.push('        <div class="box">');
			html.push('            <h1><span id="psHeader">'+settings.title+'</span><A href="javascript:void(0);" class="butn3" id="ms_img_close"></A></h1>');
			html.push('			<div class="blk">');
			html.push('				<div id="divSelecting" class="sech_layt">');
			html.push('					<h3>');
			html.push('						<span id="selectingHeader"></span>');
			html.push('						<b style="float:left;"><label for="ckall"><input type="checkbox" onclick="checkAllBox(this)" id="ckall"  />'+settings.selectAll+'</label></b>');
			html.push('						<b class="btn_fst">');
			html.push('						<input id="ms_bt_ok" name="" type="button" value="'+settings.btnOk+'" />');
			html.push('						<input id="ms_bt_clear" name="" type="button" value="'+settings.btnClear+'" /></b>');
			html.push('					</h3>');
			html.push('				</div>');
			html.push('				<div class="sech_layb" style="padding-top:24px;"> ');
			html.push('					<h2 id="subHeader1"></h2>');
			html.push('					<ol id="allItems1">');
			
			var dataArray = settings.data;
			
			if (dataArray != null){
				var len = dataArray.length;
				for(var i=0; i<len; i++){
					var d = dataArray[i];
					
					var title=d.name;
					                    if(settings.Lang=="en-US")
					                    {
					                        title=d.ename;
					                    }
					                    var status = findStatus(title);
					html.push('						<li id=abc'+d.id+' name=100 class="nonelay"  abbr="'+d.id+'">');
					html.push('							<a href="###">');
					html.push('							<label class="itemCk"  style="font-weight:bold;" for="'+d.id+'">');
					html.push('							<input   id="'+d.id+'" type="checkbox" '+status+' value="'+(d.id+ '@'+ d.name+'@'+d.ename)+'" />'+title+'</label>');
					html.push('							</a>');
					
					
					
					         var temp = dataArray[i].events;
				                if(temp==undefined 	)
                				
				                {continue;
                				
				                }
            		
					            if(temp.length>0)
					            {
					            var pid=d.id;
					            html.push('					<ol id="subitem'+d.id+'" pid="'+d.id+'" class="itemli" >');
            					
					                for(var j=0;j<temp.length;j++)
					                {
					                    d = temp[j];
					                    
					                    var title=d.name;
					                    if(settings.Lang=="en-US")
					                    {
					                        title=d.ename;
					                    }
					                    var status = findStatus(title);
					                  
					            html.push('						<li id=abc'+d.id+' name=100 class="nonelay">');
					            html.push('							<a href="###">');
					            html.push('							<label  class="subitemCk" for="'+d.id+'">');
					            html.push('							<input pid="'+pid+'" id="'+d.id+'" type="checkbox" '+status+' value="'+(d.id+ '@'+ d.name+'@'+d.ename)+'" />'+title+'</label>');
					            html.push('							</a>');
					            html.push('						</li>');
            					
					                }
            					    
					                html.push('					</ol>');
					            }
					
				html.push('						</li>');
					
				}
			}

			html.push('					</ol>');
			html.push('				</div>');
			html.push('			</div>');
			html.push('		</div>');
			html.push('   </div>');
			html.push('</div>');

			ms_html = $(html.join("")).appendTo('body');

		}

		function findStatus(d){
			var content = $input.val();
			if (jQuery.trim(content) == ""){
				return "";
			}

			var obj = content.split("+");
			for(var i=0; i<obj.length; i++){
				if(obj[i] == d)
				{
					return "checked"
				}
			}

		}
		
		function FindCheckAll()
		{
		    var ischeck= true;
		    $("#allItems1 li").each(function(){
		    
		       var id= $(this).attr("abbr");
		       
		       if(id !=undefined)
		       {
		       
		      
		           if(!$("#"+id).attr("checked"))
		           {
    		        ischeck = false;
        		   
		           }
		       }
		   });
		   
		  
		   if(ischeck)
		   {
		   
		    $("#ckall").attr("checked",ischeck);
		   }
		  
		   
		}
       
		initialise();
	//alert(jQuery("#allItems1 li input:checked").length);
		 if(jQuery("#allItems1 li input:checked").length ==0 && index==0)
		 {
		
		    $("#ckall").click();
            $("#ms_bt_ok").click(); 
            index=1;
         }
	}
	
       
    
		//$("#ckall").click();
        //$("#ms_bt_ok").click(); 
       

})(jQuery);
