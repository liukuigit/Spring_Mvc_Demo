package com.demo5.app;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo5.common.bean.QueryResult;
import com.demo5.common.bean.ResultBean;
import com.demo5.common.utils.json.JsonUtils;
import com.demo5.modules.sys.entity.MeetingInfo;
import com.demo5.modules.sys.service.IMeetingInfoService;
import com.demo5.modules.sys.vo.MeetingInfoVo;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.util.BeanUtil;


@RequestMapping(value="/meeting")
@Controller
public class MeetingController {

	@Autowired
	IMeetingInfoService meetingService;
	
	@ResponseBody
	@RequestMapping(value="/getList")
	public ResultBean getList(int pageNumber,int pageSize,  MeetingInfoVo info){
		ResultBean bean = new ResultBean();
		
		MeetingInfo info2 = new MeetingInfo();
		BeanUtils.copyProperties(info,info2);
		System.out.println(String.format("pageNumber:%s pageSize:%s, info:%s", Integer.toString(pageNumber),Integer.toString(pageSize) , JsonUtils.toJsonString(info2)));
		
		QueryResult<MeetingInfo> result =meetingService.getMeetingList(pageNumber, pageSize, info2);
		bean.setData(result);
		return bean;
		
	}
	
	@ResponseBody
	@RequestMapping(value="getModel")
	public ResultBean getMeetingItem(String ID )
	{
			ResultBean bean = new ResultBean();
			
			MeetingInfo m= meetingService.getModel(ID);
			bean.setData(m);
			return bean;
		
	}
	
	@ResponseBody
	@RequestMapping(value="del")
	public ResultBean delMeeting(String ID)
	{
			ResultBean bean = new ResultBean();
			int i =meetingService.del(ID);
			bean.setSuccess(i>0);
			return bean;
	}
}
