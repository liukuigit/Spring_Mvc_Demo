package com.demo5.modules.sys.service;

import com.demo5.modules.sys.entity.RoleInfo;

public interface IRoleInfoService {

	int del(Integer roleid);

    int insert(RoleInfo record);

    RoleInfo get(Integer roleid);

    int update(RoleInfo record);

}
