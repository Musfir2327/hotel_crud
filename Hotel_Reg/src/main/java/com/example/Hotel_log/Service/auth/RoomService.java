package com.example.Hotel_log.Service.auth;

import com.example.Hotel_log.Entity.UserEntity;
import com.example.Hotel_log.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository userRepository;

    // Create a new user (or room)
    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    // Get all users (or rooms)
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a user (or room) by ID
    public Optional<UserEntity> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update a user (or room)
    public UserEntity updateUser(Long id, UserEntity userDetails) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
        user.setName(userDetails.getName());
        user.setCapacity(userDetails.getCapacity());
        user.setPrice(userDetails.getPrice());
        return userRepository.save(user);
    }

    // Delete a user (or room)
    public void deleteUser(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
        userRepository.delete(user);
    }
}