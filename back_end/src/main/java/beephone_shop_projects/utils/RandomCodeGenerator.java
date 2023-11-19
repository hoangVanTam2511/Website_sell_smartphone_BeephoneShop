package beephone_shop_projects.utils;

import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class RandomCodeGenerator {
  private static final int PREFIX = 2023;
  private static final int RANDOM_DIGITS = 1000000; // 6 chữ số cuối cùng

  public static String generateRandomCode() {
    Random random = new Random();
    int randomSuffix = random.nextInt(RANDOM_DIGITS);
    String code = String.format("%04d%06d", PREFIX, randomSuffix);
    return code;
  }

  public static String generateRandomNumber() {
    String prefix = "202323";
    Random random = new Random();
    int randomSuffix = random.nextInt(10000000);
    String formattedSuffix = String.format("%07d", randomSuffix);
    String randomNumber = prefix + formattedSuffix;
    return randomNumber;
  }

  public static void main(String[] args) {
    Set<String> isDuslicate = new HashSet<>();
    String a = "a";
    String b = "a";
    String c = "b";
    if (isDuslicate.add(a)) {
      System.out.println(isDuslicate.add(a));
    }
    if (isDuslicate.add(b)) {
      System.out.println(isDuslicate.add(b));
    }
    if (isDuslicate.add(c)) {
      System.out.println(isDuslicate.add(c));
    }
  }
}
