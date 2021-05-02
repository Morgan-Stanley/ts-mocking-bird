import { Mock, setupFunction, setupStaticFunction } from "../../main";

abstract class MyAbstractClass{

    public static sampleStaticFunction(){}

    public sampleFunction(){}

}

describe("mock abstract classes", () => {

    it("should mock instance methods", () => {
        const mocked = Mock.create<MyAbstractClass>();

        mocked.setup(setupFunction("sampleFunction"));

        expect(mocked.withFunction("sampleFunction")).wasCalledOnce();
    })

    it("should mock static functions", () => {
        const mocked = Mock.create<MyAbstractClass, typeof MyAbstractClass>();

        mocked.setup(setupFunction("sampleFunction"));
        mocked.setup(setupStaticFunction("sampleStaticFunction"))

        expect(mocked.withFunction("sampleFunction")).wasCalledOnce();
        expect(mocked.withStaticFunction("sampleStaticFunction")).wasCalledOnce();

    })

})


