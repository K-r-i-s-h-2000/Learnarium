package com.example.online_learning_platform.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")
@Builder
public class User extends EntityDoc implements UserDetails {

    private String firstname;

    private String lastname;

    private String email;

    private String password;

    @Column(name="authentication_token")
    private String authenticationToken;

    @Builder.Default
    @Column(name="is_active")
    private Boolean isActive=false;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Transient
    private int roleValue;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Student student;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Instructor instructor;

    public User(String username, String oldPassword, Object o){ super();}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    public void setStudent(Student student){
        this.student= student;
    }
}
