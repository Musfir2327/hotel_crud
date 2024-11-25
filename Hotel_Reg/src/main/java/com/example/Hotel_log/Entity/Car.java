package com.example.Hotel_log.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String brandname;

    private String name;

    private String color;

    private String type;

    private String transmission;

    private Integer modelyear;

    private Integer price;

    private String description;

    @Lob
    @Column(name="image",columnDefinition = "LONGBLOB")
    private byte[] image;


}
