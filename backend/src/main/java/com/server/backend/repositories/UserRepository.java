package com.server.backend.repositories;


import com.server.backend.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource(collectionResourceRel = "user", path = "user")
public interface UserRepository extends CrudRepository<User, Long>, PagingAndSortingRepository<User, Long> {
}
