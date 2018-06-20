package com.demo5.modules.sys.mapper;

import java.util.List;

import com.demo5.common.bean.Query;
import com.demo5.modules.sys.entity.MeetingInfo;

public interface MeetingInfoMapper {
    int deleteByPrimaryKey(String id);

    int insert(MeetingInfo record);

    int insertSelective(MeetingInfo record);

    MeetingInfo selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(MeetingInfo record);

    int updateByPrimaryKey(MeetingInfo record);
    
    List<MeetingInfo> queryPages(Query query);
	
	Long getCount(Query query);
}