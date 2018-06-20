package com.demo5.app;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo5.common.bean.QueryResult;
import com.demo5.common.bean.ResultBean;
import com.demo5.common.utils.json.JsonUtils;
import com.demo5.modules.sys.entity.UserInfo;
import com.demo5.modules.sys.entity.UserRoleInfo;
import com.demo5.modules.sys.service.IUserRoleService;
import com.demo5.modules.sys.service.IUserService;
import com.demo5.modules.sys.vo.UserInfoVo;


@RequestMapping(value="/userinfo")
@Controller
public class UserController {

	@Autowired
	IUserService userService;
	
	@Autowired
	IUserRoleService userRoleService;
	
	@ResponseBody
	@RequestMapping(value="getList")
	public ResultBean getUserList(int pageNumber,int pageSize, UserInfo user){
		
		ResultBean rb= new ResultBean();
		
System.out.println(String.format("pageNumber:%s pageSize:%s, info:%s", Integer.toString(pageNumber),Integer.toString(pageSize) , JsonUtils.toJsonString(user)));
		
		QueryResult<UserInfo> result =userService.getUserList(pageNumber, pageSize, user);
		rb.setData(result);
		return rb;
	}
	
	@ResponseBody
	@RequestMapping(value="getModel")
	public ResultBean getUser(String UserID)
	{
		ResultBean rb= new ResultBean();
		UserInfo user= userService.get(UserID);
		UserInfoVo userVo=new UserInfoVo();
		if(user !=null)
		{
			BeanUtils.copyProperties(user,userVo);
		 	List<UserRoleInfo> roleList= userRoleService.get(user.getUseraccount());
		 	userVo.setUserRoleList(roleList);
		 	if(roleList !=null && roleList.size()>0){
		 		 StringBuilder roleName = new StringBuilder();
		 		 for (UserRoleInfo m : roleList) {
		 			roleName.append(String.format("%s ",m.getRolename()));
				}
		 		
		 		 userVo.getOthers().put("roleName", roleName.toString().trim().replace(" ", ","));
		 	}
		
		}
		rb.setData(userVo);
		return rb;
	}
	
}
