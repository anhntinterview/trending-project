import ApiOperation from "@/core/api-operation";
import { TestsDTO } from "./test.dto";
import TestService from "./test.service";
import { Container, Service } from "typedi";
import { MethodType } from "@/core/method";

@Service()
class TestController {
    private testService = Container.get(TestService)
    
    async all(): Promise<TestsDTO> {
        return await this.testService.all()
    }
}

export default TestController