import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import {
  Svg,
  Path,
  Circle,
  Rect,
  G,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

const AchievementPage = () => {
  const achievements = [
    {
      id: 1,
      title: "Master Learner",
      type: "trophy",
      date: "Jan 2023",
      locked: false,
      progress: 100,
    },
    {
      id: 2,
      title: "Perfect Score",
      type: "certificate",
      date: "Mar 2023",
      locked: false,
      progress: 100,
    },
    {
      id: 3,
      title: "100 Days Streak",
      type: "trophy",
      date: "Jun 2023",
      locked: false,
      progress: 100,
    },
    {
      id: 4,
      title: "Community Hero",
      type: "certificate",
      date: "Coming Soon",
      locked: true,
      progress: 65,
    },
    {
      id: 5,
      title: "Elite Rank",
      type: "trophy",
      date: "Coming Soon",
      locked: true,
      progress: 30,
    },
  ];

  const animatedValues = achievements.map(() => new Animated.Value(0));

  React.useEffect(() => {
    const animations = achievements.map((_, index) => {
      return Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 800,
        delay: index * 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      });
    });

    Animated.stagger(200, animations).start();
  }, []);

  const TrophyIcon = ({ size = 60, locked = false }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFD700" />
          <Stop offset="50%" stopColor="#FFC600" />
          <Stop offset="100%" stopColor="#FFA500" />
        </LinearGradient>
        <LinearGradient id="trophyLocked" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#e0e0e0" />
          <Stop offset="100%" stopColor="#b0b0b0" />
        </LinearGradient>
      </Defs>
      <G fill={locked ? "url(#trophyLocked)" : "url(#trophyGrad)"}>
        <Path d="M21 4h-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v3a4 4 0 0 0 4 4h1.18A3 3 0 0 0 9 14.82V17h-.5a2.5 2.5 0 0 0 0 5h7a2.5 2.5 0 0 0 0-5H15v-2.18A3 3 0 0 0 17.82 12H19a4 4 0 0 0 4-4V5a1 1 0 0 0-1-1zM6 10a2 2 0 0 1-2-2V6h2v4zm14-2a2 2 0 0 1-2 2V6h2v2z" />
        {!locked && (
          <>
            <Path d="M12 10l1 3h-2z" fill="#fff" opacity="0.7" />
            <Circle cx="12" cy="8" r="1" fill="#fff" opacity="0.7" />
          </>
        )}
      </G>
    </Svg>
  );

  const CertificateIcon = ({ size = 60, locked = false }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="certGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#4facfe" />
          <Stop offset="50%" stopColor="#2a9dfe" />
          <Stop offset="100%" stopColor="#00f2fe" />
        </LinearGradient>
        <LinearGradient id="certLocked" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#e0e0e0" />
          <Stop offset="100%" stopColor="#b0b0b0" />
        </LinearGradient>
      </Defs>
      <G fill={locked ? "url(#certLocked)" : "url(#certGrad)"}>
        <Path d="M20 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 18H4V4h16v16z" />
        <Path d="M8 12h8v2H8zm0 4h5v2H8zm7-8H9V6h6z" fill="#fff" />
        {!locked && (
          <G fill="#fff" opacity="0.7">
            <Circle cx="18" cy="8" r="1" />
            <Circle cx="18" cy="12" r="1" />
            <Circle cx="18" cy="16" r="1" />
          </G>
        )}
      </G>
    </Svg>
  );

  const ProgressCircle = ({ progress, size = 60, strokeWidth = 6 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <Svg width={size} height={size} className="absolute">
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#4CAF50"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    );
  };

  return (
    <View className="flex-1 bg-[#fff]">
      <ScrollView contentContainerStyle={styles.container}>
        <View className="items-center mt-8 mb-6">
          <Text className="text-4xl font-bold text-indigo-900">
            Your Achievements
          </Text>
          <Text className="text-purple-600 mt-2">
            Celebrate your milestones
          </Text>
        </View>

        <View className="w-full px-5">
          {achievements.map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.card,
                {
                  opacity: animatedValues[index],
                  transform: [
                    {
                      translateY: animatedValues[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View
                className={`p-6 rounded-3xl ${item.locked ? "bg-gray-50" : "bg-white"}`}
              >
                <View className="flex-row items-center">
                  <View className="relative">
                    {item.type === "trophy" ? (
                      <TrophyIcon locked={item.locked} />
                    ) : (
                      <CertificateIcon locked={item.locked} />
                    )}
                    {item.locked && <ProgressCircle progress={item.progress} />}
                  </View>

                  <View className="ml-5 flex-1">
                    <Text
                      className={`text-xl font-bold ${item.locked ? "text-gray-600" : "text-indigo-800"}`}
                    >
                      {item.title}
                    </Text>
                    <Text
                      className={`text-sm ${item.locked ? "text-gray-400" : "text-blue-600"}`}
                    >
                      {item.date}
                    </Text>
                  </View>

                  {item.locked ? (
                    <View className="bg-gray-100 rounded-full px-3 py-1 flex-row items-center">
                      <Ionicons name="lock-closed" size={14} color="#4ade80" />
                      <Text className="text-xs text-gray-600 ml-1">
                        {item.progress}%
                      </Text>
                    </View>
                  ) : (
                    <View className="bg-green-50 rounded-full px-3 py-1 flex-row items-center border border-green-100">
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color="#4CAF50"
                      />
                      <Text className="text-xs text-green-400 ml-1">
                        Earned
                      </Text>
                    </View>
                  )}
                </View>

                {!item.locked ? (
                  <TouchableOpacity
                    className="mt-4 bg-[#7EFF1B] py-3 rounded-xl items-center flex-row justify-center"
                    activeOpacity={0.7}
                  >
                    <Ionicons name="eye" size={18} color="#fff" />
                    <Text className="text-[#fff] font-medium ml-2">
                      View Certificate
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View className="mt-4 bg-gray-100 py-3 rounded-xl">
                    <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </View>
                    <Text className="text-xs text-gray-500 text-center mt-1">
                      {item.progress}% complete
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  card: {
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 20,
  },
});

export default AchievementPage;
