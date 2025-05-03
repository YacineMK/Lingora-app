import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { router } from 'expo-router';

type RootStackParamList = {
  Main: undefined;
  Home: undefined;
};

export default function ThemeSelectionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const themes = [
    {
      id: 'French',
      name: 'FRENCH',
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=1000',
    },
    {
      id: 'English',
      name: 'ENGLISH',
      image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1000',
    },
    {
      id: 'German',
      name: 'GERMAN',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1000',
    },
  ];

  const handleThemeSelect = (theme: string) => {
    console.log('Selected theme:', theme);
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView 
        className="flex-1 px-6"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center justify-center pt-10 pb-24">
          <Text className="text-[#7EFF1B] text-2xl font-bold text-center mb-8">
            Choose Your World
          </Text>

          <Text className="text-gray-700 text-lg text-center mb-10 max-w-[80%]">
            Please select the theme that the app content and world will adapt to.
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            className="mb-10"
          >
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                className="w-72 h-72 mx-3 rounded-xl overflow-hidden bg-gray-100"
                onPress={() => handleThemeSelect(theme.id)}
              >
                <Image
                  source={{ uri: theme.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4">
                  <Text className="text-white text-center font-bold text-xl">{theme.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-6 pb-6 pt-4">
        <TouchableOpacity
          className="bg-[#7EFF1B] py-4 rounded-full w-full items-center justify-center"
          onPress={() =>  router.push("/home")}
        >
          <Text className="text-white font-bold text-lg">select language</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}