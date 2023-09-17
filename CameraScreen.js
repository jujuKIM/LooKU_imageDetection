// import { AutoFocus, Camera, CameraType } from 'expo-camera';
// import { useState } from 'react';
// import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function CameraScreen() {
//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();

//   if (!permission) {
//     // Camera permissions are still loading
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }

//   function toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }

//   const openCameraHandler = async () => { 
//     // 카메라에 대한 접근 권한을 얻을 수 있는지 묻는 함수입니다.
//       const { status } = await Camera.requestCameraPermissionsAsync();
   
//    // 권한을 획득하면 status가 granted 상태가 됩니다.
//       if (status === 'granted') {
//    // Camera 컴포넌트가 있는 CameraScreen으로 이동합니다.
//         navigation.navigate('CameraScreen',{
//           title: route.params.title
//         });
//       } else {
//         Alert.alert('카메라 접근 허용은 필수입니다.');
//       }
//   };

//   const takePictureHandler = async () => { 
//     // cameraRef가 없으면 해당 함수가 실행되지 않게 가드
//     if (!cameraRef.current) return;
    
//     // takePictureAsync를 통해 사진을 찍습니다.
//     // 찍은 사진은 base64 형식으로 저장합니다.
//     await cameraRef.current
//       .takePictureAsync({
//         base64: true,
//       })
//       .then((data) => {
//         setPreviewVisible(true);
//         setCapturedImage(data);
//       });
//   };

//   return (
//     <View style={styles.container}>
//         <Camera
//         ref={cameraRef}
//         type={cameraType}
//         zoom={zoomLevel}
//         autoFocus={AutoFocus.on}
//         whiteBalance={toggleWhiteBalance}
//       />
//       {/* <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={takePictureHandler}>
//           <Text>Click Me!</Text>  
//         </TouchableOpacity>
//         </View>
//       </Camera> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });
import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          style={{
            width: 130,
            borderRadius: 4,
            backgroundColor: '#14274e',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Take picture
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})