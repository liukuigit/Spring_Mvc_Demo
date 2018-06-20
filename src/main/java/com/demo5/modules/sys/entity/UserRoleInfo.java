package com.demo5.modules.sys.entity;

import java.io.Serializable;

public class UserRoleInfo implements Serializable {
    private String useraccount;

    private Integer roleid;

    private String rolename;

    private static final long serialVersionUID = 1L;

    public String getUseraccount() {
        return useraccount;
    }

    public void setUseraccount(String useraccount) {
        this.useraccount = useraccount == null ? null : useraccount.trim();
    }

    public Integer getRoleid() {
        return roleid;
    }

    public void setRoleid(Integer roleid) {
        this.roleid = roleid;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename == null ? null : rolename.trim();
    }
}