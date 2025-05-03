import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Svg, Path } from "react-native-svg";

// Beautiful wavy path with more curves
const pathD = "M 200 0 C 250 50, 150 100, 200 150 C 250 200, 150 250, 200 300 C 250 350, 150 400, 200 450 C 250 500, 150 550, 200 600 C 250 650, 150 700, 200 750 C 250 800, 150 850, 200 900";

const TOTAL_LEVELS = 8;

const modules = [
  {
    name: "Lava World",
    backgroundColor: "rgba(30, 30, 30, 0.5)",
    pathColor: "#a3a3a3",
    backgroundImage: require("../../presentation/assets/background_3.png"),
  },
  {
    name: "normal World",
    backgroundColor: "rgba(120, 40, 20, 0.5)",
    pathColor: "#ff5722",
    backgroundImage: require("../../presentation/assets/background.png"),
  },
];

const vocabLevels = [
  {
    id: 8,
    title: "Slang & Idioms",
    description: "Common slang and idiomatic expressions",
    words: [
      { word: "What's up?", translation: "¿Qué onda?", example: "Hey, what's up?" },
      { word: "Cool", translation: "Chido", example: "That's really cool!" },
    ],
    language: "Spanish",
    difficulty: "Advanced"
  },
  {
    id: 7,
    title: "Romantic Phrases",
    description: "Phrases for romantic situations",
    words: [
      { word: "I love you", translation: "Te quiero", example: "I love you with all my heart" },
      { word: "Beautiful", translation: "Hermoso", example: "You look beautiful tonight" },
    ],
    language: "Spanish",
    difficulty: "Advanced"
  },
  {
    id: 6,
    title: "Emergency",
    description: "Important phrases for emergencies",
    words: [
      { word: "Help!", translation: "¡Ayuda!", example: "Help! I need a doctor" },
      { word: "Police", translation: "Policía", example: "Call the police!" },
    ],
    language: "Spanish",
    difficulty: "Advanced"
  },
  {
    id: 5,
    title: "Directions",
    description: "Asking for and giving directions",
    words: [
      { word: "Left", translation: "Izquierda", example: "Turn left at the corner" },
      { word: "Right", translation: "Derecha", example: "Then turn right" },
    ],
    language: "Spanish",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    title: "Shopping",
    description: "Vocabulary for shopping experiences",
    words: [
      { word: "How much does it cost?", translation: "¿Cuánto cuesta?", example: "How much does this shirt cost?" },
      { word: "I would like...", translation: "Me gustaría...", example: "I would like to try this on" },
    ],
    language: "Spanish",
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "Travel Phrases",
    description: "Essential phrases for traveling",
    words: [
      { word: "Where is...?", translation: "¿Dónde está...?", example: "Where is the train station?" },
      { word: "How much?", translation: "¿Cuánto cuesta?", example: "How much does this cost?" },
    ],
    language: "Spanish",
    difficulty: "Intermediate"
  },
  {
    id: 2,
    title: "Food & Dining",
    description: "Vocabulary for restaurants and eating",
    words: [
      { word: "Water", translation: "Agua", example: "Can I have some water?" },
      { word: "Menu", translation: "Menú", example: "Could we see the menu?" },
    ],
    language: "Spanish",
    difficulty: "Beginner"
  },
  {
    id: 1,
    title: "Basic Greetings",
    description: "Essential phrases for everyday conversations",
    words: [
      { word: "Hello", translation: "Hola", example: "Hello! How are you?" },
      { word: "Goodbye", translation: "Adiós", example: "Goodbye, see you tomorrow!" },
    ],
    language: "Spanish",
    difficulty: "Beginner"
  },
];

export default function GameMap() {
  const [moduleIndex, setModuleIndex] = React.useState(0);
  const currentModule = modules[moduleIndex];

  const toggleModule = () => {
    setModuleIndex((prevIndex) => (prevIndex + 1) % modules.length);
  };

  const [selectedLevel, setSelectedLevel] = React.useState<number | null>(null);
  
  // Calculate level positions along the path
  const levelData = React.useMemo(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathD);
    svg.appendChild(path);
    const length = path.getTotalLength();
    
    return Array.from({ length: TOTAL_LEVELS }, (_, i) => {
      const point = path.getPointAtLength((i / (TOTAL_LEVELS - 1)) * length);
      return { cx: point.x, cy: point.y };
    });
  }, []);

  const closeModal = () => setSelectedLevel(null);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentModule.backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={[styles.overlay, { backgroundColor: currentModule.backgroundColor }]} />
        
        <View style={styles.content}>
          <TouchableOpacity
            onPress={toggleModule}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleButtonText}>
              {modules[(moduleIndex + 1) % modules.length].name}
            </Text>
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.svgContainer}>
              <Svg height={1000} width="100%" viewBox="0 0 400 1000">
                <Path
                  d={pathD}
                  stroke={currentModule.pathColor}
                  strokeWidth={8}
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Add glow effect */}
                <Path
                  d={pathD}
                  stroke={currentModule.pathColor}
                  strokeWidth={16}
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.3}
                />
              </Svg>

              {levelData.map((level, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedLevel(index)}
                  style={[
                    styles.levelButton,
                    {
                      left: level.cx - 20,
                      top: level.cy - 20,
                      backgroundColor: index === 6 ? "#7EFF1B" : "#6b7280",
                      shadowColor: index === 6 ? "#7EFF1B" : "#6b7280",
                    },
                  ]}
                >
                  <Text style={styles.levelText}>{index + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>

      <Modal visible={selectedLevel !== null} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, {backgroundColor: '#f8fff8'}]}>
            {selectedLevel !== null && (
              <>
                <Text style={[styles.modalTitle, {color: '#2e7d32'}]}>{vocabLevels[selectedLevel].title}</Text>
                <Text style={[styles.modalDescription, {color: '#4caf50'}]}>{vocabLevels[selectedLevel].description}</Text>
                
                <View style={styles.metaContainer}>
                  <Text style={[styles.metaText, {color: '#2e7d32'}]}>Language: {vocabLevels[selectedLevel].language}</Text>
                  <Text style={[styles.metaText, {color: '#2e7d32'}]}>Difficulty: {vocabLevels[selectedLevel].difficulty}</Text>
                </View>
                
                <View style={styles.wordsContainer}>
                  {vocabLevels[selectedLevel].words.map((word, i) => (
                    <View key={i} style={[styles.wordCard, {backgroundColor: 'white', borderLeftColor: '#4caf50'}]}>
                      <Text style={[styles.wordText, {color: '#2e7d32'}]}>{word.word}</Text>
                      <Text style={[styles.translationText, {color: '#4caf50'}]}>{word.translation}</Text>
                      <Text style={[styles.exampleText, {color: '#666'}]}>"{word.example}"</Text>
                    </View>
                  ))}
                </View>

                <Pressable
                  onPress={closeModal}
                  style={[styles.closeButton, {backgroundColor: '#4caf50'}]}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
  toggleButton: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    height: 1000,
  },
  svgContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  levelButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metaText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  wordsContainer: {
    marginBottom: 20,
  },
  wordCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  translationText: {
    fontSize: 16,
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});