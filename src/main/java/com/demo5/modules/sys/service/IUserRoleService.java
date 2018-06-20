package com.demo5.modules.sys.service;

import java.util.List;

import com.demo5.modules.sys.entity.UserRoleInfo;

public interface IUserRoleService {

	int insert(UserRoleInfo record);

	int deleteByUserAccount(String useraccouont);
	
    List<UserRoleInfo> get(String useraccount);
}
