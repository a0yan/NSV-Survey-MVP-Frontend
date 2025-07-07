import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function useLiveLocation() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const projectId="PROJECT_ID"; // Replace with actual project ID if needed

  useEffect(() => {
    let subscriber: Location.LocationSubscription;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 120000, // every 5 seconds
          distanceInterval: 50, // or every 5 meters
        },
        (loc) => setLocation(loc.coords)
      );
    })();

    return () => {
      if (subscriber) subscriber.remove();
    };
  }, []);

  return location;
}
