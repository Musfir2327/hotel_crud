package com.example.Hotel_log.Car;


import com.example.Hotel_log.Entity.Car;
import com.example.Hotel_log.Repository.CarRepository;
import com.example.Hotel_log.Service.auth.CarService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CarServiceTest {

    @InjectMocks
    private CarService carService;

    @Mock
    private CarRepository repository;

    @Test
    public void testPostCar() throws IOException {
        Car car = new Car();
        car.setBrandname("Toy test");
        car.setName("Toy name");

        MultipartFile imageFile = new MockMultipartFile("image","car.jpg","image/jpeg","test image content".getBytes());
        when(repository.save(any(Car.class))).thenReturn(car);

        Car savedCar = carService.postCar(car,imageFile);

        assertNotNull(savedCar);
        assertEquals("Toy test",savedCar.getBrandname());
        assertEquals("Toy name",savedCar.getName());
        verify(repository, times(1)).save(any(Car.class));
    }

    @Test
    void testGetAllCar() {
        // Arrange
        List<Car> car = List.of(
                new Car(1L, "Brand A", "Car A", "Red", "SUV", "Automatic", 2021, 20000, "Description A", null),
                new Car(2L, "Brand B", "Car B", "Blue", "Sedan", "Manual", 2022, 30000, "Description B", null)
        );
        when(repository.findAll()).thenReturn(car);

        // Act
        List<Car> result = carService.getAllCar();

        // Assert
        assertEquals(2, result.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void testGetCarById_Found() {

        Car car = new Car();
        car.setId(1L);
        car.setName("Test Car");
        when(repository.findById(1L)).thenReturn(java.util.Optional.of(car));


        Car result = carService.getCarById(1L);


        assertNotNull(result);
        assertEquals("Test Car", result.getName());
        verify(repository, times(1)).findById(1L);
    }

    @Test
    void testDeleteCar_Success() {

        doNothing().when(repository).deleteById(1L);
        carService.deleteCar(1L);
        verify(repository, times(1)).deleteById(1L);
    }


}

