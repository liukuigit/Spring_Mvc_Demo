package com.demo5.common.exception;

import org.apache.shiro.authc.ExcessiveAttemptsException;
/**
 * 验证码异常
 * @author liukuigit
 *
 */
public class CaptchaErrorException extends ExcessiveAttemptsException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Creates a new CaptchaErrorException.
	 */
	public CaptchaErrorException() {
		super();
	}

	/**
	 * Constructs a new CaptchaErrorException.
	 *
	 * @param message
	 *            the reason for the exception
	 */
	public CaptchaErrorException(String message) {
		super(message);
	}

	public CaptchaErrorException(Throwable cause) {
		super(cause);
	}

	public CaptchaErrorException(String message, Throwable cause) {
		super(message, cause);
	}
}
