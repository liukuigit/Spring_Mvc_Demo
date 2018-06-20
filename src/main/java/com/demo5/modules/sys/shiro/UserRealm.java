package com.demo5.modules.sys.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import com.demo5.common.utils.spring.SysApplicationContext;
import com.demo5.modules.sys.entity.UserInfo;
import com.demo5.modules.sys.service.IUserService;
import com.demo5.modules.sys.service.impl.UserService;
import com.sun.tools.internal.xjc.reader.xmlschema.bindinfo.BIConversion.User;
/**
 * 获取身份认证相关信息
 * 
 * @author liukuigit
 *
 */
public class UserRealm extends AuthorizingRealm {

	@Autowired
	IUserService userService;
	
	
	/**
	 * 登陆成功后，获取授权信息
	 * @author liukuigit
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		
		
		 String username= (String)principals.getPrimaryPrincipal();
		 
		 SimpleAuthorizationInfo authorizationInfo= new SimpleAuthorizationInfo();
		 
		
		return authorizationInfo;
	}

	/**
	 * 登陆验证过程
	 * @author liukuigit
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

		String username = (String)token.getPrincipal();
		
		if(userService ==null){
			userService=(IUserService)SysApplicationContext.getBean("userService");
		}
		
		UserInfo user = userService.getByUserName(username);
		if(user ==null){
			throw new UnknownAccountException(); //未找到登陆账户
		}
		if(user.getStateid().intValue() ==2){
			throw new LockedAccountException();//账户已关闭
		}
		
		ByteSource byteSource = ByteSource.Util.bytes("");//不加盐
		
		SimpleAuthenticationInfo auth = new SimpleAuthenticationInfo(user.getUseraccount(),user.getPassword().toCharArray(),getName());
		System.out.println(String.format( "User: %s Pwd：%s",user.getUseraccount(),user.getPassword()));
		return auth;
	}

}
