import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { Svg, Path } from "react-native-svg";

const pathD =
  "M 200 0 C 300 100, 100 200, 200 300 C 300 400, 100 500, 200 600 C 300 700, 100 800, 200 900";

const TOTAL_LEVELS = 8;

const modules = [
  {
    name: "Dark World",
    backgroundColor: "bg-neutral-800",
    pathColor: "#a3a3a3",
  },
  {
    name: "Lava World",
    backgroundColor: "bg-orange-900",
    pathColor: "#ff5722",
  },
];

const vocabLevels = [
  {
    title: "Learning Ability Words",
    description: "Words like: can, can't, able to, unable to",
    language: "English",
  },
  {
    title: "Greetings in French",
    description: "Words like: bonjour, salut, bonsoir",
    language: "French",
  },
  {
    title: "Thanks in German",
    description: "Words like: danke, vielen Dank, bitte",
    language: "German",
  },
  {
    title: "Japanese Politeness",
    description: "Words like: ありがとう, すみません",
    language: "Japanese",
  },
  {
    title: "Spanish Essentials",
    description: "Words like: gracias, por favor, hola",
    language: "Spanish",
  },
  {
    title: "Modal Verbs",
    description: "Words like: must, might, should, would",
    language: "English",
  },
  {
    title: "Asking Questions",
    description: "Words like: who, what, where, when, how",
    language: "English",
  },
  {
    title: "Describing People",
    description: "Words like: tall, short, kind, mean",
    language: "English",
  },
];

export default function GameMap() {
  const [levelData, setLevelData] = React.useState<
    { cx: number; cy: number }[]
  >([]);
  const [moduleIndex, setModuleIndex] = React.useState(0);
  const [selectedLevel, setSelectedLevel] = React.useState<number | null>(null);

  React.useEffect(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathD);
    svg.appendChild(path);
    const length = path.getTotalLength();
    const points = [];
    for (let i = 0; i < TOTAL_LEVELS; i++) {
      const point = path.getPointAtLength((i / (TOTAL_LEVELS - 1)) * length);
      points.push({ cx: point.x, cy: point.y });
    }
    setLevelData(points);
  }, []);

  const currentModule = modules[moduleIndex];
  const toggleModule = () => {
    setModuleIndex((prev) => (prev + 1) % modules.length);
  };

  const closeModal = () => setSelectedLevel(null);

  const vocab = selectedLevel !== null ? vocabLevels[selectedLevel] : null;

  return (
    <View className="flex-1 relative">
      {/* Toggle Module Button */}
      <TouchableOpacity
        onPress={toggleModule}
        className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md z-10"
      >
        <Text className="text-sm font-semibold text-gray-800">
          Change to {modules[(moduleIndex + 1) % modules.length].name}
        </Text>
      </TouchableOpacity>

      {/* Scrollable Map */}
      <ScrollView
        contentContainerStyle={{ height: 1000 }}
        showsVerticalScrollIndicator={false}
      >
        <View className={`flex-1 ${currentModule.backgroundColor}`}>
          <Svg height={1000} width="100%" viewBox="0 0 400 1000">
            <Path
              d={pathD}
              stroke={currentModule.pathColor}
              strokeWidth={40}
              fill="none"
            />
          </Svg>

          {levelData.map((level, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedLevel(index)}
              className={`absolute w-10 h-10 rounded-full border-2 border-white ${
                index === 6 ? "bg-[#7EFF1B]" : "bg-gray-500"
              }`}
              style={{
                left: level.cx - 20,
                top: level.cy - 20,
              }}
            />
          ))}
        </View>
      </ScrollView>

      {/* Modal for Vocabulary */}
      <Modal visible={selectedLevel !== null} animationType="slide" transparent>
        <View className="flex-1 bg-black/60 justify-center items-center px-4">
          <View className="bg-white w-full rounded-2xl p-6 max-w-md shadow-lg">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              {vocab?.title}
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              {vocab?.description}
            </Text>
            <Text className="text-xs text-gray-400 italic mb-4">
              Language: {vocab?.language}
            </Text>

            <Pressable
              onPress={closeModal}
              className="mt-2 bg-[#7EFF1B] px-4 py-2 rounded-full self-end"
            >
              <Text className="text-white text-sm font-semibold">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
