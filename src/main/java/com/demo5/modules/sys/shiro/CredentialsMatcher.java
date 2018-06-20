package com.demo5.modules.sys.shiro;

import java.util.concurrent.atomic.AtomicInteger;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;

import com.demo5.common.cache.EhCacheKeys;
import com.demo5.modules.sys.constants.SysComm;

/**
 * 认证信息匹配器
 * @author liukuigit
 *
 */
public class CredentialsMatcher extends HashedCredentialsMatcher {

	
	private Cache<String,AtomicInteger> userLoninLogCache;
	
	public CredentialsMatcher(CacheManager cacheManager)
	{
		userLoninLogCache = cacheManager
				.getCache(EhCacheKeys.LONGIN_LOG_CACHE);
	}
	
	
	@Override
	public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
		
		String username =(String) token.getPrincipal();
		
		//尝试登陆+1
		AtomicInteger logincount= userLoninLogCache.get(username);
		if(logincount ==null){
			logincount= new AtomicInteger(0);
			userLoninLogCache.put(username,logincount);
		}
		//登陆限制：登陆失败超过设定次数，则抛异常
		if(logincount.incrementAndGet() >= SysComm.USER_LOGIN_MAX_COUNT_LOCK){
			throw new ExcessiveAttemptsException();
			
		}
		
		//调用父类方法，判断是否认证成功
		Boolean matches= super.doCredentialsMatch(token, info);
		if(matches){
			userLoninLogCache.remove(username);
		}
		return matches;
	}
	
}
