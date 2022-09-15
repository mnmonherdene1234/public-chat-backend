import { Test } from "@nestjs/testing";
import { AppService } from "./app.service"

describe("App Controller", () => {
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AppService]
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
  })
})