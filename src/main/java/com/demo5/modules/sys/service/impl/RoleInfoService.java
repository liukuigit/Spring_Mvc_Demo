package com.demo5.modules.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.demo5.modules.sys.entity.RoleInfo;
import com.demo5.modules.sys.mapper.RoleInfoMapper;
import com.demo5.modules.sys.service.IRoleInfoService;

public class RoleInfoService implements IRoleInfoService {

	@Autowired
	RoleInfoMapper roleInfoMapper;
	
	@Override
	public int del(Integer roleid) {
		// TODO Auto-generated method stub
		return roleInfoMapper.deleteByPrimaryKey(roleid);
	}

	@Override
	public int insert(RoleInfo record) {
		// TODO Auto-generated method stub
		return roleInfoMapper.insertSelective(record);
	}

	@Override
	public RoleInfo get(Integer roleid) {
		// TODO Auto-generated method stub
		return roleInfoMapper.selectByPrimaryKey(roleid);
	}

	@Override
	public int update(RoleInfo record) {
		// TODO Auto-generated method stub
		return roleInfoMapper.updateByPrimaryKeySelective(record);
	}

}
