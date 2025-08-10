import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Camera, X, RotateCcw, Play, Square } from 'lucide-react';

interface CameraInterfaceProps {
  onComplete: () => void;
  onBack: () => void;
}

const CameraInterface = ({ onComplete, onBack }: CameraInterfaceProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [stage, setStage] = useState<'ready' | 'recording' | 'complete'>('ready');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / 30); // 30 seconds total
          if (newProgress >= 100) {
            setIsRecording(false);
            setStage('complete');
            setTimeRemaining(0);
            return 100;
          }
          setTimeRemaining(Math.ceil((100 - newProgress) * 30 / 100));
          return newProgress;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRecording, progress]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setStage('recording');
    setProgress(0);
    setTimeRemaining(30);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setStage('complete');
  };

  const handleRetake = () => {
    setIsRecording(false);
    setStage('ready');
    setProgress(0);
    setTimeRemaining(30);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black bg-opacity-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white hover:bg-white/20"
        >
          <X className="w-6 h-6" />
        </Button>
        <h2 className="text-white text-lg font-semibold">Vitals Recording</h2>
        <div className="w-10"></div>
      </div>

      {/* Camera Preview Area */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Mock Camera View */}
        <div className="relative w-80 h-80 bg-gray-900 rounded-2xl border-4 border-white/20 overflow-hidden">
          {/* Simulated camera feed */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-pink-900/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.3)_100%)]">
              {/* Finger placement indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-32 h-32 rounded-full border-4 ${
                  stage === 'recording' ? 'border-green-400 animate-pulse' : 'border-white/50'
                } border-dashed flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <Camera className="w-8 h-8 mx-auto mb-2 opacity-70" />
                    <p className="text-sm">Place finger here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recording overlay */}
          {isRecording && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              REC
            </div>
          )}
        </div>

        {/* Instructions overlay */}
        <div className="absolute bottom-20 left-4 right-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-xl p-4 text-center text-white">
            {stage === 'ready' && (
              <p className="text-lg">Position your finger over the camera lens and tap Start</p>
            )}
            {stage === 'recording' && (
              <div>
                <p className="text-lg mb-2">Keep your finger still</p>
                <p className="text-3xl font-bold text-green-400">{timeRemaining}s</p>
              </div>
            )}
            {stage === 'complete' && (
              <p className="text-lg text-green-400">Recording Complete!</p>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {(isRecording || stage === 'complete') && (
        <div className="px-6 py-2">
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Controls */}
      <div className="p-6 bg-black/50">
        <div className="flex justify-center gap-4">
          {stage === 'ready' && (
            <Button
              onClick={handleStartRecording}
              className="bg-green-600 hover:bg-green-700 text-white h-16 px-8 text-lg font-semibold rounded-full"
            >
              <Play className="w-6 h-6 mr-2" />
              Start Recording
            </Button>
          )}

          {stage === 'recording' && (
            <Button
              onClick={handleStopRecording}
              className="bg-red-600 hover:bg-red-700 text-white h-16 px-8 text-lg font-semibold rounded-full"
            >
              <Square className="w-6 h-6 mr-2" />
              Stop Recording
            </Button>
          )}

          {stage === 'complete' && (
            <div className="flex gap-4">
              <Button
                onClick={handleRetake}
                variant="outline"
                className="h-12 px-6 text-white border-white hover:bg-white/20"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Retake
              </Button>
              <Button
                onClick={handleContinue}
                className="medical-btn-primary h-12 px-8"
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraInterface;