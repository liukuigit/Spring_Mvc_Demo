
/*
   2010-02-26 �����Ắ �޸�  Email:ooofcu@hotmail.com
   ������Asp.Net���õķ���
   ���÷���:
        function test1(){

			var data = 
			[
				{id: "10",name: "ƻ��"},
				{id: "20",name: "�㽶"},
				{id: "30",name: "����"},
				{id: "40",name: "����"},
				{id: "50",name: "����"}
			];

			$("#test1").mulitselector({
				title:"��ѡ�����-�Զ������",
				data:data
			});
			//alert(document.getElementById("bd").innerHTML);
		}
		
 * ԭ��blog����: http://llhdf.javaeye.com
 */
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
			title: "��ѡ�����",
			data: null,
			value:"",
			clear:"",
			ok:"",
			all:"",
			width:436,
			height:220,
			ShowRegion:'bottom' //bottom|top;
			
		};
		

		if (options){
			jQuery.extend(settings, options);
		}

		function initialise(){
			initContent();
			initEvent();
		}

		function initEvent() {

			$("#ms_bt_ok").click(function() {
				var result = "";
				var sid = "";
				var objall = $("#allItems1");   //ȡ��ѡ��֮��Ķ���
				
			var obj=$(objall).find("input:checked");
			
				
				
				for(var i=0; i<obj.length; i++)
				{
			
					result += (i==0?"":"+")+obj[i].value.split("@")[1];  //ȡ��ѡ������ּ���
					 sid += (i==0?"":"+")+obj[i].value.split("@")[0];  //ȡ��ѡ���ID����
					var temp = $("#abc"+$(obj[i]).attr("id")).find("ol input:checked");
			//alert(temp.length);
					for(var j=0;j<temp.length;j++)
					{

					    sid += "+"+temp[j].value.split("@")[0];  //ȡ��ѡ���ID����
					}
					
					
			    }
			    
			    
//			    $(objall).find("input").each(function(){
////			      if(  !$(this).attr("checked") )
////			      {
//			          var temp = $("#abc"+$(this).attr("id")).find("ol input:checked");
//			          
//			          for(var i=0;i<temp.length;i++)
//					{
//					
//					  result += (result.length==0?"":"+")+temp[i].value.split("@")[1];  //ȡ��ѡ������ּ���
//					  sid += (sid.length==0?"":"+")+temp[i].value.split("@")[0];  //ȡ��ѡ���ID����
//					}
////			      }
//			    });
			    
			    
				$input.val(result);    //��ѡ��Ľ��ȡ�����ŵ��ļ�����
				
				$("#"+settings.value).val(sid);
				$input.attr("title",result);   //��ѡ���IDȡ�����ŵ��ļ��������title��
				$("#aspTest1").val(sid);    //��Asp.Netҳ�涨��һ����ʱ�ı�����������ЩID �������޸�
				
				ms_html.remove();
			});

			$("#ms_bt_clear").click(function() {
				ms_html.remove();
				$input.val(""); 
			});

			$("#ms_img_close").click(function() {
				ms_html.remove();
			});
			$(document).click(function(){
              ms_html.remove();
            });
			$('#mulitSelector').click(function(e) {
              e.stopPropagation();
            });
		$("#allItems1 li").each(function(){
		    
		   var id= $(this).attr("abbr");

		        $("#"+id).click(function(){
		            var check =  $("#"+id).attr("checked");
        		   
		    	        $("#subitem"+id).find("input[type=checkbox]").each(function(){
        		    	 
		                    $(this).attr("checked",check);
            		      

		                });
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
			
			        if(settings.ShowRegion =="top")
			    {
			    divtop=(offset.top - document.getElementById($input.attr("id")).offsetHeight-settings.height-12)+ 'px';
			    
			    }
		
			
			var popmask = document.createElement('div');
			var html = [];	

			html.push('<div id="mulitSelector" style="display:block; top:'+divtop+';left:'+divleft+'; position: absolute; z-index: 1999;">');
			html.push('    <div id="pslayer"  class="alert_div sech_div ms_width" style="width:'+(settings.width+4)+'px;">');
			html.push('        <div class="box">');
			html.push('            <h1><span id="psHeader">'+settings.title+'</span><A href="javascript:void(0);" class="butn3" id="ms_img_close"></A></h1>');
			html.push('			<div class="blk">');
			html.push('			<div  style="max-height:'+settings.height+'px;overflow-y:scroll;overflow-x:hidden;width:'+settings.width+'px;border:2px solid #8cb2d6;">');
			html.push('				<div id="divSelecting" style="height:0px">');
			html.push('					<h3>');
			html.push('						<span id="selectingHeader"></span>');
			html.push('						<b style="float:left;"><label for="ckall"><input type="checkbox" onclick="checkAllBox(this)" id="ckall"/>'+settings.all+'</label></b>');
			html.push('						<b class="btn_fst">');
			html.push('						<input id="ms_bt_ok" name="" type="button" value="'+settings.ok+'" />');
			html.push('						<input id="ms_bt_clear" name="" type="button" value="'+settings.clear+'" /></b>');
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
					var status = findStatus(d.name);
					html.push('						<li id=abc'+d.id+' name=100 class=""  abbr="'+d.id+'" style="width:100%;">');
					html.push('							<label class=""  style="font-weight:bold;">');
					html.push('							'+d.name+'</label>');
					
					
					
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
					                    var status = findStatus(temp[j].name);
					                    
					                  
					            html.push('						<li id=abc'+d.id+' name=100 class="nonelay">');
					            html.push('							<a href="###">');
					            html.push('							<label  class="subitemCk" for="'+d.id+'">');
					            html.push('							<input pid="'+pid+'" id="'+d.id+'" type="checkbox" '+status+' value="'+(d.id+ '@'+ d.name)+'" />'+d.name+'</label>');
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

		initialise();

	}



})(jQuery);
