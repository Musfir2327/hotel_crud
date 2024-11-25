package com.example.Hotel_log.DTO;


import com.example.Hotel_log.Enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {


    private UserRole userRole;

    private Long userId;


}
