package com.example.Hotel_log.DTO;


import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;

}
