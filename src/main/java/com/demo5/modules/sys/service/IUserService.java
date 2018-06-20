package com.demo5.modules.sys.service;

import org.apache.ibatis.annotations.Param;

import com.demo5.common.bean.QueryResult;
import com.demo5.modules.sys.entity.UserInfo;

public interface IUserService {

	QueryResult<UserInfo> getUserList(int page,int pageSize,UserInfo user);
	
	int del(String id);
	
	int insert(UserInfo user);
	
	
	int update(UserInfo user);
	
	UserInfo get(@Param("id") String id);
	
	UserInfo getByUserName(String useraccount);
}
