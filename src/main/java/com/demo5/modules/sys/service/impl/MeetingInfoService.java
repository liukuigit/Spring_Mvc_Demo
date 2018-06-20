package com.demo5.modules.sys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo5.common.bean.Query;
import com.demo5.common.bean.QueryResult;
import com.demo5.modules.sys.entity.MeetingInfo;
import com.demo5.modules.sys.mapper.MeetingInfoMapper;
import com.demo5.modules.sys.service.IMeetingInfoService;

@Service
public class MeetingInfoService implements IMeetingInfoService {

	@Autowired
	private MeetingInfoMapper meetingMapper;
	
	@Override
	public QueryResult<MeetingInfo> getMeetingList(int page, int pageSize, MeetingInfo info) {

		Query query= new Query();
		query.setPageIndex(page);
		query.setPageSize(pageSize);
		query.setBean(info);
		
		QueryResult<MeetingInfo> queryResult = new QueryResult<MeetingInfo>();
		Long count = meetingMapper.getCount(query);
		List<MeetingInfo> list = meetingMapper.queryPages(query);
		// 总页数 和 取多少条
		queryResult.setPages(count, pageSize);
		queryResult.setItems(list);
		return queryResult;
		
	}

	@Override
	public int del(String id) {
		return  meetingMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(MeetingInfo info) {
		return meetingMapper.insert(info);
	}

	@Override
	public int update(MeetingInfo info) {
		return meetingMapper.updateByPrimaryKey(info);
	}

	@Override
	public MeetingInfo getModel(String id) {
		return meetingMapper.selectByPrimaryKey(id);
	}

}
