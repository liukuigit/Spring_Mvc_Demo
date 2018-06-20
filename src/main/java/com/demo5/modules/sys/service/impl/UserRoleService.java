package com.demo5.modules.sys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo5.modules.sys.entity.UserRoleInfo;
import com.demo5.modules.sys.mapper.UserRoleInfoMapper;
import com.demo5.modules.sys.service.IUserRoleService;

@Service
public class UserRoleService implements IUserRoleService {

	@Autowired
	UserRoleInfoMapper userRoleInfoMapper;
	
	@Override
	public int insert(UserRoleInfo record) {
		// TODO Auto-generated method stub
		return userRoleInfoMapper.insert(record);
	}

	@Override
	public int deleteByUserAccount(String useraccouont) {
		// TODO Auto-generated method stub
		return userRoleInfoMapper.deleteByUserAccount(useraccouont);
	}

	@Override
	public List<UserRoleInfo> get(String useraccount) {
		// TODO Auto-generated method stub
		return userRoleInfoMapper.selectByUserAccount(useraccount);
	}

}
