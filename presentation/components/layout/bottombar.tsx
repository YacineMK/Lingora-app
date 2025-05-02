import { View, Text, TouchableOpacity } from "react-native";
import { House, Trophy, Swords, UserRound } from "lucide-react-native";

function Bottombar() {
  const icons = [
    { Icon: House, label: "Home", key: "home" },
    { Icon: Trophy, label: " Achievement", key: "cart" },
    { Icon: Swords, label: "Battle", key: "battle" },
    { Icon: UserRound, label: "Profile", key: "profile" },
  ];

  return (
    <View className="flex-row justify-around items-center bg-white px-4 py-3 shadow-md rounded-t-3xl border-t border-gray-200">
      {icons.map(({ Icon, label, key }) => (
        <TouchableOpacity
          key={key}
          accessibilityLabel={key}
          activeOpacity={0.8}
          className="items-center"
        >
          <Icon size={24} strokeWidth={2} color="#1f2937" />
          <Text className="text-xs text-gray-700 mt-1">{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default Bottombar;
