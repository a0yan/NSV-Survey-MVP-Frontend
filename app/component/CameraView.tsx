import {
  CameraMode,
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as MediaLibrary from 'expo-media-library';
// import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  style?: ViewStyle;
};

export const CameraScreen = ({ style }: Props) => {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<any | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);
  const [flash, setFlash] = useState<FlashMode>('off');
  const mode: CameraMode = "video";
  
  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  // const takePicture = async () => {
  //   const photo = await ref.current?.takePictureAsync();
  //   setUri(photo?.uri);
  // };

  const recordVideo = async () => {
    if (recording) {
      setRecording(false);
      ref.current?.stopRecording();
      console.log("Recording stopped", uri);
      return;
    }
    setRecording(true);
    const video = await ref.current?.recordAsync();
    console.log({ video });
    if (video?.uri) {
      const asset = await MediaLibrary.createAssetAsync(video.uri);
      await MediaLibrary.createAlbumAsync('MyAppVideos', asset, false);
    }
  };

  const toggleFlash = () => {
    setFlash((prev) => {
      if (prev === 'off') return 'on';
      if (prev === 'on') return 'auto';
      if (prev === 'auto') return 'off';
      return 'off'; // Fallback to 'off' if none match
    });
  };

  // const toggleMode = () => {
  //   setMode((prev) => (prev === "picture" ? "video" : "picture"));
  // };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  // const renderPicture = () => {
  //   return (
  //     <View>
  //       <Image
  //         source={{ uri }}
  //         contentFit="contain"
  //         style={{ width: 300, aspectRatio: 1 }}
  //       />
  //       <Button onPress={() => setUri(null)} title="Take another picture" />
  //     </View>
  //   );
  // };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode={mode}
        facing={facing}
        mute={false}
        flash={flash}
        videoQuality="1080p"
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          {/* <Pressable onPress={toggleMode}>
            {mode === "picture" ? (
              <AntDesign name="picture" size={32} color="white" />
            ) : (
              <Feather name="video" size={32} color="white" />
            )}
          </Pressable> */}
          {/* <Pressable onPress={mode === "picture" ? takePicture : recordVideo}> */}
          <Pressable onPress={toggleFlash}>
            {flash === 'off' ? (
              <MaterialIcons name="flash-off" size={30} color="white" />
            ) : flash === 'on' ? (
              <MaterialIcons name="flash-on" size={30} color="white" />
            ) : (
              <MaterialIcons name="flash-auto" size={30} color="white" />
            )}
          </Pressable>

          <Pressable onPress={recordVideo}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      // backgroundColor: mode === "picture" ? "white" : "red",
                      backgroundColor: recording ? "white" : "red",
                      borderColor: recording ? "red" : "white",
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      {/* {uri ? renderPicture() : renderCamera()} */}
      {renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 45,
    height: 45,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});