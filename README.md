# React Native Jest Reproducer

This project reproduces an error seen when mocking parts of `react-native` while using `requireActual` as well.

## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Start the app

   ```bash
   pnpm run test
   ```

3. Observe the following error

![image](https://github.com/user-attachments/assets/4ad9190e-9085-4a2e-a5a5-03b465367813)

## Edits to make the test pass

1. Open `./node_modules/react-native/jest/setup.js`
2. Add a new property for `DevMenu` under the mock for `NativeModules` such as:

```js
DevMenu: {
   reload: jest.fn(),
},
```

3.  Observe the test passes
