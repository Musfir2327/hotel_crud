package com.example.Hotel_log.Repository;

import com.example.Hotel_log.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<UserEntity, Long> {
}