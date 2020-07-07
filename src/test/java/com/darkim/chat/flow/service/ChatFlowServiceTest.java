package com.darkim.chat.flow.service;

import com.darkim.chat.auth.dao.UserRepository;
import com.darkim.chat.auth.entity.User;
import com.darkim.chat.auth.error.MessageResolver;
import com.darkim.chat.flow.dao.UserChatPreferenceRepository;
import com.darkim.chat.flow.model.UserIgnoreRequest;
import net.bytebuddy.utility.RandomString;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.test.annotation.DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD;

@SpringBootTest
@DirtiesContext(classMode = AFTER_EACH_TEST_METHOD)
public class ChatFlowServiceTest {

    @MockBean
    private MessageResolver messageResolver;

    @Autowired
    private ChatFlowService chatFlowService;

    @Autowired
    private UserChatPreferenceRepository userChatPreferenceRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void ignoreListShouldBeSavedIfTheStoreHasNoInitialUsers() {
        List<User> users = createMockUsers();
        String loggedInUser = getLoggedInUser(users);
        UserIgnoreRequest userIgnoreRequest = getUserIgnoreRequest(users, loggedInUser);
        chatFlowService.ignoreUsers(loggedInUser, userIgnoreRequest);
        Set<String> allIgnoredUsersFromStore = userChatPreferenceRepository.getAllIgnoredUsers(loggedInUser);
        Set<String> expectedIgnoredUsers = users.stream().filter(user -> !loggedInUser.equals(user.getUserName()))
                .map(User::getUserName)
                .collect(Collectors.toSet());
        Assert.assertTrue(allIgnoredUsersFromStore.containsAll(expectedIgnoredUsers));
    }

    @Test
    public void userShouldNotAbleToIgnoreHimself() {
        List<User> users = createMockUsers();
        String loggedInUser = getLoggedInUser(users);
        UserIgnoreRequest userIgnoreRequest = getUserIgnoreRequest(users, loggedInUser);
        userIgnoreRequest.getIgnore().add(loggedInUser); //Adding logged in user
        chatFlowService.ignoreUsers(loggedInUser, userIgnoreRequest);
        Set<String> allIgnoredUsersFromStore = userChatPreferenceRepository.getAllIgnoredUsers(loggedInUser);
        Set<String> expectedIgnoredUsers = users.stream().filter(user -> !loggedInUser.equals(user.getUserName()))
                .map(User::getUserName)
                .collect(Collectors.toSet());
        Assert.assertEquals(expectedIgnoredUsers.size(), allIgnoredUsersFromStore.size());
        Assert.assertTrue(allIgnoredUsersFromStore.containsAll(expectedIgnoredUsers));
    }

    @Test
    public void thereShouldNotAnyStateChangeIfRequestsAreReplayed() {
        List<User> users = createMockUsers();
        String loggedInUser = getLoggedInUser(users);
        UserIgnoreRequest userIgnoreRequest = getUserIgnoreRequest(users, loggedInUser);
        Stream.iterate(0, i -> i + 1).limit(2)
                .forEach(i -> chatFlowService.ignoreUsers(loggedInUser, userIgnoreRequest));
        Set<String> allIgnoredUsersFromStore = userChatPreferenceRepository.getAllIgnoredUsers(loggedInUser);
        Set<String> expectedIgnoredUsers = users.stream().filter(user -> !loggedInUser.equals(user.getUserName()))
                .map(User::getUserName)
                .collect(Collectors.toSet());
        Assert.assertEquals(expectedIgnoredUsers.size(), allIgnoredUsersFromStore.size());
        Assert.assertTrue(allIgnoredUsersFromStore.containsAll(expectedIgnoredUsers));
    }

