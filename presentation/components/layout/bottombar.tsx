import { View, Text, TouchableOpacity } from "react-native";
import { House, Trophy, Swords, UserRound } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

function Bottombar() {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState("home");

    const icons = [
        { Icon: House, label: "Home", key: "home", route: "/home" },
        { Icon: Trophy, label: "Achievement", key: "achievement", route: "/home/achievement" },
        { Icon: Swords, label: "Battle", key: "battle", route: "/home/battle" },
        { Icon: UserRound, label: "Profile", key: "profile", route: "/profil/inedx" },
    ];

    return (
        <View className="flex-row justify-around items-center bg-white px-4 py-3 shadow-md rounded-t-3xl border-t border-gray-200">
            {icons.map(({ Icon, label, key, route }) => {
                const isSelected = selectedTab === key;
                return (
                    <TouchableOpacity
                        key={key}
                        accessibilityLabel={key}
                        activeOpacity={0.8}
                        className="items-center"
                        onPress={() => {
                            setSelectedTab(key);
                            router.push(route);
                        }}
                    >
                        <Icon
                            size={24}
                            strokeWidth={2}
                            color={isSelected ? "#22c55e" : "black"}
                        />
                        <Text
                            className={`text-xs mt-1 ${
                                isSelected ? "text-green-500" : "text-black"
                            }`}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default Bottombar;
