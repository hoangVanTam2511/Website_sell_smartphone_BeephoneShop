package beephone_shop_projects.utils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class FieldExtractorUtils {

  public static List<String> extractFields(Class<?> clazz) {
    List<String> fieldList = new ArrayList<>();
    Field[] fields = clazz.getDeclaredFields();

    for (Field field : fields) {
      fieldList.add(field.getName());
    }

    return fieldList;

  }

}
