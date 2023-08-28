package com.springboot.restapi.springbootrestapi.user;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsCommandLineRunner  implements CommandLineRunner{

	public UserDetailsCommandLineRunner(UserDetailsRepository repository) {
		super();
		this.repository = repository;
	}
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	private UserDetailsRepository repository;
	
	
	@Override
	public void run(String... args) throws Exception{
		repository.save(new UserDetails("Manas","Admin"));
		repository.save(new UserDetails("Manas1","user")); 
		repository.save(new UserDetails("Raj","user"));
	}
}
