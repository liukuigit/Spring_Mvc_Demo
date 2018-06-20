package com.demo5.common.utils.converter;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * 处理Controller 返回json对象时把NULL数据处理成空字符串
 * @author liukuigit
 *
 */
public class ResponseNullUtil extends ObjectMapper {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ResponseNullUtil(){
		
		this.getSerializerProvider().setNullValueSerializer(new JsonSerializer<Object>(){

			@Override
			public void serialize(Object arg0, JsonGenerator arg1, SerializerProvider arg2)
					throws IOException, JsonProcessingException {
				// TODO Auto-generated method stub
				arg1.writeString("");
			}
				
			
		});
	}

}
