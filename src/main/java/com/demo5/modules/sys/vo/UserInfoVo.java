package com.demo5.modules.sys.vo;

import java.util.HashMap;
import java.util.List;

import com.demo5.modules.sys.entity.UserInfo;
import com.demo5.modules.sys.entity.UserRoleInfo;

public class UserInfoVo extends UserInfo {

	private List<UserRoleInfo> userRoleList;

	public List<UserRoleInfo> getUserRoleList() {
		return userRoleList;
	}

	public void setUserRoleList(List<UserRoleInfo> userRoleList) {
		this.userRoleList = userRoleList;
	}
	
	
	private  HashMap<String,Object> others;

	public HashMap<String, Object> getOthers() {
		if(others ==null){
			others = new HashMap<String, Object>();
		}
		return others;
	}

	public void setOthers(HashMap<String, Object> others) {
		this.others = others;
	}
	
	
	
	
}
