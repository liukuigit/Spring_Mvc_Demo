package com.demo5.modules.sys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo5.common.bean.Query;
import com.demo5.common.bean.QueryResult;
import com.demo5.modules.sys.entity.MeetingInfo;
import com.demo5.modules.sys.entity.UserInfo;
import com.demo5.modules.sys.mapper.UserInfoMapper;
import com.demo5.modules.sys.service.IUserService;

@Service
public class UserService implements IUserService {

	@Autowired
	private UserInfoMapper userMapper;
	
	
	
	@Override
	public QueryResult<UserInfo> getUserList(int page, int pageSize, UserInfo user) {
		
		Query query= new Query();
		query.setPageIndex(page);
		query.setPageSize(pageSize);
		query.setBean(user);
		
		QueryResult<UserInfo> queryResult = new QueryResult<UserInfo>();
		Long count = userMapper.getCount(query);
		List<UserInfo> list = userMapper.queryPages(query);
		// 总页数 和 取多少条
		queryResult.setPages(count, pageSize);
		queryResult.setItems(list);
		return queryResult;
	}

	@Override
	public int del(String id) {
		
		return userMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(UserInfo user) {

		return userMapper.insertSelective(user);
	}

	@Override
	public int update(UserInfo user) {
		
		return userMapper.updateByPrimaryKeySelective(user);
	}

	@Override
	public UserInfo get(String id) {
		
		return userMapper.selectByPrimaryKey(id);
	}

	@Override
	public UserInfo getByUserName(String useraccount) {
		return userMapper.queryByUserAccount(useraccount);
	}

}
