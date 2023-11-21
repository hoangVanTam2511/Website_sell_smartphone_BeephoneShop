package beephone_shop_projects.infrastructure.jwt;

import beephone_shop_projects.core.client.serives.impl.AccountClientServiceImpl;
import beephone_shop_projects.entity.Account;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {

//    @Value("${security.jwt.token.secret-key:secret-key}")
//    private String secretKey;
//
//    @Autowired
//    private AccountClientServiceImpl accountClientService;
//
//    @PostConstruct
//    protected void init() {
//        // this is to avoid having the raw secret key available in the JVM
//        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
//    }
//
//    public String createToken(String email) {
//        Date now = new Date();
//        Date validity = new Date(now.getTime() + 36000000); // 10 hour
//
//        Algorithm algorithm = Algorithm.HMAC256(secretKey);
//        return JWT.create()
//                .withSubject(email)
//                .withIssuedAt(now)
//                .withExpiresAt(validity)
//                .sign(algorithm);
//    }
//
//    public Authentication validateToken(String token) {
//        Algorithm algorithm = Algorithm.HMAC256(secretKey);
//
//        JWTVerifier verifier = JWT.require(algorithm)
//                .build();
//
//        DecodedJWT decoded = verifier.verify(token);
//
//        Account account = accountClientService.findByEmail(decoded.getSubject());
//
//        return new UsernamePasswordAuthenticationToken(account, null, Collections.emptyList());
//    }

}
