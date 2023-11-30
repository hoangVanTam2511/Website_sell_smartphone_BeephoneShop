package beephone_shop_projects.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Component
public class BarcodeGenerator {
  public byte[] generateBarcodeImage(String text, int width, int height) throws IOException, WriterException {
    BitMatrix bitMatrix = new MultiFormatWriter().encode(text, BarcodeFormat.CODE_128, width, height);
    BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix, getMatrixConfig());

    Graphics2D graphics = (Graphics2D) bufferedImage.getGraphics();
    graphics.setColor(Color.BLACK);
    graphics.setFont(new Font("Arial", Font.PLAIN, 12));
    graphics.drawString(text, 10, height - 10);
    graphics.dispose();

    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    MatrixToImageWriter.writeToStream(bitMatrix, "png", outputStream);
    return outputStream.toByteArray();
  }

  private MatrixToImageConfig getMatrixConfig() {
    int onColor = Color.BLACK.getRGB();
    int offColor = Color.WHITE.getRGB();
    return new MatrixToImageConfig(onColor, offColor);
  }

}
