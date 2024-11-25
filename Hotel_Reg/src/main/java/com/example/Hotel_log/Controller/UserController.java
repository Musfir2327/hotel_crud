package com.example.Hotel_log.Controller;


import com.example.Hotel_log.Entity.UserEntity;
import com.example.Hotel_log.Service.auth.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private RoomService userService;

    // Create a new room
    @PostMapping("/room")
    public ResponseEntity<UserEntity> createRoom(@RequestBody UserEntity room) {
        UserEntity savedRoom = userService.createUser(room);
        return new ResponseEntity<>(savedRoom, HttpStatus.CREATED);
    }

    // Get all rooms
    @GetMapping("/getroom")
    public ResponseEntity<List<UserEntity>> getAllRooms() {
        List<UserEntity> rooms = userService.getAllUsers();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    // Get a room by ID
    @GetMapping("/getroom/{id}")
    public ResponseEntity<UserEntity> getRoomById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(room -> new ResponseEntity<>(room, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update a room
    @PatchMapping("/room/{id}")
    public ResponseEntity<UserEntity> updateRoom(@PathVariable Long id, @RequestBody UserEntity roomDetails) {
        try {
            UserEntity updatedUser = userService.updateUser(id, roomDetails);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a room
    @DeleteMapping("/room/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}