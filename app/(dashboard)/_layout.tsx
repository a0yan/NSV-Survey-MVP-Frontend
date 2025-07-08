import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { View } from "react-native";
import UserOnly from "@/components/auth/UserOnly";
import { ProjectProvider } from "@/context/ProjectContext";
import { useProject } from '@/hooks/useProject';

// export default function DashboardLayout() {

//   const {isProjectActive} = useProject();
//   console.log("DashboardLayout isProjectActive:", isProjectActive);
  
//   return (
//     <UserOnly>
//       <ProjectProvider>
//         <View style={{ flex: 1, backgroundColor: "#f4f8ff" }}>
//           <Tabs
//             initialRouteName="SelectProject"
//             screenOptions={({ route }) => ({
//               tabBarIcon: ({ color, size }) => {
//                 let iconName: keyof typeof Ionicons.glyphMap = "ellipse";
//                 if (route.name === "SelectProject") iconName = "list";
//                 else if (route.name === "StartSurvey") iconName = "play-circle";
//                 else if (route.name === "LiveSurvey") iconName = "play-circle-outline";
//                 else if (route.name === "ViewReport")
//                   iconName = "document-text";
//                 else if (route.name === "Profile") iconName = "person-circle";
//                 return <Ionicons name={iconName} size={size} color={color} />;
//               },
//               tabBarActiveTintColor: "#2563eb",
//               tabBarInactiveTintColor: "#6b7280",
//               tabBarStyle: {
//                 backgroundColor: "#fff",
//                 borderTopColor: "#e5e7eb",
//                 borderTopWidth: 1,
//                 height: 60,
//               },
//               headerShown: false,
//             })}
//           >
//             <Tabs.Screen
//               name="SelectProject"
//               options={{
//                 title: "Select Project",
//                 headerShown: false,
//               }}
//             />
//             <Tabs.Screen
//               name="LiveSurvey"
//               options={{
//                 title: "Live Survey",
//                 headerShown: false,
//               }}
//               listeners={{
//                 tabPress: e => {
//                   if (!isProjectActive) {
//                     // If no project is selected, prevent navigation
//                     e.preventDefault();
//                     alert("Please select a project first.");
//                   }
//                 },
//               }}
//             />
//             <Tabs.Screen
//               name="Profile"
//               options={{
//                 title: "Profile",
//                 headerShown: false,
//               }}
//             />
//               <Tabs.Screen
//                 name="ViewReport"
//                 options={{
//                   title: "View Report",
//                   headerShown: false,
//                 }}
//                 listeners={{
//                   tabPress: e => {
//                     if (!isProjectActive) {
//                       // If no project is selected, prevent navigation
//                       e.preventDefault();
//                       alert("Please select a project first.");
//                     }
//                   },
//                 }}
//               />
//           </Tabs>
//         </View>
//       </ProjectProvider>
//     </UserOnly>
//   );
// }
function DashboardTabs() {
  const { isProjectActive } = useProject();
  console.log("DashboardLayout isProjectActive:", isProjectActive);

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f8ff" }}>
      <Tabs
        initialRouteName="SelectProject"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "ellipse";
            if (route.name === "SelectProject") iconName = "list";
            else if (route.name === "StartSurvey") iconName = "play-circle";
            else if (route.name === "LiveSurvey") iconName = "play-circle-outline";
            else if (route.name === "ViewReport") iconName = "document-text";
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
          options={{ title: "Select Project", headerShown: false }}
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
            },
          }}
          />
        <Tabs.Screen
          name="Profile"
          options={{ title: "Profile", headerShown: false }}
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
      </Tabs>
    </View>
  );
}

export default function DashboardLayout() {
  return (
    <UserOnly>
      <ProjectProvider>
        <DashboardTabs />
      </ProjectProvider>
    </UserOnly>
  );
}
