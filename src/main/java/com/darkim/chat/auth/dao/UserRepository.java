package com.darkim.chat.auth.dao;

import com.darkim.chat.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where u.userName = :userName and u.active = true")
    User findActiveUser(String userName);

    @Query("select u from User u where u.userName in :usernames")
    Set<User> findAllUsers(Set<String> usernames);
}
