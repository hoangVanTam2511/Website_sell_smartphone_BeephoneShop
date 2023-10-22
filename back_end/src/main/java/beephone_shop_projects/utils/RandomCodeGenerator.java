package beephone_shop_projects.utils;

import java.util.Random;

public class RandomCodeGenerator {
        private static final int PREFIX = 2023;
        private static final int RANDOM_DIGITS = 1000000; // 6 chữ số cuối cùng

        public static String generateRandomCode() {
            Random random = new Random();
            int randomSuffix = random.nextInt(RANDOM_DIGITS);
            String code = String.format("%04d%06d", PREFIX, randomSuffix);
            return code;
        }

        public static void main(String[] args) {
            String randomCode = generateRandomCode();
            System.out.println("Random Code: " + randomCode);
        }
}
