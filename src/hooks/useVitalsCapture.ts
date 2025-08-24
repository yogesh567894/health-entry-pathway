import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { apiService, VitalsData } from '../services/api';

export type CaptureStage = 'ready' | 'recording' | 'processing' | 'complete' | 'error';

interface UseVitalsCaptureReturn {
  stage: CaptureStage;
  progress: number;
  timeRemaining: number;
  error: string | null;
  vitalsData: VitalsData | null;
  startRecording: () => void;
  stopRecording: () => void;
  resetCapture: () => void;
  processVitals: (recordingId: string) => Promise<void>;
}

export const useVitalsCapture = (): UseVitalsCaptureReturn => {
  const [stage, setStage] = useState<CaptureStage>('ready');
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [error, setError] = useState<string | null>(null);
  const [vitalsData, setVitalsData] = useState<VitalsData | null>(null);

  const startRecording = useCallback(() => {
    setStage('recording');
    setProgress(0);
    setTimeRemaining(30);
    setError(null);

    // Simulate recording progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / 30); // 30 seconds
        if (newProgress >= 100) {
          clearInterval(interval);
          setStage('complete');
          setTimeRemaining(0);
          return 100;
        }
        setTimeRemaining(Math.ceil((100 - newProgress) * 30 / 100));
        return newProgress;
      });
    }, 1000);
  }, []);

  const stopRecording = useCallback(() => {
    setStage('complete');
  }, []);

  const resetCapture = useCallback(() => {
    setStage('ready');
    setProgress(0);
    setTimeRemaining(30);
    setError(null);
    setVitalsData(null);
  }, []);

  const processVitals = useCallback(async (recordingId: string) => {
    try {
      setStage('processing');
      setError(null);
      
      const data = await apiService.processVitals(recordingId);
      setVitalsData(data);
      setStage('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
      setStage('error');
    }
  }, []);

  return {
    stage,
    progress,
    timeRemaining,
    error,
    vitalsData,
    startRecording,
    stopRecording,
    resetCapture,
    processVitals,
  };
};