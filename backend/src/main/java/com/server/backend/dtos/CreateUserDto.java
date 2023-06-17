package com.server.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.util.Objects;

/**
 * DTO for {@link com.server.backend.entities.User}
 */
public class CreateUserDto implements Serializable {
    @Size(message = "Name too long", max = 64)
    @NotBlank(message = "Missing name")
    private final String name;
    @Email(message = "Invalid email")
    @NotBlank(message = "Missing Email")
    private final String email;
    @Size(message = "Password length 8-20", min = 8, max = 20)
    @NotBlank(message = "Missing Password")
    private final String password;
    private final String phone;

    public CreateUserDto(String name, String email, String password, String phone) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPhone() {
        return phone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CreateUserDto entity = (CreateUserDto) o;
        return Objects.equals(this.name, entity.name) &&
                Objects.equals(this.email, entity.email) &&
                Objects.equals(this.password, entity.password) &&
                Objects.equals(this.phone, entity.phone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, email, password, phone);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "name = " + name + ", " +
                "email = " + email + ", " +
                "password = " + password + ", " +
                "phone = " + phone + ")";
    }
}