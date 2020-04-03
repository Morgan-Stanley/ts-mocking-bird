import { IMocked, Mock } from '../../main';
import {
    defineStaticProperty,
    setupFunction,
    setupProperty,
    setupStaticFunction,
    setupStaticProperty,
} from '../../main/mock/operators';

describe('mock with statics', () => {
    // just a convenience to get a value and avoid compile / lint errors
    // tslint:disable-next-line:no-empty
    function get(_value: any) {}

    let mocked: IMocked<SampleMockedClass, typeof SampleMockedClass>;

    beforeEach(() => {
        mocked = Mock.create<SampleMockedClass>();
    });

    describe('setup', () => {
        it('withStaticFunction will throw a meaningful error if we try to assert a function that is not setup', () => {
            expect(() => mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasNotCalled()).toThrowError(
                `Static function "functionWithNoParamsAndNoReturn" has not been setup. Please setup using Mock.setupStaticFunction() before verifying calls.`,
            );
        });

        it('withStaticGetter will throw a meaningful error if we try to assert a getter that is not setup', () => {
            expect(() => mocked.withStaticGetter('propertyOne').wasNotCalled()).toThrowError(
                `Static property "propertyOne" has not been setup. Please setup using Mock.setupStaticProperty() before verifying calls.`,
            );
        });

        it('withStaticSetter will throw a meaningful error if we try to assert a setter that is not setup', () => {
            expect(() => mocked.withStaticSetter('propertyTwo').wasNotCalled()).toThrowError(
                `Static property "propertyTwo" has not been setup. Please setup using Mock.setupStaticProperty() before verifying calls.`,
            );
        });
    });

    describe('withStaticFunction', () => {
        it('called directly on mock instance', () => {
            mocked.setup(setupStaticFunction('functionWithNoParamsAndNoReturn'));

            mocked.mockConstructor.functionWithNoParamsAndNoReturn();

            mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled();
        });

        it('called on checker returned from setup function', () => {
            const verifier = mocked.setupStaticFunction('functionWithNoParamsAndNoReturn');

            mocked.mockConstructor.functionWithNoParamsAndNoReturn();

            verifier.wasCalled();
        });

        describe('assertion with no parameters', () => {
            beforeEach(() => {
                mocked.setup(setupStaticFunction('functionWithNoParamsAndNoReturn'));
            });

            describe('wasCalled()', () => {
                it('should not throw an error when function has been called once', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled();
                });

                it('should not throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled();
                });

                it('should throw an error when function has not been called', () => {
                    expect(() => mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled()).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called but it was not.`,
                    );
                });
            });

            describe('wasNotCalled()', () => {
                it('should throw an error when function has been called once', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    expect(() =>
                        mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasNotCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called 0 times but it was called 1 times with matching parameters and 1 times in total.`,
                    );
                });

                it('should throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    expect(() =>
                        mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasNotCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called 0 times but it was called 3 times with matching parameters and 3 times in total.`,
                    );
                });

                it('should not throw an error when function has not been called', () => {
                    mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasNotCalled();
                });
            });

            describe('wasCalled(0)', () => {
                it('should throw an error when function has been called once', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    expect(() =>
                        mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled(0),
                    ).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called 0 times but it was called 1 times with matching parameters and 1 times in total.`,
                    );
                });

                it('should throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    expect(() =>
                        mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled(0),
                    ).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called 0 times but it was called 3 times with matching parameters and 3 times in total.`,
                    );
                });

                it('should not throw an error when function has not been called', () => {
                    mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled(0);
                });
            });

            describe('wasCalledOnce', () => {
                it('should not throw an error when function has been called once', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalledOnce();
                });

                it('should throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    expect(() =>
                        mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalledOnce(),
                    ).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called 1 times but it was called 3 times with matching parameters and 3 times in total.`,
                    );
                });

                it('should throw an error when function has not been called', () => {
                    expect(() =>
                        mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalledOnce(),
                    ).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called 1 times but it was called 0 times with matching parameters and 0 times in total.`,
                    );
                });
            });

            describe('wasCalled(1)', () => {
                it('should not throw an error when function has been called once', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled(1);
                });

                it('should throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    expect(() =>
                        mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled(1),
                    ).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called 1 times but it was called 3 times with matching parameters and 3 times in total.`,
                    );
                });

                it('should throw an error when function has not been called', () => {
                    expect(() =>
                        mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled(1),
                    ).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called 1 times but it was called 0 times with matching parameters and 0 times in total.`,
                    );
                });
            });

            describe('wasCalled(2)', () => {
                it('should throw an error when function has been called once', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    expect(() =>
                        mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called 2 times but it was called 1 times with matching parameters and 1 times in total.`,
                    );
                });

                it('should not throw an error when function has been called twice', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled(2);
                });

                it('should throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();
                    mocked.mockConstructor.functionWithNoParamsAndNoReturn();

                    expect(() =>
                        mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called 2 times but it was called 3 times with matching parameters and 3 times in total.`,
                    );
                });

                it('should throw an error when function has not been called', () => {
                    expect(() =>
                        mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithNoParamsAndNoReturn" to be called 2 times but it was called 0 times with matching parameters and 0 times in total.`,
                    );
                });
            });
        });

        describe('assertion with parameters', () => {
            beforeEach(() => {
                mocked.setup(setupStaticFunction('functionWithParamsAndReturn'));
            });

            describe('wasCalled()', () => {
                it('should not throw an error when function has been called once with matching params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    mocked
                        .withStaticFunction('functionWithParamsAndReturn')
                        .withParameters('one', 123, true)
                        .wasCalled();
                });

                it(`should throw an error when function has been called once with "two" instaed of "one"`, () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called with params ["one", 123, true] but it was not.`,
                    );
                });

                it(`should throw an error when function has been called once with "456" instaed of "123"`, () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called with params ["one", 123, true] but it was not.`,
                    );
                });

                it(`should throw an error when function has been called once with "false" instaed of "true"`, () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, false);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called with params ["one", 123, true] but it was not.`,
                    );
                });

                it('should throw an error when function has been called once with missing parameters', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one');

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called with params ["one", 123, true] but it was not.`,
                    );
                });

                it('should not throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    mocked
                        .withStaticFunction('functionWithParamsAndReturn')
                        .withParameters('one', 123, true)
                        .wasCalled();
                });

                it('should throw an error when function has not been called', () => {
                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called with params ["one", 123, true] but it was not.`,
                    );
                });
            });

            describe('wasNotCalled()', () => {
                it('should throw an error when function has been called once with matching parameters', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasNotCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 0 times with params ["one", 123, true] but it was called 1 times with matching parameters and 1 times in total \n[\n["one",123,true]\n].`,
                    );
                });

                it('should not throw an error when function has been called once with different parameters', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);

                    mocked.withStaticFunction('functionWithParamsAndReturn').withParameters('one', 123, true);
                });

                it('should throw an error when function has been called multiple times with matching params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasNotCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 0 times with params ["one", 123, true] but it was called 3 times with matching parameters and 3 times in total \n[\n["one",123,true]\n["one",123,true]\n["one",123,true]\n].`,
                    );
                });

                it('should not throw an error when function has not been called', () => {
                    mocked.withStaticFunction('functionWithParamsAndReturn').withParameters('one', 123, true);
                });
            });

            describe('wasCalledOnce()', () => {
                it('should not throw an error when function has been called once with matching parameters', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    mocked
                        .withStaticFunction('functionWithParamsAndReturn')
                        .withParameters('one', 123, true)
                        .wasCalledOnce();
                });

                it('should not throw an error when function has been called once with matching parameters and many times with other params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, false);

                    mocked
                        .withStaticFunction('functionWithParamsAndReturn')
                        .withParameters('one', 123, true)
                        .wasCalledOnce();
                });

                it('should throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasCalledOnce(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 1 times with params ["one", 123, true] but it was called 3 times with matching parameters and 3 times in total \n[\n["one",123,true]\n["one",123,true]\n["one",123,true]\n].`,
                    );
                });

                it('should throw an error when function has not been called with matching params but multiple times with other params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, false);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasCalledOnce(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 1 times with params ["one", 123, true] but it was called 0 times with matching parameters and 3 times in total \n[\n["two",123,true]\n["one",456,true]\n["one",456,false]\n].`,
                    );
                });
            });

            describe('wasCalled(2)', () => {
                it('should throw an error when function has been called once with correct parameters', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, false);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 2 times with params ["one", 123, true] but it was called 1 times with matching parameters and 4 times in total \n[\n["one",123,true]\n["two",123,true]\n["one",456,true]\n["one",456,false]\n].`,
                    );
                });

                it('should throw an error when function has been called twice with incorrect params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 2 times with params ["one", 123, true] but it was called 0 times with matching parameters and 2 times in total \n[\n["two",123,true]\n["one",456,true]\n].`,
                    );
                });

                it('should not throw an error when function has been called twice with correct params and multiple times with different params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, false);

                    mocked
                        .withStaticFunction('functionWithParamsAndReturn')
                        .withParameters('one', 123, true)
                        .wasCalled(2);
                });

                it('should throw an error when function has been called multiple times with matching params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 2 times with params ["one", 123, true] but it was called 3 times with matching parameters and 3 times in total \n[\n["one",123,true]\n["one",123,true]\n["one",123,true]\n].`,
                    );
                });

                it('should throw an error when function has not been called with matching params but has been called with different params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, false);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 2 times with params ["one", 123, true] but it was called 0 times with matching parameters and 3 times in total \n[\n["two",123,true]\n["one",456,true]\n["one",456,false]\n].`,
                    );
                });
            });
        });

        describe('assertion with params and explicit', () => {
            beforeEach(() => {
                mocked.setup(setupStaticFunction('functionWithParamsAndReturn'));
            });

            describe('wasNotCalled()', () => {
                it('should throw an error when function has been called once with matching parameters', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .strict()
                            .wasNotCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 0 times with params ["one", 123, true] and 0 times with any other parameters but it was called 1 times with matching parameters and 1 times in total \n[\n["one",123,true]\n].`,
                    );
                });

                it('should throw an error when function has been called once with different parameters', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .strict()
                            .wasNotCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 0 times with params ["one", 123, true] and 0 times with any other parameters but it was called 0 times with matching parameters and 1 times in total \n[\n["two",123,true]\n].`,
                    );
                });

                it('should throw an error when function has been called multiple times with matching params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .strict()
                            .wasNotCalled(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 0 times with params ["one", 123, true] and 0 times with any other parameters but it was called 3 times with matching parameters and 3 times in total \n[\n["one",123,true]\n["one",123,true]\n["one",123,true]\n].`,
                    );
                });

                it('should not throw an error when function has not been called', () => {
                    mocked
                        .withStaticFunction('functionWithParamsAndReturn')
                        .withParameters('one', 123, true)
                        .strict()
                        .wasNotCalled();
                });
            });

            describe('wasCalledOnce()', () => {
                it('should not throw an error when function has been called once with matching parameters', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    mocked
                        .withStaticFunction('functionWithParamsAndReturn')
                        .withParameters('one', 123, true)
                        .strict()
                        .wasCalledOnce();
                });

                it('should throw an error when function has been called once with matching parameters and many times with other params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, false);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .strict()
                            .wasCalledOnce(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 1 times with params ["one", 123, true] and 0 times with any other parameters but it was called 1 times with matching parameters and 4 times in total \n[\n["one",123,true]\n["two",123,true]\n["one",456,true]\n["one",456,false]\n].`,
                    );
                });

                it('should throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .strict()
                            .wasCalledOnce(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 1 times with params ["one", 123, true] and 0 times with any other parameters but it was called 3 times with matching parameters and 3 times in total \n[\n["one",123,true]\n["one",123,true]\n["one",123,true]\n].`,
                    );
                });

                it('should throw an error when function has not been called with matching params but multiple times with other params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, false);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .strict()
                            .wasCalledOnce(),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 1 times with params ["one", 123, true] and 0 times with any other parameters but it was called 0 times with matching parameters and 3 times in total \n[\n["two",123,true]\n["one",456,true]\n["one",456,false]\n].`,
                    );
                });
            });

            describe('wasCalled(2)', () => {
                it('should throw an error when function has been called once with correct parameters', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, false);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .strict()
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 2 times with params ["one", 123, true] and 0 times with any other parameters but it was called 1 times with matching parameters and 4 times in total \n[\n["one",123,true]\n["two",123,true]\n["one",456,true]\n["one",456,false]\n].`,
                    );
                });

                it('should throw an error when function has been called twice with incorrect params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .strict()
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 2 times with params ["one", 123, true] and 0 times with any other parameters but it was called 0 times with matching parameters and 2 times in total \n[\n["two",123,true]\n["one",456,true]\n].`,
                    );
                });

                it('should throw an error when function has been called twice with correct params and multiple times with different params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, false);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .strict()
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 2 times with params ["one", 123, true] and 0 times with any other parameters but it was called 2 times with matching parameters and 5 times in total \n[\n["one",123,true]\n["one",123,true]\n["two",123,true]\n["one",456,true]\n["one",456,false]\n].`,
                    );
                });

                it('should throw an error when function has been called multiple times with matching params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 123, true);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .strict()
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 2 times with params ["one", 123, true] and 0 times with any other parameters but it was called 3 times with matching parameters and 3 times in total \n[\n["one",123,true]\n["one",123,true]\n["one",123,true]\n].`,
                    );
                });

                it('should throw an error when function has not been called with matching params but has been called with different params', () => {
                    mocked.mockConstructor.functionWithParamsAndReturn('two', 123, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, true);
                    mocked.mockConstructor.functionWithParamsAndReturn('one', 456, false);

                    expect(() =>
                        mocked
                            .withStaticFunction('functionWithParamsAndReturn')
                            .withParameters('one', 123, true)
                            .strict()
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static function "functionWithParamsAndReturn" to be called 2 times with params ["one", 123, true] and 0 times with any other parameters but it was called 0 times with matching parameters and 3 times in total \n[\n["two",123,true]\n["one",456,true]\n["one",456,false]\n].`,
                    );
                });
            });
        });

        it('should count static and non static separately', () => {
            mocked.setup(setupFunction('functionWithNoParamsAndNoReturn'));
            mocked.setup(setupStaticFunction('functionWithNoParamsAndNoReturn'));

            mocked.mockConstructor.functionWithNoParamsAndNoReturn();
            mocked.mockConstructor.functionWithNoParamsAndNoReturn();

            mocked.mock.functionWithNoParamsAndNoReturn();
            mocked.mock.functionWithNoParamsAndNoReturn();
            mocked.mock.functionWithNoParamsAndNoReturn();

            mocked.withFunction('functionWithNoParamsAndNoReturn').wasCalled(3);
            mocked.withStaticFunction('functionWithNoParamsAndNoReturn').wasCalled(2);
        });
    });

    describe('defineStaticProperty', () => {
        it('called directly on mock instance', () => {
            mocked.setup(defineStaticProperty('propertyOne'));

            get(mocked.mockConstructor.propertyOne);

            mocked.withStaticGetter('propertyOne').wasCalled();
        });

        it('called on checker returned from setup function', () => {
            const verifier = mocked.defineStaticProperty('propertyOne');

            get(mocked.mockConstructor.propertyOne);

            verifier.wasCalled();
        });
    });

    describe('withStaticGetter', () => {
        it('called directly on mock instance', () => {
            mocked.setup(setupStaticProperty('propertyOne'));

            get(mocked.mockConstructor.propertyOne);

            mocked.withStaticGetter('propertyOne').wasCalled();
        });

        it('called on checker returned from setup function', () => {
            const verifier = mocked.setupStaticProperty('propertyOne');

            get(mocked.mockConstructor.propertyOne);

            verifier.wasCalled();
        });

        describe('call count assertion', () => {
            beforeEach(() => {
                mocked.setup(setupStaticProperty('propertyOne'));
            });

            describe('wasCalled()', () => {
                it('should not throw an error when getter has been called once', () => {
                    get(mocked.mockConstructor.propertyOne);

                    mocked.withStaticGetter('propertyOne').wasCalled();
                });

                it('should not throw an error when getter has been called multiple times', () => {
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);

                    mocked.withStaticGetter('propertyOne').wasCalled();
                });

                it('should throw an error when getter has not been called', () => {
                    expect(() => mocked.withStaticGetter('propertyOne').wasCalled()).toThrowError(
                        `Expected static property "propertyOne" getter to be called but it was not.`,
                    );
                });
            });

            describe('wasNotCalled()', () => {
                it('should throw an error when getter has been called once', () => {
                    get(mocked.mockConstructor.propertyOne);

                    expect(() => mocked.withStaticGetter('propertyOne').wasNotCalled()).toThrowError(
                        `Expected static property "propertyOne" getter to be called 0 times but it was called 1 times with matching parameters and 1 times in total.`,
                    );
                });

                it('should throw an error when getter has been called multiple times', () => {
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);

                    expect(() => mocked.withStaticGetter('propertyOne').wasNotCalled()).toThrowError(
                        `Expected static property "propertyOne" getter to be called 0 times but it was called 3 times with matching parameters and 3 times in total.`,
                    );
                });

                it('should not throw an error when getter has not been called', () => {
                    mocked.withStaticGetter('propertyOne').wasNotCalled();
                });
            });

            describe('wasCalled(0)', () => {
                it('should throw an error when getter has been called once', () => {
                    get(mocked.mockConstructor.propertyOne);

                    expect(() => mocked.withStaticGetter('propertyOne').wasCalled(0)).toThrowError(
                        `Expected static property "propertyOne" getter to be called 0 times but it was called 1 times with matching parameters and 1 times in total.`,
                    );
                });

                it('should throw an error when getter has been called multiple times', () => {
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);

                    expect(() => mocked.withStaticGetter('propertyOne').wasCalled(0)).toThrowError(
                        `Expected static property "propertyOne" getter to be called 0 times but it was called 3 times with matching parameters and 3 times in total.`,
                    );
                });

                it('should not throw an error when getter has not been called', () => {
                    mocked.withStaticGetter('propertyOne').wasCalled(0);
                });
            });

            describe('wasCalledOnce', () => {
                it('should not throw an error when getter has been called once', () => {
                    get(mocked.mockConstructor.propertyOne);

                    mocked.withStaticGetter('propertyOne').wasCalledOnce();
                });

                it('should throw an error when getter has been called multiple times', () => {
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);

                    expect(() => mocked.withStaticGetter('propertyOne').wasCalledOnce()).toThrowError(
                        `Expected static property "propertyOne" getter to be called 1 times but it was called 3 times with matching parameters and 3 times in total.`,
                    );
                });

                it('should throw an error when getter has not been called', () => {
                    expect(() => mocked.withStaticGetter('propertyOne').wasCalledOnce()).toThrowError(
                        `Expected static property "propertyOne" getter to be called 1 times but it was called 0 times with matching parameters and 0 times in total.`,
                    );
                });
            });

            describe('wasCalled(1)', () => {
                it('should not throw an error when getter has been called once', () => {
                    get(mocked.mockConstructor.propertyOne);

                    mocked.withStaticGetter('propertyOne').wasCalled(1);
                });

                it('should throw an error when getter has been called multiple times', () => {
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);

                    expect(() => mocked.withStaticGetter('propertyOne').wasCalled(1)).toThrowError(
                        `Expected static property "propertyOne" getter to be called 1 times but it was called 3 times with matching parameters and 3 times in total.`,
                    );
                });

                it('should throw an error when getter has not been called', () => {
                    expect(() => mocked.withStaticGetter('propertyOne').wasCalled(1)).toThrowError(
                        `Expected static property "propertyOne" getter to be called 1 times but it was called 0 times with matching parameters and 0 times in total.`,
                    );
                });
            });

            describe('wasCalled(2)', () => {
                it('should throw an error when getter has been called once', () => {
                    get(mocked.mockConstructor.propertyOne);

                    expect(() => mocked.withStaticGetter('propertyOne').wasCalled(2)).toThrowError(
                        `Expected static property "propertyOne" getter to be called 2 times but it was called 1 times with matching parameters and 1 times in total.`,
                    );
                });

                it('should not throw an error when getter has been called twice', () => {
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);

                    mocked.withStaticGetter('propertyOne').wasCalled(2);
                });

                it('should throw an error when getter has been called multiple times', () => {
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);
                    get(mocked.mockConstructor.propertyOne);

                    expect(() => mocked.withStaticGetter('propertyOne').wasCalled(2)).toThrowError(
                        `Expected static property "propertyOne" getter to be called 2 times but it was called 3 times with matching parameters and 3 times in total.`,
                    );
                });

                it('should throw an error when getter has not been called', () => {
                    expect(() => mocked.withStaticGetter('propertyOne').wasCalled(2)).toThrowError(
                        `Expected static property "propertyOne" getter to be called 2 times but it was called 0 times with matching parameters and 0 times in total.`,
                    );
                });
            });
        });

        it('should count static and non static separately', () => {
            mocked.setup(setupProperty('propertyOne'));
            mocked.setup(setupStaticProperty('propertyOne'));

            get(mocked.mockConstructor.propertyOne);
            get(mocked.mockConstructor.propertyOne);

            get(mocked.mock.propertyOne);
            get(mocked.mock.propertyOne);
            get(mocked.mock.propertyOne);

            mocked.withGetter('propertyOne').wasCalled(3);
            mocked.withStaticGetter('propertyOne').wasCalled(2);
        });
    });

    describe('withStaticSetter', () => {
        describe('assertion with parameters', () => {
            beforeEach(() => {
                mocked.setup(defineStaticProperty('propertyOne'));
            });

            describe('wasCalled()', () => {
                it('should not throw an error when function has been called once with matching params', () => {
                    mocked.mockConstructor.propertyOne = 'one';

                    mocked
                        .withStaticSetter('propertyOne')
                        .withParameters('one')
                        .wasCalled();
                });

                it(`should throw an error when function has been called once with "two" instead of "one"`, () => {
                    mocked.mockConstructor.propertyOne = 'two';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .wasCalled(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set with params ["one"] but it was not.`,
                    );
                });

                it('should not throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';

                    mocked
                        .withStaticSetter('propertyOne')
                        .withParameters('one')
                        .wasCalled();
                });

                it('should throw an error when function has not been called', () => {
                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .wasCalled(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set with params ["one"] but it was not.`,
                    );
                });
            });

            describe('wasNotCalled()', () => {
                it('should throw an error when function has been called once with matching parameters', () => {
                    mocked.mockConstructor.propertyOne = 'one';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .wasNotCalled(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 0 times with params ["one"] but it was called 1 times with matching parameters and 1 times in total \n[\n["one"]\n].`,
                    );
                });

                it('should not throw an error when function has been called once with different parameters', () => {
                    mocked.mockConstructor.propertyOne = 'one';

                    mocked.withStaticSetter('propertyOne').withParameters('one');
                });

                it('should throw an error when function has been called multiple times with matching params', () => {
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .wasNotCalled(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 0 times with params ["one"] but it was called 3 times with matching parameters and 3 times in total \n[\n["one"]\n["one"]\n["one"]\n].`,
                    );
                });

                it('should not throw an error when function has not been called', () => {
                    mocked.withStaticSetter('propertyOne').withParameters('one');
                });
            });

            describe('wasCalledOnce()', () => {
                it('should not throw an error when function has been called once with matching parameters', () => {
                    mocked.mockConstructor.propertyOne = 'one';

                    mocked
                        .withStaticSetter('propertyOne')
                        .withParameters('one')
                        .wasCalledOnce();
                });

                it('should not throw an error when function has been called once with matching parameters and many times with other params', () => {
                    mocked.mockConstructor.propertyOne = 'one';

                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';
                    mocked.mockConstructor.propertyOne = 'four';

                    mocked
                        .withStaticSetter('propertyOne')
                        .withParameters('one')
                        .wasCalledOnce();
                });

                it('should throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .wasCalledOnce(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 1 times with params ["one"] but it was called 3 times with matching parameters and 3 times in total \n[\n["one"]\n["one"]\n["one"]\n].`,
                    );
                });

                it('should throw an error when function has not been called with matching params but multiple times with other params', () => {
                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';
                    mocked.mockConstructor.propertyOne = 'four';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .wasCalledOnce(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 1 times with params ["one"] but it was called 0 times with matching parameters and 3 times in total \n[\n["two"]\n["three"]\n["four"]\n].`,
                    );
                });
            });

            describe('wasCalled(2)', () => {
                it('should throw an error when function has been called once with correct parameters', () => {
                    mocked.mockConstructor.propertyOne = 'one';

                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';
                    mocked.mockConstructor.propertyOne = 'four';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 2 times with params ["one"] but it was called 1 times with matching parameters and 4 times in total \n[\n["one"]\n["two"]\n["three"]\n["four"]\n].`,
                    );
                });

                it('should throw an error when function has been called twice with incorrect params', () => {
                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 2 times with params ["one"] but it was called 0 times with matching parameters and 2 times in total \n[\n["two"]\n["three"]\n].`,
                    );
                });

                it('should not throw an error when function has been called twice with correct params and multiple times with different params', () => {
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';

                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';
                    mocked.mockConstructor.propertyOne = 'four';

                    mocked
                        .withStaticSetter('propertyOne')
                        .withParameters('one')
                        .wasCalled(2);
                });

                it('should throw an error when function has been called multiple times with matching params', () => {
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 2 times with params ["one"] but it was called 3 times with matching parameters and 3 times in total \n[\n["one"]\n["one"]\n["one"]\n].`,
                    );
                });

                it('should throw an error when function has not been called with matching params but has been called with different params', () => {
                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';
                    mocked.mockConstructor.propertyOne = 'four';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 2 times with params ["one"] but it was called 0 times with matching parameters and 3 times in total \n[\n["two"]\n["three"]\n["four"]\n].`,
                    );
                });
            });
        });

        describe('assertion with params and explicit', () => {
            beforeEach(() => {
                mocked.setup(setupStaticProperty('propertyOne'));
            });

            describe('wasNotCalled()', () => {
                it('should throw an error when function has been called once with matching parameters', () => {
                    mocked.mockConstructor.propertyOne = 'one';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .strict()
                            .wasNotCalled(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 0 times with params ["one"] and 0 times with any other parameters but it was called 1 times with matching parameters and 1 times in total \n[\n["one"]\n].`,
                    );
                });

                it('should throw an error when function has been called once with different parameters', () => {
                    mocked.mockConstructor.propertyOne = 'two';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .strict()
                            .wasNotCalled(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 0 times with params ["one"] and 0 times with any other parameters but it was called 0 times with matching parameters and 1 times in total \n[\n["two"]\n].`,
                    );
                });

                it('should throw an error when function has been called multiple times with matching params', () => {
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .strict()
                            .wasNotCalled(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 0 times with params ["one"] and 0 times with any other parameters but it was called 3 times with matching parameters and 3 times in total \n[\n["one"]\n["one"]\n["one"]\n].`,
                    );
                });

                it('should not throw an error when function has not been called', () => {
                    mocked
                        .withStaticSetter('propertyOne')
                        .withParameters('one')
                        .strict()
                        .wasNotCalled();
                });
            });

            describe('wasCalledOnce()', () => {
                it('should not throw an error when function has been called once with matching parameters', () => {
                    mocked.mockConstructor.propertyOne = 'one';

                    mocked
                        .withStaticSetter('propertyOne')
                        .withParameters('one')
                        .strict()
                        .wasCalledOnce();
                });

                it('should throw an error when function has been called once with matching parameters and many times with other params', () => {
                    mocked.mockConstructor.propertyOne = 'one';

                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';
                    mocked.mockConstructor.propertyOne = 'four';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .strict()
                            .wasCalledOnce(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 1 times with params ["one"] and 0 times with any other parameters but it was called 1 times with matching parameters and 4 times in total \n[\n["one"]\n["two"]\n["three"]\n["four"]\n].`,
                    );
                });

                it('should throw an error when function has been called multiple times', () => {
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .strict()
                            .wasCalledOnce(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 1 times with params ["one"] and 0 times with any other parameters but it was called 3 times with matching parameters and 3 times in total \n[\n["one"]\n["one"]\n["one"]\n].`,
                    );
                });

                it('should throw an error when function has not been called with matching params but multiple times with other params', () => {
                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';
                    mocked.mockConstructor.propertyOne = 'four';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .strict()
                            .wasCalledOnce(),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 1 times with params ["one"] and 0 times with any other parameters but it was called 0 times with matching parameters and 3 times in total \n[\n["two"]\n["three"]\n["four"]\n].`,
                    );
                });
            });

            describe('wasCalled(2)', () => {
                it('should throw an error when function has been called once with correct parameters', () => {
                    mocked.mockConstructor.propertyOne = 'one';

                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';
                    mocked.mockConstructor.propertyOne = 'four';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .strict()
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 2 times with params ["one"] and 0 times with any other parameters but it was called 1 times with matching parameters and 4 times in total \n[\n["one"]\n["two"]\n["three"]\n["four"]\n].`,
                    );
                });

                it('should throw an error when function has been called twice with incorrect params', () => {
                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .strict()
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 2 times with params ["one"] and 0 times with any other parameters but it was called 0 times with matching parameters and 2 times in total \n[\n["two"]\n["three"]\n].`,
                    );
                });

                it('should throw an error when function has been called twice with correct params and multiple times with different params', () => {
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';

                    mocked.mockConstructor.propertyOne = 'three';
                    mocked.mockConstructor.propertyOne = 'four';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .strict()
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 2 times with params ["one"] and 0 times with any other parameters but it was called 2 times with matching parameters and 4 times in total \n[\n["one"]\n["one"]\n["three"]\n["four"]\n].`,
                    );
                });

                it('should throw an error when function has been called multiple times with matching params', () => {
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';
                    mocked.mockConstructor.propertyOne = 'one';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .strict()
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 2 times with params ["one"] and 0 times with any other parameters but it was called 3 times with matching parameters and 3 times in total \n[\n["one"]\n["one"]\n["one"]\n].`,
                    );
                });

                it('should throw an error when function has not been called with matching params but has been called with different params', () => {
                    mocked.mockConstructor.propertyOne = 'two';
                    mocked.mockConstructor.propertyOne = 'three';
                    mocked.mockConstructor.propertyOne = 'four';

                    expect(() =>
                        mocked
                            .withStaticSetter('propertyOne')
                            .withParameters('one')
                            .strict()
                            .wasCalled(2),
                    ).toThrowError(
                        `Expected static property "propertyOne" to be set 2 times with params ["one"] and 0 times with any other parameters but it was called 0 times with matching parameters and 3 times in total \n[\n["two"]\n["three"]\n["four"]\n].`,
                    );
                });
            });
        });

        it('should count static and non static separately', () => {
            mocked.setup(setupProperty('propertyOne'));
            mocked.setup(setupStaticProperty('propertyOne'));

            mocked.mockConstructor.propertyOne = '';
            mocked.mockConstructor.propertyOne = '';

            mocked.mock.propertyOne = '';
            mocked.mock.propertyOne = '';
            mocked.mock.propertyOne = '';

            mocked.withSetter('propertyOne').wasCalled(3);
            mocked.withStaticSetter('propertyOne').wasCalled(2);
        });
    });

    describe('mockedStaticProperties', () => {
        it('should not be set before setup is called', () => {
            expect(mocked.mockConstructor.propertyOne).toBeUndefined();
        });

        it('should be set after setupStaticProperty is called', () => {
            mocked.setup(setupStaticProperty('propertyOne', 'mockedValue'));

            expect(mocked.mockConstructor.propertyOne).toEqual('mockedValue');
        });

        it('should be set after defineStaticProperty is called', () => {
            let mockedValue = 'mockedValue';

            mocked.setup(defineStaticProperty('propertyOne', () => mockedValue));

            expect(mocked.mockConstructor.propertyOne).toEqual('mockedValue');

            mockedValue = 'changed';

            expect(mocked.mockConstructor.propertyOne).toEqual('changed');
        });

        it('should call a setter when property set if one was defined', () => {
            const values: string[] = [];

            function setter(value: string) {
                values.push(value);
            }

            mocked.setup(defineStaticProperty('propertyOne', () => 'mockedValue', setter));

            expect(values).toEqual([]);
            mocked.mockConstructor.propertyOne = 'testOne';
            expect(values).toEqual(['testOne']);
            mocked.mockConstructor.propertyOne = 'testTwo';
            expect(values).toEqual(['testOne', 'testTwo']);
        });
    });

    describe('mockedStaticFunctions', () => {
        it('should not be defined on the mock before setup is called', () => {
            expect(mocked.mockConstructor.functionWithNoParamsAndReturnType).toBeUndefined();
        });

        it('should return undefined when a mocked function is called after setup with no mock implementation passed', () => {
            mocked.setup(setupStaticFunction('functionWithNoParamsAndReturnType'));

            expect(mocked.mockConstructor.functionWithNoParamsAndReturnType()).toBeUndefined();
        });

        it('should return mocked implementation return value when a mocked function is called after setup with mock implementation passed', () => {
            function mockFunction(paramOne: string, paramTwo?: number, paramThree?: boolean) {
                return `mockedReturnValue_${paramOne}_${paramTwo}_${paramThree}`;
            }

            mocked.setup(setupStaticFunction('functionWithParamsAndReturn', mockFunction));

            expect(mocked.mockConstructor.functionWithParamsAndReturn('one', 2, true)).toEqual(
                'mockedReturnValue_one_2_true',
            );
        });

        it('chaining setup functions should be supported', () => {
            const newMock = Mock.create<SampleMockedClass, typeof SampleMockedClass>().setup(
                setupStaticFunction('functionWithNoParamsAndNoReturn'),
                setupStaticFunction('functionWithNoParamsAndReturnType'),
                setupStaticFunction('functionWithParamsAndNoReturn'),
                setupStaticFunction('functionWithParamsAndReturn'),
            );

            newMock.mockConstructor.functionWithNoParamsAndNoReturn();
            newMock.mockConstructor.functionWithNoParamsAndReturnType();
            newMock.mockConstructor.functionWithParamsAndNoReturn('', 123, true);
            newMock.mockConstructor.functionWithParamsAndReturn('');
        });
    });
});

class SampleMockedClass {
    public static propertyOne: string = 'mocked';
    public static propertyTwo: number = 123;

    public propertyOne: string = '';

    // tslint:disable-next-line:no-empty
    constructor(_paramsOne: {}, _paramTwo: Date) {}

    // tslint:disable-next-line:no-empty
    public static functionWithNoParamsAndNoReturn(): void {}

    // tslint:disable-next-line:no-empty
    public functionWithNoParamsAndNoReturn(): void {}

    public static functionWithNoParamsAndReturnType(): string {
        return 'sampleReturnString';
    }

    // tslint:disable-next-line:no-empty
    public static functionWithParamsAndNoReturn(_paramOne: string, _paramTwo: number, _paramThree?: boolean) {}

    public static functionWithParamsAndReturn(paramOne: string, paramTwo?: number, paramThree?: boolean): string {
        return `sampleReturn_${paramOne}_${paramTwo}_${paramThree}`;
    }

    public static functionWithComplexParam(
        _param: { one: string; two: number },
        _two?: string,
        _three?: number,
        // tslint:disable-next-line:no-empty
    ): void {}
}
