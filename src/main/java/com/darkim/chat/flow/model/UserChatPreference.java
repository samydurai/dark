package com.darkim.chat.flow.model;

import com.darkim.chat.auth.entity.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "user_chat_pref")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserChatPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(targetEntity = User.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "username")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private PreferenceType type;

    @ManyToOne
    @JoinColumn(name = "entity_id", referencedColumnName = "username")
    private User entity;
}
