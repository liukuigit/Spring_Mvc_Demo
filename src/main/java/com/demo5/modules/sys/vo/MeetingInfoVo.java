package com.demo5.modules.sys.vo;

import java.io.Serializable;
import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class MeetingInfoVo  implements Serializable {

    private String title;

    private String organizer;

    private String address;

    

    private Date starttime;

    private Date endtime;


    private String subtitle;


    private String meetingtype;


    private static final long serialVersionUID = 1L;

   

   

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

   
    
    public Date getStarttime() {
        return starttime;
    }
    
    public void setStarttime(Date starttime) {
        this.starttime = starttime;
    }
    
    public Date getEndtime() {
        return endtime;
    }
    
    public void setEndtime(Date endtime) {
        this.endtime = endtime;
    }

    
    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle == null ? null : subtitle.trim();
    }

    

    public String getMeetingtype() {
        return meetingtype;
    }

    public void setMeetingtype(String meetingtype) {
        this.meetingtype = meetingtype == null ? null : meetingtype.trim();
    }

}