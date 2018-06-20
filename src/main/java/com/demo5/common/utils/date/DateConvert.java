package com.demo5.common.utils.date;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;





public class DateConvert implements Converter<String, Date> {

    @Override
    public Date convert(String stringDate) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
        	if(stringDate !=null && !"".equals(stringDate))
        	{
        		return simpleDateFormat.parse(stringDate);
        	}else
        	{
        		return null;
        	}
            
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

	

}