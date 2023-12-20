package beephone_shop_projects.infrastructure.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;

    private final UserAuthenticationProvider userAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.exceptionHandling().authenticationEntryPoint(userAuthenticationEntryPoint)
                .and()
                .addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers(
                                "/client/**",
                                "/email/**",
                                "/khach-hang/**",
                                "/nhan-vien/**",
                                "/role/**",
                                "/san-pham/**",
                                "/thong-ke/**",
                                "/api/orders/**",
                                "/api/carts/**",
                                "/api/roms/**",
                                "/api/imeis/**",
                                "/api/danh-mucs/**",
                                "/api/rams/**",
                                "/api/sim-cards/**",
                                "/api/resolution/**",
                                "/api/display/**",
                                "/api/brands/**",
                                "/api/chips/**",
                                "/api/pins/**",
                                "/api/colors/**",
                                "/api/image/**",
                                "/api/cameras/**",
                                "/api/camera-fronts/**",
                                "/api/camera-rears/**",
                                "/api/the-nhos/**",
                                "/api/screens/**",
                                "/api/chargers/**",
                                "/api/products/**",
                                "/khuyen-mai/**",
                                "/khuyen-mai-chi-tiet/**",
                                "/san-pham-1",
                                "/san-pham-chi-tiet-1/**",
                                "/san-pham-chi-tiet/removeALL",
                                "/chi-tiet-khuyen-mai/detail/**",
                                "/detail/khuyen-mai/**",
                                "/size/khuyen-mai-chi-tiet/**",
                                "/voucher/**",
                                "/ws/*"
                                )
                        .permitAll()
                        .anyRequest().authenticated()
                )
        ;
        return http.build();
    }
}
