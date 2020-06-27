package com.darkim.chat.flow.dao;

import com.darkim.chat.flow.model.UserChatPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserChatPreferenceRepository extends JpaRepository<UserChatPreference, Long> {


}
