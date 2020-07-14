package com.darkim.chat.flow.model;

import com.darkim.chat.flow.model.UserChatPreference;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "chat_user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    @Column(name = "username")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "is_active")
    private boolean active;

    @CreationTimestamp
    @Column(name = "created_at")
    private Instant createdAt;

    @OneToMany(targetEntity = UserChatPreference.class, fetch = FetchType.EAGER, mappedBy = "user")
    private Set<UserChatPreference> userPreferences;
}
