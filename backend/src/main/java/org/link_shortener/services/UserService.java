package org.link_shortener.services;

import org.link_shortener.dtos.TokenDto;
import org.link_shortener.dtos.UserRequestDto;
import org.link_shortener.exceptions.UserAlreadyExistsException;
import org.link_shortener.models.User;
import org.link_shortener.repositories.RoleRepository;
import org.link_shortener.repositories.UserRepository;
import org.link_shortener.security.JwtCore;
import org.link_shortener.security.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private JwtCore jwtCore;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public TokenDto registration(UserRequestDto signUpRequest) throws UsernameNotFoundException {
        if (userRepository.existsUserByEmail(signUpRequest.getEmail())) {
            logger.info("User {} already exists", signUpRequest.getEmail());
            throw new UserAlreadyExistsException(String.format("User %s already exists", signUpRequest.getEmail()));
        }

        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRoles(List.of(roleRepository.findRoleByName("USER").get()));
        user = userRepository.save(user);

        logger.info("User with id {} is successfully created", user.getId());

        return login(signUpRequest);
    }

    public TokenDto login(UserRequestDto signInRequest) throws BadCredentialsException {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(),
                        signInRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        TokenDto token = new TokenDto();
        token.setToken(jwtCore.generateToken(authentication));
        return token;
    }

    public User getUserByEmail(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException(
                    String.format("User %s not found", email)
            ));
    }
}