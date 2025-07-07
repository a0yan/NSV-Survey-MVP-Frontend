import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import UserOnly from "@/components/auth/UserOnly";
import { ProjectProvider } from "@/context/ProjectContext";

export default function DashboardLayout() {
  return (
    <UserOnly>
      <ProjectProvider>
        <View style={{ flex: 1, backgroundColor: "#f4f8ff" }}>
          <Tabs
            initialRouteName="SelectProject"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap = "ellipse";
                if (route.name === "SelectProject") iconName = "list";
                else if (route.name === "StartSurvey") iconName = "play-circle";
                else if (route.name === "ViewReport")
                  iconName = "document-text";
                else if (route.name === "Profile") iconName = "person-circle";
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#2563eb",
              tabBarInactiveTintColor: "#6b7280",
              tabBarStyle: {
                backgroundColor: "#fff",
                borderTopColor: "#e5e7eb",
                borderTopWidth: 1,
                height: 60,
              },
              headerShown: false,
            })}
          >
            <Tabs.Screen
              name="SelectProject"
              options={{
                title: "Select Project",
                headerShown: false,
              }}
            />
            <Tabs.Screen
              name="StartSurvey"
              options={{
                title: "Start Survey",
                headerShown: false,
              }}
            />
            <Tabs.Screen
              name="LiveSurvey"
              options={{
                title: "Live Survey",
                headerShown: false,
              }}
            />
            <Tabs.Screen
              name="Profile"
              options={{
                title: "Profile",
                headerShown: false,
              }}
            />
          </Tabs>
        </View>
      </ProjectProvider>
    </UserOnly>
  );
}
