package com.demo5.modules.sys.mapper;

import java.util.List;

import com.demo5.modules.sys.entity.UserRoleInfo;

public interface UserRoleInfoMapper {
    int insert(UserRoleInfo record);

    int insertSelective(UserRoleInfo record);
    
    int deleteByUserAccount(String useraccouont);
    
    List<UserRoleInfo> selectByUserAccount(String useraccount);
}