import UserOnly from "@/components/auth/UserOnly";
import { ProjectProvider } from "@/context/ProjectContext";
import { useProject } from '@/hooks/useProject';
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

function DashboardTabs() {
  const { isProjectActive,surveyStartTime} = useProject();

  useEffect(() => {
  const checkRoute = async () => {
  const defaultRoute = surveyStartTime!=null ? "LiveSurvey" : "SelectProject";
  console.log("Survey start time:", surveyStartTime);
  console.log("Default route:", defaultRoute);

    router.replace(`/(dashboard)/${defaultRoute}`);
  };

  checkRoute();
}, [surveyStartTime]);

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f8ff"}}>
      <Tabs
        screenOptions={({ route }) => ({
          // tabBarIcon: ({ color, size }) => {
          //   let iconName: keyof typeof Ionicons.glyphMap = "ellipse";
          //   if (route.name === "SelectProject") iconName = "list";
          //   else if (route.name === "LiveSurvey") iconName = "play-circle-outline";
          //   else if (route.name === "ViewReport") iconName = "document-text";
          //   else if (route.name === "Profile") iconName = "person-circle";

          //   return <Ionicons name={iconName} size={size} color={color} />;
          // },
          tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "ellipse";

          switch (route.name) {
            case "SelectProject":
              iconName = focused ? "list" : "list-outline";
              break;
            case "LiveSurvey":
              iconName = focused ? "play-circle" : "play-circle-outline";
              break;
            case "ViewReport":
              iconName = focused ? "document-text" : "document-text-outline";
              break;
            case "Profile":
              iconName = focused ? "person-circle" : "person-circle-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#6b7280",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopColor: "#e5e7eb",
            borderTopWidth: 1,
            height: 70,
          },
          headerShown: false,
        })}
      >
        <Tabs.Screen
          name="SelectProject"
          options={{ title: "Select Project", headerShown: false }}
          listeners={{
            tabPress: (e) => {
              if (surveyStartTime) {
                e.preventDefault();
                alert("Please end the inspection first.");
                router.push("/(dashboard)/LiveSurvey");
              }
            },
          }}
        />
        <Tabs.Screen
          name="LiveSurvey"
          options={{ title: "Live Survey", headerShown: false }}
          listeners={{
            tabPress: (e) => {
              if (!isProjectActive) {
                e.preventDefault();
                alert("Please activate a project first.");
                router.push("/(dashboard)/SelectProject");
              }
              else if (surveyStartTime==null) {
                  e.preventDefault();
                alert("Please start the inspection first.");
                router.push("/(dashboard)/SelectProject");
            }
          }}}
          />
        <Tabs.Screen
          name="ViewReport"
          options={{ title: "View Report", headerShown: false }}
          listeners={{
            tabPress: (e) => {
              if (!isProjectActive) {
                e.preventDefault();
                alert("Please activate a project first.");
                router.push("/(dashboard)/SelectProject");
              }
            },
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{ title: "Profile", headerShown: false }}
          listeners={{
            tabPress: (e) => {
              if (surveyStartTime) {
                e.preventDefault();
                alert("Please end the inspection first.");
                router.push("/(dashboard)/LiveSurvey");
              }
            },
          }}
        />
      </Tabs>
    </View>
  );
}

export default function DashboardLayout() {
  return (
    <UserOnly>
      <ProjectProvider>
        <DashboardTabs/>
      </ProjectProvider>
    </UserOnly>
  );
}
