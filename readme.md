# @morgan-stanley/ts-mocking-bird
> A fully type safe mocking, call verification and import replacement library that works with jasmine and jest

# Why use this?

* All operations fully type safe
* Mocks interfaces, existing objects and classes
* Mocks constructor, static functions, static properties as well as instance functions and properties
* Verifies function calls (with type safe parameter verification), as well as getter and setter calls
* Replaces imports (again, fully type safe)

# Framework support

This library has been extensively used with jasmine and has been tested without issue with jest. The mocking functionality should work in any environment as it has no dependencies on any particular framework. The import replacement functionality uses the jasmine `beforeAll` / `afterAll` and `beforeEach` / `afterEach` so will not work in other environments.

# Usage

```typescript
npm install @morgan-stanley/ts-mocking-bird
```

## Create a Mock

[Examples](spec/examples/exampleTests.spec.ts)

Creates a mock that is typed as `IMyService`. Properties and functions can be setup using `mockedService`. The actual mocked service is accessible at `mockedService.mock`.

```typescript
import {
    defineProperty,
    defineStaticProperty,
    IMocked,
    Mock,
    setupFunction,
    setupProperty,
    setupStaticFunction,
} from '@morgan-stanley/ts-mocking-bird';

const mockedService: IMocked<IMyService> = Mock.create<IMyService>().setup(
    setupFunction('functionOne'), // allows the function to be called and allows verification of calls
    setupFunction('functionTwo', (value: string) => (value === 'something' ? true : false)), // specifies return value
    setupProperty('propOne', 'initialValue'),
    defineProperty('propTwo', () => 'getter return value', (value: string) => console.log(`setter called: ${value}`)), // define getter and setter mocks
);

const systemUnderTest = new SUT(mockedService.mock); // pass mock instance to system under test
```

## Mocking a Class with Constructor and Statics

Creates a mock that has statics and can be instantiated using `new mockedService.mock()`.

```typescript
const mockedService = Mock.create<MyService, typeof MyService>().setup(
    setupStaticFunction('staticFunctionOne', () => 'mockedReturnValue'),
    defineStaticProperty('staticPropOne', () => 'mockedStaticGetter'),
);

const systemUnderTest = new ClassWithConstructorArgument(mockedService.mockConstructor); // pass mock constructor to system under test
```

## Verify Calls
[Examples](spec/examples/exampleTests.spec.ts)

### Verify that a function was called a number of times without checking parameters
```typescript
const mockedService: IMocked<IMyService> = Mock.create<IMyService>().setup(setupFunction('functionOne'));

const systemUnderTest = new ClassWithInstanceArgument(mockedService.mock);

mockedService.withFunction('functionOne').wasCalled(5);
```

### Verify that a function was called once with specific parameters:
```typescript
const mockedService: IMocked<IMyService> = Mock.create<IMyService>().setup(setupFunction('functionOne'));

const systemUnderTest = new ClassWithInstanceArgument(mockedService.mock);

mockedService
    .withFunction('functionTwo')
    .withParameters('someValue')
    .wasCalledOnce();
```

### Verify Getter:
```typescript
const mockedService: IMocked<IMyService> = Mock.create<IMyService>().setup(setupProperty('propOne'));

const systemUnderTest = new ClassWithInstanceArgument(mockedService.mock);

mockedService.withGetter('propOne').wasCalledOnce();
```

### Verify Setter:
```typescript
const mockedService: IMocked<IMyService> = Mock.create<IMyService>().setup(setupProperty('propOne'));

const systemUnderTest = new ClassWithInstanceArgument(mockedService.mock);

mockedService
    .withSetter('propOne')
    .withParameters('someValue')
    .wasCalledOnce();
```

### Verify that a function was called once and was not called any other times using strict:

If we use `strict()` we ensure that the function is ONLY called with the specified parameters

