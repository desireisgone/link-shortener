package org.link_shortener.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtCore {
    @Value("${link_shortener.secret}")
    private String secret;
    @Value("${link_shortener.lifetime}")
    private Duration lifetime;

    public String generateToken(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return Jwts.builder()
                .setClaims(new HashMap<>(Map.of("roles", userDetails
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))))
                .setSubject(userDetails.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + lifetime.toMillis()))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public String getName(String token) {
        return getClaims(token).getSubject();
    }

    public Date getExpiration(String token) {
        return getClaims(token).getExpiration();
    }

    public List<String> getRoles(String token) {
        return getClaims(token).get("roles", List.class);
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }
}
