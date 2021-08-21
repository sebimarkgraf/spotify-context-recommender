export function generateRandomString(length = 6) {
    return Math.random().toString(20).substr(2, length);
  }
  
export async function requestIOSPermissions() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    const granted = await DeviceMotionEvent.requestPermission();
    if (granted !== "granted") {
      console.error("Device Motion Permission not granted!");
      return false;
    }
  }

  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    const granted = await DeviceOrientationEvent.requestPermission();
    if (granted !== "granted") {
      console.error("DeviceOrientation Permission not granted!");
      return false;
    }
  }
  return true;
}