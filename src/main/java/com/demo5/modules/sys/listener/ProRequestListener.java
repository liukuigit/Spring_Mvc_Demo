package com.demo5.modules.sys.listener;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.http.HttpServletRequest;

/**
 * 
 * 用于监听请求
 * @author liukuigit
 * 
 */
public class ProRequestListener implements ServletRequestListener {

	@Override
	public void requestDestroyed(ServletRequestEvent sre) {
		// TODO Auto-generated method stub
		HttpServletRequest httpServletRequest = (HttpServletRequest) sre
				.getServletRequest();
		System.out.println("ProRequestListener>requestDestroyed>"
				+ httpServletRequest.getRequestURI());
	}

	@Override
	public void requestInitialized(ServletRequestEvent sre) {
		// TODO Auto-generated method stub
		HttpServletRequest httpServletRequest = (HttpServletRequest) sre
				.getServletRequest();
		System.out.println("ProRequestListener>requestInitialized>"
				+ httpServletRequest.getRequestURI());
	}

}
