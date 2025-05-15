import "react-native-gesture-handler/jestSetup";
// import '@testing-library/jest-native/extend-expect';

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  /**
   * This didn't work, had to go to `node_modules/react-native-reanimated/mock.js` and
   * add useScrollViewOffset: () => ({ value: 0 }),
   */
  // Reanimated.useScrollViewOffset = () => ({
  //   value: 0,
  // });

  return Reanimated;
});

jest.mock("expo-font");
