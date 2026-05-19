import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export const usePoints = () => {
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    AsyncStorage.getItem('points').then(res => {
      setPoints(res !== null ? Number(res) : 0);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('points', points.toString());
  }, [points]);

  const addPoints = useCallback((value: number) => {
    setPoints(prev => prev + value);
  }, []);

  return {
    points,
    addPoints,
  };
};
