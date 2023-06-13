package com.server.backend.repositories;

import com.server.backend.entities.Trip;
import com.server.backend.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TripRepository extends CrudRepository<Trip, Long>, PagingAndSortingRepository<Trip, Long> {
}
