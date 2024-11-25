package com.example.Hotel_log.Service.auth;

import com.example.Hotel_log.Entity.Car;
import com.example.Hotel_log.Repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public Car postCar(Car car, MultipartFile imageFile) throws IOException {
        // Convert MultipartFile to byte[]
        car.setImage(imageFile.getBytes());
        return carRepository.save(car);
    }

    public List<Car> getAllCar() {
        return carRepository.findAll();
    }

    public Car getCarById(Long id) {
        return carRepository.findById(id).orElse(null);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    public Car updateCar(Long id, Car car, MultipartFile imageFile) throws IOException {
        Car existingCar = carRepository.findById(id).orElse(null);
        if (existingCar != null) {
            existingCar.setName(car.getName());
            existingCar.setBrandname(car.getBrandname());
            existingCar.setColor(car.getColor());
            existingCar.setType(car.getType());
            existingCar.setTransmission(car.getTransmission());
            existingCar.setModelyear(car.getModelyear());
            existingCar.setPrice(car.getPrice());
            existingCar.setDescription(car.getDescription());

            // If a new image is provided, update it
            if (imageFile != null && !imageFile.isEmpty()) {
                existingCar.setImage(imageFile.getBytes());
            }
            return carRepository.save(existingCar);
        }
        return null;
    }
}