    @Test
    public void ignoreListShouldBeUpdatedWithOnlyNewUsersIfListHasSomeExistingIgnoredUsers() {
        //Saving first set of ignored users.
        List<User> users = createMockUsers();
        String loggedInUser = getLoggedInUser(users);
        UserIgnoreRequest userIgnoreRequest = getUserIgnoreRequest(users, loggedInUser);
        chatFlowService.ignoreUsers(loggedInUser, userIgnoreRequest);

        //Saving second set of ignored users.
        List<User> nextSetOfIgnoredUsers = createMockUsers();
        nextSetOfIgnoredUsers.addAll(users);
        userIgnoreRequest = getUserIgnoreRequest(nextSetOfIgnoredUsers, loggedInUser);
        chatFlowService.ignoreUsers(loggedInUser, userIgnoreRequest);

        Set<String> allIgnoredUsersFromStore = userChatPreferenceRepository.getAllIgnoredUsers(loggedInUser);
        Set<String> expectedIgnoredUsers = nextSetOfIgnoredUsers.stream().filter(user -> !loggedInUser.equals(user.getUserName()))
                .map(User::getUserName)
                .collect(Collectors.toSet());
        Assert.assertEquals(expectedIgnoredUsers.size(), allIgnoredUsersFromStore.size());
        Assert.assertTrue(allIgnoredUsersFromStore.containsAll(expectedIgnoredUsers));
    }

    @Test
    public void testSaveEnableUsers() {
        List<User> users = createMockUsers();
        String loggedInUser = getLoggedInUser(users);
        UserIgnoreRequest userIgnoreRequest = getUserIgnoreRequest(users, loggedInUser);
        chatFlowService.ignoreUsers(loggedInUser, userIgnoreRequest);

        //Enable
        List<String> ignoredUsers = users.stream().map(User::getUserName).filter(username -> !loggedInUser.equals(username))
                .collect(Collectors.toList());
        List<String> usersToEnable = ignoredUsers.subList(0, 2);
        UserIgnoreRequest enableRequest = new UserIgnoreRequest(new HashSet<>(), new HashSet<>(usersToEnable));
        chatFlowService.ignoreUsers(loggedInUser, enableRequest);
        Set<String> allIgnoredUsersFromStore = userChatPreferenceRepository.getAllIgnoredUsers(loggedInUser);
        Set<String> expectedIgnoredUsers = users.stream().filter(user -> !loggedInUser.equals(user.getUserName()))
                .map(User::getUserName)
                .collect(Collectors.toSet());
        Assert.assertEquals(users.size() - usersToEnable.size() + 1, allIgnoredUsersFromStore.size());
        Assert.assertEquals(expectedIgnoredUsers.size(), allIgnoredUsersFromStore.size());
        Assert.assertTrue(allIgnoredUsersFromStore.containsAll(expectedIgnoredUsers));
    }

    @Test
    public void netEffectMustBeDeleteIfUsernamePresentBothInIgnoreAndEnable() {
        List<User> users = createMockUsers();
        String loggedInUser = getLoggedInUser(users);
        UserIgnoreRequest userIgnoreRequest = getUserIgnoreRequest(users, loggedInUser);
        userIgnoreRequest.setEnable(userIgnoreRequest.getIgnore());
        chatFlowService.ignoreUsers(loggedInUser, userIgnoreRequest);
        Set<String> allIgnoredUsersFromStore = userChatPreferenceRepository.getAllIgnoredUsers(loggedInUser);
        Assert.assertTrue(allIgnoredUsersFromStore.isEmpty());
    }



    private String getLoggedInUser(List<User> users) {
        return users.get(0).getUserName();
    }

    private UserIgnoreRequest getUserIgnoreRequest(List<User> users, String loggedInUser) {
        Set<String> ignore = users.stream().filter(user -> !user.getUserName().equals(loggedInUser))
                .map(User::getUserName)
                .collect(Collectors.toCollection(HashSet::new));
        return new UserIgnoreRequest(ignore, new HashSet<>());
    }

    private List<User> createMockUsers() {
        List<User> users = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            User user = new User();
            user.setActive(true);
            user.setUserName(RandomString.make(10));
            user.setPassword(RandomString.make(10));
            users.add(user);
        }
        return userRepository.saveAll(users);
    }


}
