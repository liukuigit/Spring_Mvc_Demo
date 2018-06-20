package com.demo5.modules.sys.entity;

import java.io.Serializable;
import java.util.Date;

import com.demo5.common.utils.date.DateSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class UserInfo implements Serializable {
    private String userid;

    private String useraccount;

    private String password;

    private String username;

    private String photo;

    private String deptname;

    private String securityclassification;

    private String mobile;

    private String email;

    private Integer stateid;

    private String statename;

    private Date createdtime;

    private String createdby;

    private Date lastupdatedtime;

    private String lastupdatedby;

    private String mstatus;

    private Date lastlogin;

    private static final long serialVersionUID = 1L;

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid == null ? null : userid.trim();
    }

    public String getUseraccount() {
        return useraccount;
    }

    public void setUseraccount(String useraccount) {
        this.useraccount = useraccount == null ? null : useraccount.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo == null ? null : photo.trim();
    }

    public String getDeptname() {
        return deptname;
    }

    public void setDeptname(String deptname) {
        this.deptname = deptname == null ? null : deptname.trim();
    }

    public String getSecurityclassification() {
        return securityclassification;
    }

    public void setSecurityclassification(String securityclassification) {
        this.securityclassification = securityclassification == null ? null : securityclassification.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public Integer getStateid() {
        return stateid;
    }

    public void setStateid(Integer stateid) {
        this.stateid = stateid;
    }

    public String getStatename() {
        return statename;
    }

    public void setStatename(String statename) {
        this.statename = statename == null ? null : statename.trim();
    }
    @JsonSerialize(using=DateSerializer.class)
    public Date getCreatedtime() {
        return createdtime;
    }

    public void setCreatedtime(Date createdtime) {
        this.createdtime = createdtime;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby == null ? null : createdby.trim();
    }
    @JsonSerialize(using=DateSerializer.class)
    public Date getLastupdatedtime() {
        return lastupdatedtime;
    }

    public void setLastupdatedtime(Date lastupdatedtime) {
        this.lastupdatedtime = lastupdatedtime;
    }

    public String getLastupdatedby() {
        return lastupdatedby;
    }

    public void setLastupdatedby(String lastupdatedby) {
        this.lastupdatedby = lastupdatedby == null ? null : lastupdatedby.trim();
    }

    public String getMstatus() {
        return mstatus;
    }

    public void setMstatus(String mstatus) {
        this.mstatus = mstatus == null ? null : mstatus.trim();
    }
    @JsonSerialize(using=DateSerializer.class)
    public Date getLastlogin() {
        return lastlogin;
    }

    public void setLastlogin(Date lastlogin) {
        this.lastlogin = lastlogin;
    }
}