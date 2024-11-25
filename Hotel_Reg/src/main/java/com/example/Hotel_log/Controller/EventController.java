package com.example.Hotel_log.Controller;

import com.example.Hotel_log.Entity.Events;

import com.example.Hotel_log.Service.auth.EventService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EventController {

    private final EventService eventService;

    @PostMapping("/reserve")
    public ResponseEntity<?> postEvents(@RequestBody Events event) {
        try {
            Events createdEvent = eventService.postEvent(event);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating event: " + e.getMessage());
        }
    }

    @GetMapping("/reservation")
    public ResponseEntity<?> getAllEvents() {
        try{
            List<Events> events = eventService.getAllEvents();
            if (events.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No events found");
            }
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching events: " + e.getMessage());
        }

    }

    @DeleteMapping("/kill/{id}")
    public ResponseEntity<String> deleteEvents(@PathVariable Long id) {
        try {
            eventService.deleteEvents(id);
            return ResponseEntity.ok("Event with ID " + id + " deleted successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/reservation/{id}")
    public ResponseEntity<Events> getEventById(@PathVariable Long id) {
        try {
            Events event = eventService.getEventsById(id);
            return ResponseEntity.ok(event);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("/reserve/{id}")
    public ResponseEntity<Events> updateEvents(@PathVariable Long id, @RequestBody Events event) {
        try {
            Events updatedEvent = eventService.updateEvents(id, event);
            return ResponseEntity.ok(updatedEvent);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
