package com.example.Hotel_log.Service.auth;


import com.example.Hotel_log.DTO.SignupRequest;
import com.example.Hotel_log.DTO.UserDto;
import com.example.Hotel_log.Entity.User;
import com.example.Hotel_log.Enums.UserRole;
import com.example.Hotel_log.Repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void createAdminAccount() {
        List<User> adminAccounts = userRepository.findByUserRole(UserRole.Admin);

        if (adminAccounts.isEmpty()) {
            User newAdminAccount = new User();
            newAdminAccount.setName("Admin");
            newAdminAccount.setEmail("musfir@admin.com");
            newAdminAccount.setPassword(passwordEncoder.encode("musfir"));
            newAdminAccount.setUserRole(UserRole.Admin);
            userRepository.save(newAdminAccount);
            System.out.println("Admin account created successfully");
        } else {
            User existingAdmin = adminAccounts.get(0);
            existingAdmin.setEmail("musfir@admin.com");
            existingAdmin.setPassword(passwordEncoder.encode("musfir"));
            userRepository.save(existingAdmin);
            System.out.println("Admin account updated successfully");
        }
    }


    @Override
    public UserDto createCustomer(SignupRequest signupRequest) {
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.Student);

        User createdUser = userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());
        userDto.setName(createdUser.getName());
        userDto.setEmail(createdUser.getEmail());
        userDto.setUserrole(createdUser.getUserRole());

        return userDto;
    }

    @Override
    public boolean hasCustomerWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
}
