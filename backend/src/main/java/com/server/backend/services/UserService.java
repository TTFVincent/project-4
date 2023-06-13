package com.server.backend.services;


import com.server.backend.dtos.CreateUserDto;
import com.server.backend.entities.User;
import com.server.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    public Long createUser(CreateUserDto createUserDto) {
        User User = new User();
        User.setRole("user");
        User.setName(createUserDto.getName());
        User.setEmail(createUserDto.getEmail());
        String pw_hash = BCrypt.hashpw(createUserDto.getPassword(), BCrypt.gensalt(10));
        User.setPassword_hash(pw_hash);
        User.setPhone(createUserDto.getPhone());
        User newUser = userRepository.save(User);
        return newUser.getId();
    }

    public Long updateUser(User newUserData) {
        User newUser = userRepository.save(newUserData);
        return newUser.getId();
    }

    public void deleteUser(Long id) {
        Optional<User> selectedUser = userRepository.findById(id);
        if (selectedUser.isPresent()){
            userRepository.delete(selectedUser.get());
        }
    }
}
