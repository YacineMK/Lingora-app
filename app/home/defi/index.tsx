import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

export default function MatchScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const scale = useSharedValue(1);
  const glow = useSharedValue(0);
  const rotation = useSharedValue(0);

  // Loading animation
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false,
    );

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!isLoading) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("../game/index");
            return 0;
          }
          return prev - 1;
        });
      }, 1500);
      return () => clearInterval(timer);
    }
  }, [isLoading]);

  // VS animations
  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    glow.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    shadowColor: "#7EFF1B",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glow.value * 0.8,
    shadowRadius: 10,
  }));

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <StatusBar style="dark" />
        <Animated.View style={spinStyle} className="mb-6">
          <View className="w-20 h-20 rounded-full border-4 border-[#7EFF1B] border-t-transparent" />
        </Animated.View>
        <Text className="text-black text-lg">Finding opponent...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <StatusBar style="dark" />

      <View className="flex-row justify-between w-full mb-12">
        {/* Player 1 */}
        <View className="items-center">
          <Animated.View entering={FadeIn.duration(500)}>
            <Image
              source={require("../../../presentation/assets/Ellipse.png")}
              className="w-24 h-24 rounded-full border-4 border-[#7EFF1B]"
            />
          </Animated.View>
          <Animated.Text
            entering={SlideInDown.duration(700).delay(200)}
            className="text-black text-xl font-bold mt-3"
          >
            You
          </Animated.Text>
        </View>

        {/* VS Badge with countdown */}
        <View className="absolute left-1/2 -translate-x-1/2 mt-8">
          <Animated.View
            style={[glowStyle, pulseStyle]}
            className="w-20 h-20 rounded-full items-center justify-center bg-white"
          >
            <Text className="text-black text-2xl font-bold">{countdown}</Text>
          </Animated.View>
        </View>

        {/* Player 2 */}
        <View className="items-center">
          <Animated.View entering={FadeIn.duration(500).delay(200)}>
            <Image
              source={require("../../../presentation/assets/Ellipse2.png")}
              className="w-24 h-24 rounded-full border-4 border-[#7EFF1B]"
            />
          </Animated.View>
          <Animated.Text
            entering={SlideInDown.duration(700).delay(300)}
            className="text-black text-xl font-bold mt-3"
          >
            Hiki
          </Animated.Text>
        </View>
      </View>

      <Animated.View entering={FadeIn.delay(800)} className="mt-10">
        <Pressable
          onPress={() => router.push("../game/index")}
          className="bg-[#7EFF1B] py-4 px-12 rounded-full"
        >
          <Text className="text-white text-xl font-bold">START GAME</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
