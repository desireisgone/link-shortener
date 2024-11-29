package org.link_shortener.controllers;

import org.link_shortener.dtos.LinkDto;
import org.link_shortener.dtos.RedirectLinkDto;
import org.link_shortener.exceptions.IncorrectLinkException;
import org.link_shortener.services.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@Controller
public class LinkController {

    @Autowired
    private LinkService linkService;

    @PostMapping("/link")
    public ResponseEntity<LinkDto> createLink(@RequestBody LinkDto linkRequest, Principal user) {
        if (!UrlUtils.isValidRedirectUrl(linkRequest.getLink())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect link");
        }
        return ResponseEntity.ok(linkService.createShortLink(linkRequest, user != null ? user.getName() : null));
    }

    @PostMapping("/redirect")
    public ResponseEntity<RedirectLinkDto> redirectToUrl(@RequestBody RedirectLinkDto redirectLinkDto) {
        if (redirectLinkDto.getLink() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect link");
        }
        try {
            return ResponseEntity.ok(linkService.redirect(redirectLinkDto.getLink()));
        } catch (IncorrectLinkException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}