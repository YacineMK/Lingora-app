import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const GameScreen = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const progress = useSharedValue(0);

  const questions = [
    {
      text: "The past tense of 'go' is 'went'.",
      answer: true,
      category: "Grammar",
    },
    {
      text: "'Big' and 'large' are perfect synonyms with no difference in usage.",
      answer: false,
      category: "Vocabulary",
    },
    {
      text: "The present continuous tense is formed with 'to be' + verb + -ing.",
      answer: true,
      category: "Grammar",
    },
    {
      text: "'Their', 'there', and 'they're' are pronounced the same way.",
      answer: true,
      category: "Pronunciation",
    },
    {
      text: "All English nouns have plural forms.",
      answer: false,
      category: "Grammar",
    },
  ];

  const userImages = {
    player: require("../../../presentation/assets/Ellipse.png"),
    opponent: require("../../../presentation/assets/Ellipse2.png"),
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      progress.value = withTiming((15 - timeLeft) / 15, { duration: 1000 });
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(15);
    setScore(0);
    setOpponentScore(0);
    setCurrentQuestion(0);
  };

  const answerQuestion = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    } else {
      setOpponentScore(opponentScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameStarted(false);
  };

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const AvatarGroup = () => (
    <View className="flex-row justify-around w-full items-center py-4">
      <View className="items-center">
        <Image
          source={userImages.player}
          className="w-16 h-16 rounded-full border-2 border-lime-400"
        />
        <Text className="text-xl font-bold mt-2">{score}</Text>
        <Text className="text-base mt-1">You</Text>
      </View>
      <View className="items-center">
        <Image
          source={userImages.opponent}
          className="w-16 h-16 rounded-full border-2 border-lime-400"
        />
        <Text className="text-xl font-bold mt-2">{opponentScore}</Text>
        <Text className="text-base mt-1">Hiki</Text>
      </View>
    </View>
  );

  if (!gameStarted) {
    return (
      <View className="flex-1 bg-white px-6 pt-10">
        <Text className="text-center text-2xl font-bold mb-6">
          English Challenge
        </Text>
        <Text className="text-center text-gray-500 text-base">9:41</Text>

        <AvatarGroup />
        <Text className="text-center text-red-500 text-lg mt-2">
          00:{timeLeft.toString().padStart(2, "0")}
        </Text>

        <Pressable
          onPress={startGame}
          className="bg-lime-400 mt-10 py-4 rounded-xl items-center"
        >
          <Text className="text-white text-lg font-bold">START NEW GAME</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-6 pt-10">
      <Text className="text-center text-2xl font-bold mb-6">
        English Challenge
      </Text>
      <Text className="text-center text-gray-500 text-base">9:41</Text>

      <AvatarGroup />
      <Text className="text-center text-red-500 text-lg mt-2">
        00:{timeLeft.toString().padStart(2, "0")}
      </Text>

      <View className="h-1 bg-gray-200 rounded-full my-4 overflow-hidden">
        <Animated.View
          style={[
            { height: "100%", backgroundColor: "#7EFF1B" },
            progressStyle,
          ]}
        />
      </View>

      <View className="flex-1 justify-center">
        <Text className="text-center text-lime-400 font-bold text-base mb-2">
          {questions[currentQuestion].category}
        </Text>
        <Text className="text-center text-xl font-medium leading-8 mb-10">
          {questions[currentQuestion].text}
        </Text>

        <View className="flex-row justify-between">
          <Pressable
            onPress={() => answerQuestion(true)}
            className="flex-1 py-4 mx-2 bg-lime-400 rounded-xl items-center"
          >
            <Text className="text-white text-lg font-bold">TRUE</Text>
          </Pressable>
          <Pressable
            onPress={() => answerQuestion(false)}
            className="flex-1 py-4 mx-2 bg-red-500 rounded-xl items-center"
          >
            <Text className="text-white text-lg font-bold">FALSE</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GameScreen;