```typescript
const mockedService: IMocked<IMyService> = Mock.create<IMyService>().setup(setupFunction('functionTwo'));

const systemUnderTest = new ClassWithInstanceArgument(mockedService.mock);

systemUnderTest.functionsTwo('someValue');
systemUnderTest.functionsTwo('someOtherValue');

mockedService
    .withFunction('functionTwo')
    .withParameters('someValue')
    .strict()
    .wasCalledOnce(); // this will fail as called twice in total

mockedService
    .withFunction('functionTwo')
    .withParameters('someValue')
    .wasCalledOnce(); // this will pass as only called once with params 'someValue'
```

### Verify function calls using a function verifier returned from `myMock.setupFunction()`:
```typescript
const mockedService: IMocked<IMyService> = Mock.create<IMyService>();
const functionVerifier = mockedService.setupFunction('functionTwo');

const systemUnderTest = new ClassWithInstanceArgument(mockedService.mock);

functionVerifier.withParameters('someValue').wasCalledOnce();
```

## Verify Function Parameters
[Examples](spec/examples/exampleParameterMatcherTest.spec.ts)

### Verify that function parameters match using strict equality
```typescript
const sampleMock = Mock.create<ISampleMocked>().setup(setupFunction('functionOne'));

const sampleObject: IPerson = { name: 'Fred', id: 1 };
sampleMock.mock.functionOne('one', 2, sampleObject);

sampleMock
    .withFunction('functionOne')
    .withParameters('one', 2, sampleObject) // strict equality
    .wasCalledOnce();
```

### Verify that function parameter values are equal
```typescript
const sampleMock = Mock.create<ISampleMocked>().setup(setupFunction('functionOne'));

sampleMock.mock.functionOne('one', 2, { name: 'Fred', id: 1 });

sampleMock
    .withFunction('functionOne')
    .withParametersEqualTo('one', 2, { name: 'Fred', id: 1 }) // equals used to match
    .wasCalledOnce();
```

### Use alternate matchers
```typescript
import { toBeDefined, any } from "@morgan-stanley/ts-mocking-bird"

const sampleMock = Mock.create<ISampleMocked>().setup(setupFunction('functionOne'));

sampleMock.mock.functionOne('one', 2, { name: 'Fred', id: 1 });

sampleMock
    .withFunction('functionOne')
    .withParameters('one', toBeDefined(), any())
    .wasCalledOnce();
```

### Match values with a function
A function with a signature of `(value: T) => boolean` can be used to match a parameter value but this will not provide information about what the expected parameter value is in the test failure message.
```typescript
const sampleMock = Mock.create<ISampleMocked>().setup(setupFunction('functionOne'));

sampleMock.mock.functionOne('one', 2, { name: 'Fred', id: 1 });

sampleMock
    .withFunction('functionOne')
    .withParameters('one', 2, person => person.id === 1)
    .wasCalledOnce();
```

### Create a custom `IParameterMatcher` to create more informative failure messages
```typescript
const sampleMock = Mock.create<ISampleMocked>().setup(setupFunction('functionOne'));

sampleMock.mock.functionOne('one', 2, { name: 'Fred', id: 1 });

sampleMock
    .withFunction('functionOne')
    .withParameters(toBe('one'), toBe(2), {
        isExpectedValue: person => person.id === 1,
        expectedDisplayValue: 'Person with id 1', // Used to display expected parameter value in failure message
        parameterToString: person => `Person with id ${person.id}`, // Used to display value of actual parameters passed in failure message
    })
    .wasCalledOnce();
```

## Replace Imports
[Examples](spec/examples/exampleImportReplacementTest.spec.ts)

### Jest Modules

Using `proxyModule` we proxy all functions and constructors in a module so that they can be replaced at a later point. This allows us to create a new mock implementation of a class or function for each test run and means that concurrent tests are not polluted by the state of previous tests.
```typescript
import { proxyModule, registerMock, reset } from '@morgan-stanley/gpbit-torch-test-tools';

import * as originalModule from "modulePath";

const proxiedModule = proxyModule(originalModule);

describe("my-system-under-test", () => {

    mockImports(originalModule, proxiedModule);

    beforeEach(() => {
        const mockedClass = Mock.create<ClassToMock>();

        registerMock(proxiedModule, {ClassToMock: mockedClass})
    });

    afterEach(() => {
        reset(proxiedModule);
    })

});
```

