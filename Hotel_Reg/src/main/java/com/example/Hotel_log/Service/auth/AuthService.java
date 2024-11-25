package com.example.Hotel_log.Service.auth;

import com.example.Hotel_log.DTO.SignupRequest;
import com.example.Hotel_log.DTO.UserDto;

public interface AuthService {


    UserDto createCustomer(SignupRequest signupRequest);
    boolean hasCustomerWithEmail(String email);
}
