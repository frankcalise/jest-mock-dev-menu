import { renderRouter, screen } from "expo-router/testing-library";

import TabLayout from "@/app/(tabs)/_layout";
import TabExploreScreen from "@/app/(tabs)/explore";
import TabHomeScreen from "@/app/(tabs)/index";
import RootLayout from "@/app/_layout";

describe("<HomeScreen />", () => {
  test("Text renders correctly on HomeScreen", () => {
    renderRouter(
      {
        "/apps/_layout": () => <RootLayout />,
        "(tabs)/_layout": () => <TabLayout />,
        "(tabs)/index": () => <TabHomeScreen />,
        "(tabs)/explore": () => <TabExploreScreen />,
      },
      {
        initialUrl: "/",
      }
    );

    expect(screen.getByText("Welcome!")).toBeOnTheScreen();
  });
});
