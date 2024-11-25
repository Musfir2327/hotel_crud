package com.example.Hotel_log.Controller;

import com.example.Hotel_log.Entity.Car;
import com.example.Hotel_log.Service.auth.CarService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CarController {

    private final CarService carService;

    @PostMapping(value = "/car", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> postCar(@RequestParam("image") MultipartFile imageFile,
                                     @RequestParam("brandname") String brandname,
                                     @RequestParam("name") String name,
                                     @RequestParam("color") String color,
                                     @RequestParam("type") String type,
                                     @RequestParam("transmission") String transmission,
                                     @RequestParam("modelyear") Integer modelyear,
                                     @RequestParam("price") Integer price,
                                     @RequestParam("description") String description) {
        try {
            // Create a new Car object and manually set fields
            Car car = new Car();
            car.setBrandname(brandname);
            car.setName(name);
            car.setColor(color);
            car.setType(type);
            car.setTransmission(transmission);
            car.setModelyear(modelyear);
            car.setPrice(price);
            car.setDescription(description);

            // Set image as byte[] from MultipartFile
            car.setImage(imageFile.getBytes());

            Car createdCar = carService.postCar(car, imageFile);
            return ResponseEntity.ok(createdCar);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }

    @GetMapping("/getcar")
    public List<Car> getAllCar() {
        return carService.getAllCar();
    }

    @DeleteMapping("/car/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        try {
            carService.deleteCar(id);
            return new ResponseEntity<>("Car with ID " + id + " deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/car/{id}")
    public ResponseEntity<?> getCarById(@PathVariable Long id) {
        Car car = carService.getCarById(id);
        if (car == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(car);
    }

    @GetMapping("/car/{id}/image")
    public ResponseEntity<byte[]> getCarImage(@PathVariable Long id) {
        Car car = carService.getCarById(id);
        if (car == null || car.getImage() == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + id + ".jpg\"")
                .contentType(MediaType.IMAGE_JPEG)
                .body(car.getImage());
    }

    @PatchMapping(value = "/car/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateCar(@PathVariable Long id,
                                       @RequestParam(value = "image", required = false) MultipartFile imageFile,
                                       @RequestParam("brandname") String brandname,
                                       @RequestParam("name") String name,
                                       @RequestParam("color") String color,
                                       @RequestParam("type") String type,
                                       @RequestParam("transmission") String transmission,
                                       @RequestParam("modelyear") Integer modelyear,
                                       @RequestParam("price") Integer price,
                                       @RequestParam("description") String description) {
        try {
            Car car = new Car();
            car.setBrandname(brandname);
            car.setName(name);
            car.setColor(color);
            car.setType(type);
            car.setTransmission(transmission);
            car.setModelyear(modelyear);
            car.setPrice(price);
            car.setDescription(description);

            if (imageFile != null) {
                car.setImage(imageFile.getBytes());
            }

            Car updatedCar = carService.updateCar(id, car, imageFile);
            if (updatedCar == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            return ResponseEntity.ok(updatedCar);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }
}
