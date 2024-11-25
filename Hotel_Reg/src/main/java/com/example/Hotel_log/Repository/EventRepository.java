package com.example.Hotel_log.Repository;

import com.example.Hotel_log.Entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository

public interface EventRepository extends JpaRepository <Events, Long > {
}
