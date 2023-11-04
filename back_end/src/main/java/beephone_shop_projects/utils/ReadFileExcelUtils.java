package beephone_shop_projects.utils;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

public class ReadFileExcelUtils {
  private static final Logger logger = LoggerFactory.getLogger(ReadFileExcelUtils.class);
  public Workbook readExcelTemplate(String path) {
    try {
      ClassPathResource resource = new ClassPathResource(path);
      InputStream inputStream = resource.getInputStream();
      return new XSSFWorkbook(inputStream);
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

}
