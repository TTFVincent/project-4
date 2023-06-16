package com.server.backend.dtos;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;
import java.util.Objects;

/**
 * DTO for {@link com.server.backend.entities.User}
 */
public class LoginDto implements Serializable {
    @NotBlank
    private final String name;
    @NotBlank(message = "Missing password")
    private final String password;

    public LoginDto(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoginDto entity = (LoginDto) o;
        return Objects.equals(this.name, entity.name) &&
                Objects.equals(this.password, entity.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, password);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "name = " + name + ", " +
                "password = " + password + ")";
    }
}