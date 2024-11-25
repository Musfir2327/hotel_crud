package com.example.Hotel_log.Repository;

import com.example.Hotel_log.Entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FoodRepository extends JpaRepository<Food,Long> {
}
