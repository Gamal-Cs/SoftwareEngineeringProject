package com.shaltout.medicalsystem.repository;

import jakarta.persistence.EntityManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.shaltout.medicalsystem.entities.User;
import org.springframework.beans.factory.annotation.Autowired;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
//
//@Repository
//public class UserRepository {
//
//    @Autowired
//    private EntityManager entityManager;
//
//    public User findByUsername(String username) {
//        return entityManager.createNamedQuery("User.findByUsernameNative", User.class)
//                .setParameter("username", username)
//                .getSingleResult();
//    }
//
//    public User findByEmail(String email) {
//        return entityManager.createNamedQuery("User.findByEmailNative", User.class)
//                .setParameter("email", email)
//                .getSingleResult();
//    }
//}
