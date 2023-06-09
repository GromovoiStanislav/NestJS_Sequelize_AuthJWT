import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as fs from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

@Injectable()
export class FilesService {

  async createFile(file): Promise<string> {
    try {

      const fileExtension = file.originalname.split(".").pop();
      //const fileExtension: string = path.parse(file.originalname).ext;
      //const fileExtension: string = path.extname(file.originalname);
      const fileName = randomUUID() + "." + fileExtension;
      //const filePath = join(__dirname, "..", "upload");
      const filePath = join(process.cwd(), "upload");
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new InternalServerErrorException("Произошла ошибка при записи файла");
    }
  }

}
