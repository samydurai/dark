package com.darkim.chat.flow.dao;

import com.darkim.chat.flow.model.UserChatPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserChatPreferenceRepository extends JpaRepository<UserChatPreference, Long> {

    @Query("select up.entity.userName from UserChatPreference up where up.user.userName = :username and up.type='IGNORE'")
    Set<String> getAllIgnoredUsers(String username);

    @Query("select up from UserChatPreference up where up.user.userName = :username and up.entity.userName in :usersToBeEnabled and up.type = 'IGNORE'")
    Set<UserChatPreference> getUsersToBeEnabled(String username, Set<String> usersToBeEnabled);

    @Query("select up.entity.userName from UserChatPreference up where up.user.userName = :username and up.type='WATCH'")
    Set<String> getUsersBeingWatched(String username);

    @Query("select up from UserChatPreference up where up.user.userName = :username and up.entity.userName in :usersToUnwatched and up.type = 'WATCH'")
    Set<UserChatPreference> getUsersToBeUnwatched(String username, Set<String> usersToUnwatched);

    @Query("select up.user.userName from UserChatPreference up where up.type = 'WATCH' and up.entity.userName = :username")
    Set<String> getAllUsersWatching(String username);

    @Query("select up.entity.userName from UserChatPreference up where up.type = 'WATCH' and up.user.userName = :username")
    Set<String> getWatchList(String username);

    @Query("select up.entity.userName from UserChatPreference up where up.type = 'WATCH' and up.user.userName = :username")
    Set<String> getIgnoreList(String username);
}
