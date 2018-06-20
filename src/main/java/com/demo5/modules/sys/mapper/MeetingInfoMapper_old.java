package com.demo5.modules.sys.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.demo5.common.bean.Query;
import com.demo5.modules.sys.entity.MeetingInfo;

public interface MeetingInfoMapper_old {

	
	List<MeetingInfo> queryPages(Query query);
	
	Long getCount(Query query);
	
	int del(String id);
	
	int insert(MeetingInfo info);
	
	
	int update(MeetingInfo info);
	
	MeetingInfo get(@Param("id") String id);
}
