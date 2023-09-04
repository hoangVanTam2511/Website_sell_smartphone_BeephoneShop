package beephone_shop_projects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DatnBeephoneShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(DatnBeephoneShopApplication.class, args);
    }

}
