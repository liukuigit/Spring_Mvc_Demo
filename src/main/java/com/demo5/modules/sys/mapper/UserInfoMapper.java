package com.demo5.modules.sys.mapper;

import java.util.List;

import com.demo5.common.bean.Query;
import com.demo5.modules.sys.entity.UserInfo;

public interface UserInfoMapper {
	
	List<UserInfo> queryPages(Query query);
	
	Long getCount(Query query);
	
    int deleteByPrimaryKey(String userid);

    int insert(UserInfo record);

    int insertSelective(UserInfo record);

    UserInfo selectByPrimaryKey(String userid);
    
    UserInfo queryByUserAccount(String useraccount);

    int updateByPrimaryKeySelective(UserInfo record);

    int updateByPrimaryKey(UserInfo record);
}