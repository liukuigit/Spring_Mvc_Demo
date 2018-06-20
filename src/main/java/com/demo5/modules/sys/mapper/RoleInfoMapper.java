package com.demo5.modules.sys.mapper;

import com.demo5.modules.sys.entity.RoleInfo;

public interface RoleInfoMapper {
    int deleteByPrimaryKey(Integer roleid);

    int insert(RoleInfo record);

    int insertSelective(RoleInfo record);

    RoleInfo selectByPrimaryKey(Integer roleid);

    int updateByPrimaryKeySelective(RoleInfo record);

    int updateByPrimaryKey(RoleInfo record);
}