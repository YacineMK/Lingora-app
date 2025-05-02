import Bottombar from "@presentation/components/layout/bottombar";
import Navbar from "@presentation/components/layout/navbar";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Stack screenOptions={{ headerShown: false }} />
      <Bottombar />
    </>
  );
}
