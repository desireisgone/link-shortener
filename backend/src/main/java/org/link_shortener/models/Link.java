package org.link_shortener.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "links")
public class Link {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String link;

    @Column(nullable = false, unique = true)
    private UUID shortLink;

    @Column()
    private String linkName;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @CreationTimestamp
    private Date createdAt;
}