Using `proxyJestModule` we register our proxied module with jest.

```typescript
import * as moduleProxy from "../../relative-import-path";

jest.mock('../../relative-import-path', () =>
    require('@morgan-stanley/gpbit-torch-test-tools').proxyJestModule(
        require.resolve('../../relative-import-path'),
    ),
);

describe("my-system-under-test", () => {

    beforeEach(() => {
        const mockedClass = Mock.create<ClassToMock>();

        registerMock(moduleProxy, {ClassToMock: mockedClass})
    });

    afterEach(() => {
        reset(proxiedModule);
    })

});
```
This works in a node environment (`replaceProperties` does not due to the way require works) and is a more reliable way of mocking imports as jest hoists this mocking code above all other imports so it is guaranteed to run before the members of the module are imported into the system under test. For this to work the following must be observed:

 * As the `jest.mock` function is hoisted it can't refer to any variables outside the function. This is why `require('@morgan-stanley/gpbit-torch-test-tools')` is used rather than using an existing import. The import path for the module must also be specified multiple times rather than using a variable for the same reason.
 * The path passed to `jest.mock`, passed to `proxyJestModule` and used to import the `moduleProxy` must all point to same location. For example if a barrel is being imported then all 3 paths must point to same barrel.
 * the path passed to `proxyJestModule` must either be an ambient import such as `fs` or `path`, a non relative import such as `@morgan-stanley/my-dependency-name` or it must be an absolute path. If a relative path such as `../../main/myImport` is used this path will not be resolvable from the `proxyJestModule` function. To get the absolute path use `require.resolve('../../relative-import-path')`



### Replace an imported function with a mocked function once at the start of your test

```typescript
import * as myImport from './exampleImports';

describe('replace imports', () => {
    const someFunctionMock = () => 'mockedReturnValue';

    replaceProperties(myImport, { someFunction: someFunctionMock });

    it('should replace function import', () => {
        const SUT = new ClassUsingImports('one', 2);

        expect(SUT.someFunctionCallingMockedImport()).toEqual('mockedReturnValue'); // value comes from mock above, not original import
    });
});
```

### Replace an imported function and a class and generate a new mock before each test run

```typescript
import * as myImport from './exampleImports';

describe('replace imports', () => {

    describe('create new mock before each test', () => {
        let mockService: IMocked<IMyService>;
        let mockPackage: IMocked<typeof myImport>;

        replacePropertiesBeforeEach(() => {
            mockService = Mock.create<IMyService>();
            mockPackage = Mock.create<typeof myImport>().setup(setupFunction('someFunction')); // recreate mocks for each test run to reset call counts

            return [{ package: myImport, mocks: { ...mockPackage.mock, MyService: mockService.mockConstructor } }];
        });

        it('so that we can assert number of calls', () => {
            const SUT = new ClassUsingImports('one', 2);

            expect(SUT.service).toBe(mockService.mock);
            mockPackage.withFunction('someFunction').wasNotCalled();

            SUT.someFunctionProxy();
            mockPackage.withFunction('someFunction').wasCalledOnce();
        });
    });
});
```

# Webpack 4 issues

If you get an error such as

```
TypeError: Cannot redefine property: BUILD_ID
```

This is most likely because webpack 4 uses `configurable:false` when defining properties on import objects. This means that we are unable to replace them when we want to mock them.

This situation is handled by this mocking library but for it to be fully effective the mocking library needs to be imported before any other code - in other words before webpack has a chance to create any import objects.

To do this simply import this library before you import your tests or any other code.

For example:

```typescript
import "@morgan-stanley/ts-mocking-bird"; // monkey patch Object.defineProperty before any other code runs

// Find all the tests.
const context = (require as any).context('./', true, /.spec.ts$/);
// And load the modules.
context.keys().map(context);
```

# Tasks
 * Add github to package json
 * Setup document generation / hosting
 * Setup travis CI build
 * Setup npm publishing

