package com.server.backend.controllers;

import com.server.backend.dtos.CreateUserDto;
import com.server.backend.entities.User;
import com.server.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController{

    @Autowired
    UserService userService;

    @GetMapping()
    public Iterable<User> getAllUsers(){
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id){
        return userService.getUserById(id);
    }
    @PostMapping()
    public Long createUser(@RequestBody @Valid CreateUserDto createUserDto){
        return userService.createUser(createUserDto);
    }

    @PutMapping()
    public Long updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
    }
}
