package com.demo5.modules.sys.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.demo5.common.bean.QueryResult;
import com.demo5.modules.sys.entity.MeetingInfo;

public interface IMeetingInfoService {
	
	QueryResult<MeetingInfo> getMeetingList(int page,int pageSize,MeetingInfo info);
	
	int del(String id);
	
	int insert(MeetingInfo info);
	
	
	int update(MeetingInfo info);
	
	MeetingInfo getModel(@Param("id") String id);
}
