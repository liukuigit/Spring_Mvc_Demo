
/*
 
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
		������ѡ����ʽ������ʱ��ҳ���з��� <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
  

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
			title: "��ѡ�����",
			selectAll:"ȫѡ",
			btnOk:"ȷ��",
			btnClear:"���",
			data: null,
			value:"",
			location_ename:"",
			location_cname:"",
			Lang:"zh-cn",  //���� ����(zh-cn/en-US)����
			firstInit:0    //��һ�ε���Ƿ�չ��ѡ���� 0��չ�� 1չ��
			
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
				var objall = $("#allItems1 .itemCk");   //ȡ��ѡ��֮��Ķ���
				
			var obj=$(objall).find("input:checked");
			
				
				
				for(var i=0; i<obj.length; i++)
				{
			
					result += (i==0?"":"+")+obj[i].value.split("@")[1];  //ȡ��ѡ������ּ���
					 sid += (i==0?"":"+")+obj[i].value.split("@")[0];  //ȡ��ѡ���ID����
					 
					 ename+= (i==0?"":"+")+obj[i].value.split("@")[2];  //ȡ��ѡ���Ӣ������
					 cname+= (i==0?"":"+")+obj[i].value.split("@")[1];  //ȡ��ѡ�����������
					 
					 
					var temp = $("#abc"+$(obj[i]).attr("id")).find("ol input:checked");
			//alert(temp.length);
					for(var j=0;j<temp.length;j++)
					{

					    sid += "+"+temp[j].value.split("@")[0];  //ȡ��ѡ���ID����
					}
					
					
			    }
			    
			    
			    $(objall).find("input").each(function(){
			      if(  !$(this).attr("checked") )
			      {
			          var temp = $("#abc"+$(this).attr("id")).find("ol input:checked");
			          
			          for(var i=0;i<temp.length;i++)
					{
					
					  result += (result.length==0?"":"+")+temp[i].value.split("@")[1];  //ȡ��ѡ������ּ���
					  sid += (sid.length==0?"":"+")+temp[i].value.split("@")[0];  //ȡ��ѡ���ID����
					  ename+= (ename.length==0?"":"+")+temp[i].value.split("@")[2];  //ȡ��ѡ���Ӣ������ 
					  cname+= (cname.length==0?"":"+")+temp[i].value.split("@")[1];  //ȡ��ѡ�����������
					}
					
			      }
			    });
			    
			  
			    if(settings.Lang=="en-US")
			    {
			    $input.val(ename); 
			    }else
			    {
			      $input.val(result);    //��ѡ��Ľ��ȡ�����ŵ��ļ�����
			    }

				$("#"+settings.value).val(sid);
				
				$("#"+settings.location_ename).val(ename);
				$("#"+settings.location_cname).val(cname);
				//$input.attr("title",sid);   //��ѡ���IDȡ�����ŵ��ļ��������title��
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
		        /****************liukui update ����jQuery 1.6.1 �汾��ǰ ��1.6.1 �汾*****************************/
		            var check =  $("#"+id).attr("checked");
		         // alert(check);
		            if(typeof(check) =="undefined")
		            {check='';
		           //����ѡ���ӽڵ���ɫ
		               // $("#abc"+id).parent().parent().find("ol li").attr("style","background-color:#EBEBEB");
		            }
        		   
		    	        $("#subitem"+id).find("input[type=checkbox]").each(function(){
        		    	
		                    $(this).attr("checked",check);
            		      
		                });
		        /****************liukui update ����jQuery 1.6.1 �汾��ǰ ��1.6.1 �汾*****************************/
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
