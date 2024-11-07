package org.link_shortener.dtos;

import lombok.Data;

@Data
public class UserRequestDto {
    private String email;
    private String password;
}
