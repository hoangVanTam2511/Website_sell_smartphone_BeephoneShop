package beephone_shop_projects.infrastructure.jwt;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {

//    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
//    private final UserAuthenticationProvider userAuthenticationProvider;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.exceptionHandling().authenticationEntryPoint(userAuthenticationEntryPoint)
//                .and()
//                .addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
//                .csrf().disable()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .authorizeHttpRequests((requests) -> requests
//                        .requestMatchers(HttpMethod.POST, "/login", "/register").permitAll()
//                        .anyRequest().authenticated())
//        ;
//        return http.build();
//    }
}
