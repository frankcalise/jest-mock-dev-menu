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

// Mock TurboModuleRegistry
// jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry');
// Mock NativeEventEmitter
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
// Mock Settings
jest.mock("react-native/Libraries/Settings/Settings", () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

// Define the callback type for measureInWindow
type MeasureInWindowCallback = (x: number, y: number, width: number, height: number) => void;

// Create a mock for measureInWindow
const mockMeasureInWindow = jest.fn<void, [MeasureInWindowCallback]>((callback) => {
  callback(10, 20, 100, 50); // Default mocked values
});

// Mock the View component to include measureInWindow
jest.mock("react-native", () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const RN = jest.requireActual<typeof import("react-native")>("react-native");
  return {
    ...RN,
    Dimensions: {
      get: jest.fn().mockReturnValue({ width: 750, height: 1334 }),
    },
    View: class extends RN.View {
      measureInWindow = mockMeasureInWindow;
    },
    NativeEventEmitter: jest.fn().mockImplementation(() => ({
      addListener: jest.fn(),
      removeAllListeners: jest.fn(),
      removeListener: jest.fn(),
      removeSubscription: jest.fn(),
    })),
  };
});
