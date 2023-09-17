// import { StatusBar } from 'expo-status-bar';
// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleCameraType = () => {
//     setCameraType(
//       cameraType === Camera.Constants.Type.back
//         ? Camera.Constants.Type.front
//         : Camera.Constants.Type.back
//     );
//   };

//   const takePictureHandler = async () => {
//     if (cameraRef.current) {
//       try {
//         const photoData = await cameraRef.current.takePictureAsync();
//         console.log(photoData);
//         // 사진 데이터(photoData.uri)를 다음 단계로 전달하거나 처리합니다.
//       } catch (error) {
//         console.log('Error taking picture:', error);
//       }
//     }
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: 'center' }}>We need your permission to access the camera</Text>
//       </View>
//     );
//   }

//    return (
//      <View style={styles.container}>
//        <Camera ref={cameraRef} style={styles.camera} type={cameraType} />
//        <TouchableOpacity style={styles.button} onPress={handleCameraType}>
//          <Text style={styles.buttonText}>Flip</Text>
//        </TouchableOpacity>
//        <TouchableOpacity style={styles.button} onPress={takePictureHandler}>
//          <Text style={styles.buttonText}>Take Picture</Text>
//        </TouchableOpacity>
//        <StatusBar style="auto" />
//      </View>
//    );
// }

// const styles = StyleSheet.create({
//    container: {
//      flex:1,
//      backgroundColor:'#fff',
//      alignItems:'center',
//      justifyContent:'center'
//    },
//    camera: {
//      flex:1,
//      width:'100%',
//    },
//    button: {
//      position:'absolute',
//      bottom:20,
//      left:'40%',
//    },
//    buttonText:{
//      fontSize:18,
//      fontWeight:'bold',
//      color:'#fff'
//    }
// });
// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [predictionResult, setPredictionResult] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePictureHandler = async () => {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync({ base64: true });
        
        // 서버로 사진 데이터 전송 및 예측 결과 받기
        sendPhotoToServer(photoData.base64);
      } catch (error) {
        console.log('Error taking picture:', error);
      }
    }
  };
  const sendPhotoToServer = async (base64Data) => {
    try {
      // API 엔드포인트 URL 설정
      const apiUrl = 'http://192.168.0.105:6000';
      
      // 서버로 전송할 데이터 객체 생성
      const dataToSend = { image: base64Data };
      
      // POST 요청으로 데이터 전송 및 응답 받기
      const response = await fetch(apiUrl + '/predict', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
     });

     if (!response.ok) throw new Error('Failed to send photo to server.');

     // 응답 데이터 처리
     const resultData = await response.json();
     console.log(resultData);
     if (resultData && resultData.predictions){
      const names = resultData.predictions.map((prediction)=>prediction.name);
      const confidences = resultData.predictions.map((prediction)=>prediction.confidence);
      
      console.log('건물 명: ', names);
      console.log('인식률: ',confidences);
    }
     
     // 결과를 활용하여 화면에 표시하거나 추가 작업 수행
     
   } catch (error) {
     console.log('Error sending photo to server:', error);
   }
 };

 if (hasPermission === null) return <View />;
 if (!hasPermission) return <Text>No access to camera</Text>;

 return (
   <View style={styles.container}>
     <Camera ref={cameraRef} style={styles.camera} type={cameraType} />
     <TouchableOpacity style={styles.button} onPress={handleCameraType}>
       <Text style={styles.buttonText}>Flip</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.button} onPress={takePictureHandler}>
       <Text style={styles.buttonText}>Take Picture</Text>
     </TouchableOpacity>

     {/* 예측 결과 출력 */}
     {!!predictionResult && (
       <View style={styles.predictionContainer}>
         <Text>Prediction Result:</Text>
         {predictionResult.map((prediction, index) => (
           <View key={`prediction_${index}`}>
             {/* 필요한 정보 추출 */}
             <Text>Class: {prediction.class}</Text>
             {/* 경계 상자 등 다른 정보도 여기서 활용 가능 */}
           </View>
         ))}
       </View>
     )}
     
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex:1,
   backgroundColor:'#fff',
 },
 camera: {
   flex:1,
 },
 buttonContainer:{
   position:'absolute',
 },
 button:{
   paddingVertical:10,
 },
 buttonText:{
 fontSize:18,
 fontWeight:'bold',
 color:'black'
},
 predictionContainer:{
 marginTop:'auto',
 backgroundColor:'#fff',
 paddingVertical:20,
 paddingHorizontal:10,
},
});
