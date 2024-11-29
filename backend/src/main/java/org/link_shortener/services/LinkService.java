package org.link_shortener.services;

import org.link_shortener.dtos.LinkDto;
import org.link_shortener.dtos.RedirectLinkDto;
import org.link_shortener.exceptions.IncorrectLinkException;
import org.link_shortener.models.Link;
import org.link_shortener.repositories.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LinkService {
    @Value("${link_shortener.frontend-origin}")
    private String frontend;

    @Autowired
    private LinkRepository linkRepository;
    private UserService userService;

    public LinkDto createShortLink(LinkDto link, String userEmail) {
        Link newLink = new Link();
        newLink.setLink(link.getLink());
        newLink.setLinkName(link.getLinkName());
        newLink.setShortLink(UUID.randomUUID());
        if (userEmail != null) {
            try {
                newLink.setUser(userService.getUserByEmail(userEmail));
            } catch (UsernameNotFoundException e) {
            }
        }

        newLink = linkRepository.save(newLink);

        LinkDto responseLink = new LinkDto();
        responseLink.setLink(String.join("/", frontend, newLink.getShortLink().toString()));
        responseLink.setLinkName(newLink.getLinkName());
        return responseLink;
    }

    public RedirectLinkDto redirect(String shortLink) {
        if (!shortLink.startsWith(frontend)) {
            throw new IncorrectLinkException(String.format("Incorrect link: %s", shortLink));
        }
        String idPart = shortLink.substring(frontend.length() + 1);
        Link link = linkRepository.findByShortLink(UUID.fromString(idPart)).orElseThrow(() ->
                new IncorrectLinkException(String.format("Original link not found: %s", shortLink))
        );
        RedirectLinkDto rld = new RedirectLinkDto();
        rld.setLink(link.getLink());
        return rld;
    }
}
