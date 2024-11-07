package org.link_shortener.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.stream.Collectors;

@Component
public class TokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtCore jwtCore;
    private static final Logger logger = LoggerFactory.getLogger(TokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        String token = null;
        String username = null;
        UsernamePasswordAuthenticationToken auth;
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                username = jwtCore.getName(token);
            } catch (ExpiredJwtException e) {
                logger.debug("Expired token");
            } catch (SignatureException e) {
                logger.debug("Token signature error");
            }
        }
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            auth = new UsernamePasswordAuthenticationToken(
                    username,
                    null,
                    jwtCore.getRoles(token).stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        filterChain.doFilter(request, response);
    }
}
