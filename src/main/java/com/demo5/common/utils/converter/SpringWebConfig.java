package com.demo5.common.utils.converter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;


/**
 * Spring MVC URL忽略大小写
 * @author liukuigit
 *
 */
@Configuration
public class SpringWebConfig extends WebMvcConfigurationSupport {

	
	@Override
	public void configurePathMatch(PathMatchConfigurer configurer) {
		AntPathMatcher pathMatcher = new AntPathMatcher();
        pathMatcher.setCaseSensitive(false);
        configurer.setPathMatcher(pathMatcher);
	}
	
	
}
