package com.demo5.modules.sys.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import com.demo5.common.utils.date.DateSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class MeetingInfo implements Serializable {
    private String id;

    private String meetingpassword;

    private String title;

    private String organizer;

    private String address;

    private String logourl;

    private Date starttime;

    private Date endtime;

    private BigDecimal meetingdays;

    private String meetingdocurl;

    private String securityclassification;

    private Date createdtime;

    private String createdby;

    private Date lastupdatedtime;

    private String lastupdatedby;

    private String mstatus;

    private String subtitle;

    private String defaultnotion;

    private String meetingtype;

    private Boolean iscurrent;

    private static final long serialVersionUID = 1L;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getMeetingpassword() {
        return meetingpassword;
    }

    public void setMeetingpassword(String meetingpassword) {
        this.meetingpassword = meetingpassword == null ? null : meetingpassword.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getOrganizer() {
        return organizer;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer == null ? null : organizer.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getLogourl() {
        return logourl;
    }

    public void setLogourl(String logourl) {
        this.logourl = logourl == null ? null : logourl.trim();
    }
    @JsonSerialize(using=DateSerializer.class)
    public Date getStarttime() {
        return starttime;
    }

    public void setStarttime(Date starttime) {
        this.starttime = starttime;
    }
    @JsonSerialize(using=DateSerializer.class)
    public Date getEndtime() {
        return endtime;
    }
    @JsonSerialize(using=DateSerializer.class)
    public void setEndtime(Date endtime) {
        this.endtime = endtime;
    }

    public BigDecimal getMeetingdays() {
        return meetingdays;
    }

    public void setMeetingdays(BigDecimal meetingdays) {
        this.meetingdays = meetingdays;
    }

    public String getMeetingdocurl() {
        return meetingdocurl;
    }

    public void setMeetingdocurl(String meetingdocurl) {
        this.meetingdocurl = meetingdocurl == null ? null : meetingdocurl.trim();
    }

    public String getSecurityclassification() {
        return securityclassification;
    }

    public void setSecurityclassification(String securityclassification) {
        this.securityclassification = securityclassification == null ? null : securityclassification.trim();
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

    public Date getLastupdatedtime() {
        return lastupdatedtime;
    }
    @JsonSerialize(using=DateSerializer.class)
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

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle == null ? null : subtitle.trim();
    }

    public String getDefaultnotion() {
        return defaultnotion;
    }

    public void setDefaultnotion(String defaultnotion) {
        this.defaultnotion = defaultnotion == null ? null : defaultnotion.trim();
    }

    public String getMeetingtype() {
        return meetingtype;
    }

    public void setMeetingtype(String meetingtype) {
        this.meetingtype = meetingtype == null ? null : meetingtype.trim();
    }

    public Boolean getIscurrent() {
        return iscurrent;
    }

    public void setIscurrent(Boolean iscurrent) {
        this.iscurrent = iscurrent;
    }
}