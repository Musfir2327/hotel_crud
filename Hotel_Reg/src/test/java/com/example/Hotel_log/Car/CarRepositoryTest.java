package com.example.Hotel_log.Car;

import com.example.Hotel_log.Entity.Car;
import com.example.Hotel_log.Repository.CarRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class CarRepositoryTest {

    @Autowired
    CarRepository repository;

    @Test
    public void testSave(){
        Car car = new Car();
        car.setBrandname("Dokomo");
        car.setColor("Black");

        Car savedCar = repository.save(car);
        assertNotNull(savedCar);
        assertEquals("Dokomo", savedCar.getBrandname());
        assertEquals("Black", savedCar.getColor());

    }

    @Test
    public void testFindById(){
        Car car = new Car();
        car.setName("YH");
        car.setType("electronic");
        Car savedCar = repository.save(car);

        Car foundCar = repository.findById(savedCar.getId()).orElse(null);


        assertNotNull(foundCar);
        assertEquals(savedCar.getId(), foundCar.getId());
        assertEquals("YH", foundCar.getName());
    }





    @Test
    public void testFindAll(){
        repository.save(new Car(null, "Brand A", "Car A", "Red", "SUV", "Automatic", 2023, 25000, "Description A", null));
        repository.save(new Car(null, "Brand B", "Car B", "Blue", "Sedan", "Manual", 2022, 30000, "Description B", null));
        List<Car> carList = (List<Car>) repository.findAll();
        assertNotNull(carList);
        assertTrue(carList.size() > 0);
    }

    @Test
    void testUpdate() {

        Car car = new Car();
        car.setBrandname("TOYO");
        car.setName("TOY");
        repository.save(car);


        Car carToUpdate = repository.findById(car.getId())
                .orElseThrow(() -> new EntityNotFoundException("Car not found with id: " + car.getId()));

        carToUpdate.setName("MERCI");
        repository.save(carToUpdate);


        Car updatedCar = repository.findById(carToUpdate.getId())
                .orElseThrow(() -> new EntityNotFoundException("Car not found with id: " + carToUpdate.getId()));
        assertEquals("MERCI", updatedCar.getName());
    }

    @Test
    void testDeleteCar() {

        Car car = new Car();
        car.setBrandname("Test Brand");
        car.setName("Test Car");
        Car savedCar = repository.save(car);


        repository.deleteById(savedCar.getId());
        Car foundCar = repository.findById(savedCar.getId()).orElse(null);

        assertNull(foundCar);
    }


}
