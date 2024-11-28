package org.link_shortener.repositories;

import org.link_shortener.models.Link;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface LinkRepository extends JpaRepository<Link, Long> {
    boolean existsByShortLink(UUID shortLink);
    Optional<Link> findByShortLink(UUID shortLink);
}
