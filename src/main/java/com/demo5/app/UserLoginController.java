package com.demo5.app;

import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo5.common.bean.ResultBean;
import com.demo5.common.exception.CaptchaErrorException;
import com.demo5.common.exception.MessageCode;
import com.demo5.common.utils.IpUtil;
import com.demo5.modules.sys.bean.UserLoginBean;
import com.demo5.modules.sys.entity.UserInfo;
import com.demo5.modules.sys.service.IUserService;
import com.demo5.modules.sys.shiro.TokenBuild;

@Controller
public class UserLoginController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	IUserService userService;
	
	@ResponseBody
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResultBean login(HttpServletRequest request, HttpServletResponse response, UserLoginBean loginUser) {
		//logger.info("Welcome home! The client locale is {}.", model.getUserName());
		ResultBean rb = new ResultBean();
		
		if(loginUser ==null || StringUtils.isBlank(loginUser.getUserName()) || StringUtils.isBlank(loginUser.getPassword()))
		{
			rb = new ResultBean(false, MessageCode.PLASS_LOGIN, "请登陆系统", "");
			return rb;
		}
		
		// 验证码处理
//				ResultBean rbBean = capthchaProcess(request, loginUser.getUserName(), loginUser.getCaptcha());
//				if (rbBean != null) {
//					return rbBean;
//				}

				boolean rememberMe = WebUtils.isTrue(request, FormAuthenticationFilter.DEFAULT_REMEMBER_ME_PARAM);
				// String host = request.getRemoteHost(); //主机名
				String host = IpUtil.getRemoteIp(request);
				try {
					// return new SimpleAuthenticationInfo(new Principal(user,
					// token.isMobileLogin()),
					// user.getPassword().substring(16), ByteSource.Util.bytes(salt),
					// getName());

					// 构造登陆令牌环
					TokenBuild token = new TokenBuild(loginUser.getUserName(), loginUser.getPassword().toCharArray(),
							rememberMe, host);

					// 发出登陆请求
					Subject sbuject = SecurityUtils.getSubject();
					sbuject.login(token);

					// 登陆成功
					// HttpSession session = request.getSession(true);
					try {
						UserInfo user = userService.getByUserName(loginUser.getUserName());
						rb.setData(user);
					} catch (Exception e) {
						logger.error(e.getMessage(), e);
						throw new Exception(e);
					}

				} catch (UnknownAccountException e) {
					rb = new ResultBean(false, MessageCode.SYS_NO_USER, "账号不存在!", "");
				} catch (IncorrectCredentialsException e) {
					rb = new ResultBean(false, MessageCode.SYS_NO_USER_AND_PASSWORD, "用户或密码错误", "");
				} catch (CaptchaErrorException e) {
					rb = new ResultBean(false, MessageCode.PLASS_CAPTCHA, " 请输入验证码", "");
				} catch (ExcessiveAttemptsException e) {
					rb = new ResultBean(false, MessageCode.SYS_LOG_IN_TOO_MANY, "账户错误次数过多,暂时禁止登录!", "");
				} catch (Exception e) {
					rb = new ResultBean(false, MessageCode.SYS_ERROR, "系统异常!");
				}
				return rb;
	
	}
	
	
	/**
	 * 跳转登陆页
	 * 
	 * @param request
	 * @param req
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping(value = "loginPage") // , method=RequestMethod.POST
	public void loginPage(HttpServletRequest request, HttpServletResponse response) throws IOException {
	

		// 获取用户信息 好像没必要 null?
		Subject sbuject = SecurityUtils.getSubject();
		Object principal = sbuject.getPrincipal();
		
		response.sendRedirect(request.getContextPath() + "/views/login.html");

	}
}
