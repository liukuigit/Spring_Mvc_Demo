package com.demo5.modules.sys.entity;

import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.demo5.common.utils.date.DateSerializer;
public class MeetingInfo_old {

	private String id;
	
	private String meetingPassword;
	
	private String title;
	
	private String organizer;
	
	private String address;
	
	private String logoUrl;
	
	
	private Date startTime;
	
	
	private Date endTime;
	
	private Float meetingDays;
	
	private String meetingDocUrl;
	
	private String securityClassification;
	
	private Date createdTime;
	
	private String createdBy;
	
	private Date lastUpdatedTime;
	
	private String lastUpdatedBy;
	
	private String mstatus;
	
	private String subTitle;
	
	private String defaultNotion;
	
	private String meetingType;
	
	private Boolean isCurrent;

	public String getId() {
		return id;
	}

	public String getMeetingPassword() {
		return meetingPassword;
	}

	public String getTitle() {
		return title;
	}

	public String getOrganizer() {
		return organizer;
	}

	public String getAddress() {
		return address;
	}

	public String getLogoUrl() {
		return logoUrl;
	}
	@JsonSerialize(using=DateSerializer.class)
	public Date getStartTime() {
		return startTime;
	}
	@JsonSerialize(using=DateSerializer.class)
	public Date getEndTime() {
		return endTime;
	}

	public Float getMeetingDays() {
		return meetingDays;
	}

	public String getMeetingDocUrl() {
		return meetingDocUrl;
	}

	public String getSecurityClassification() {
		return securityClassification;
	}
	@JsonSerialize(using=DateSerializer.class)
	public Date getCreatedTime() {
		return createdTime;
	}

	public String getCreatedBy() {
		
		return createdBy;
	}
	@JsonSerialize(using=DateSerializer.class)
	public Date getLastUpdatedTime() {
		return lastUpdatedTime;
	}

	public String getLastUpdatedBy() {
		return lastUpdatedBy;
	}

	public String getMstatus() {
		return mstatus;
	}

	public String getSubTitle() {
		return subTitle;
	}

	public String getDefaultNotion() {
		return defaultNotion;
	}

	public String getMeetingType() {
		return meetingType;
	}

	public Boolean getIsCurrent() {
		return isCurrent;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setMeetingPassword(String meetingPassword) {
		this.meetingPassword = meetingPassword;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setOrganizer(String organizer) {
		this.organizer = organizer;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public void setMeetingDays(Float meetingDays) {
		this.meetingDays = meetingDays;
	}

	public void setMeetingDocUrl(String meetingDocUrl) {
		this.meetingDocUrl = meetingDocUrl;
	}

	public void setSecurityClassification(String securityClassification) {
		this.securityClassification = securityClassification;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public void setLastUpdatedTime(Date lastUpdatedTime) {
		this.lastUpdatedTime = lastUpdatedTime;
	}

	public void setLastUpdatedBy(String lastUpdatedBy) {
		this.lastUpdatedBy = lastUpdatedBy;
	}

	public void setMstatus(String mstatus) {
		this.mstatus = mstatus;
	}

	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}

	public void setDefaultNotion(String defaultNotion) {
		this.defaultNotion = defaultNotion;
	}

	public void setMeetingType(String meetingType) {
		this.meetingType = meetingType;
	}

	public void setIsCurrent(Boolean isCurrent) {
		this.isCurrent = isCurrent;
	}
	
}
