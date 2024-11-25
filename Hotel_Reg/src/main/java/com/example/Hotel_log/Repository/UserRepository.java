package com.example.Hotel_log.Repository;

import com.example.Hotel_log.Entity.User;
import com.example.Hotel_log.Enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findFirstByEmail(String email);

    List<User> findByUserRole(UserRole userRole);
}
