import { Image, Text, View } from "react-native";

function Navbar() {
  return (
    <View className="flex-row w-full items-center justify-center bg-white px-6 py-4 shadow-md rounded-b-xl">
      <Image
        source={require("../../assets/avatar.png")}
        className="w-6 h-6 rounded-full border border-gray-300 mr-6"
      />

      <View className="flex-row justify-end  flex-1 space-x-5">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/Expensive.svg")}
            className="w-6 h-6"
          />
          <Text className="text-base font-semibold text-black">957</Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/coin.png")}
            className="w-6 h-6"
          />
          <Text className="text-base font-semibold text-black">250</Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/Heart.svg")}
            className="w-6 h-6"
          />
          <Text className="text-base font-semibold text-black">5</Text>
        </View>
      </View>
    </View>
  );
}

export default Navbar;
