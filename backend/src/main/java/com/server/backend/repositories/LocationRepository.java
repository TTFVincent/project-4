package com.server.backend.repositories;

import com.server.backend.entities.Location;
import com.server.backend.entities.Trip;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface LocationRepository extends CrudRepository<Location, Long>, PagingAndSortingRepository<Location, Long> {
}
