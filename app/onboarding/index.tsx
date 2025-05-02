import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View className="flex-1  items-center justify-center bg-green-200">
      <Text>Open up App.js to startour app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
