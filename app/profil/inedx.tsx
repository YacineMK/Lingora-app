import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-white">
      {/* Background Image */}
      <View style={styles.backgroundContainer}>
        <Image
          source={require("../../presentation/assets/Character.png")}
          style={styles.backgroundImage}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View
        className="flex-1 justify-between p-6"
        style={styles.contentContainer}
      >
        {/* Top Space - For potential header elements */}
        <View className="items-center">
          <Text className="text-2xl font-bold text-gray-800">
            Andrew Ainsley
          </Text>
          <Text className="text-gray-500">#0001</Text>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-around">
          <View className="items-center">
            <Text className="text-3xl font-bold text-gray-800">1,536</Text>
            <Text className="text-gray-500">Amis</Text>
          </View>
          <View className="items-center">
            <Text className="text-3xl font-bold text-gray-800">15,274</Text>
            <Text className="text-gray-500">Points</Text>
          </View>
        </View>

        {/* Buttons */}
        <View className="space-y-4">
          <TouchableOpacity
            className="flex-row items-center p-4 bg-gray-100 rounded-lg"
            activeOpacity={0.7}
          >
            <Text className="ml-2 text-lg text-gray-800">Ajouter amis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center p-4 bg-gray-100 rounded-lg"
            activeOpacity={0.7}
          >
            <Text className="ml-2 text-lg text-gray-800">Notifications</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: width * 0.8,
    height: height * 0.6,
    opacity: 0.7,
  },
  contentContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
});

export default ProfileScreen;
