package com.example.Hotel_log.Service.auth;

import com.example.Hotel_log.Entity.Events;
import com.example.Hotel_log.Repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public Events postEvent(Events events) {
        return eventRepository.save(events);
    }

    public List<Events> getAllEvents() {
        try{
            return eventRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("error fetching events: " + e.getMessage());
        }

    }

    public void deleteEvents(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new EntityNotFoundException("Event with ID " + id + " not found.");
        }
        eventRepository.deleteById(id);
    }

    public Events getEventsById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event with ID " + id + " not found."));
    }

    public Events updateEvents(Long id, Events event) {
        Events existingEvents = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event with ID " + id + " not found."));

        // Update the fields
        existingEvents.setEventName(event.getEventName());
        existingEvents.setPrice(event.getPrice());

        // Save the updated event
        return eventRepository.save(existingEvents);
    }
}
