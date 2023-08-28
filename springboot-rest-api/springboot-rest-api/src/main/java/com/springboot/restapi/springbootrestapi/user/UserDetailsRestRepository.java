package com.springboot.restapi.springbootrestapi.user;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDetailsRestRepository extends PagingAndSortingRepository<UserDetails, Integer>{

}
