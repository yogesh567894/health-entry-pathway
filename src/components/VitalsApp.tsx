import React, { useState } from 'react';
import VitalsCaptureLanding from './VitalsCaptureLanding';
import CameraInterface from './CameraInterface';
import ProcessingScreen from './ProcessingScreen';
import VitalsResults from './VitalsResults';

export type VitalsStep = 'landing' | 'camera' | 'processing' | 'results';

const VitalsApp = () => {
  const [currentStep, setCurrentStep] = useState<VitalsStep>('landing');

  const handleStepChange = (step: VitalsStep) => {
    setCurrentStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return (
          <VitalsCaptureLanding
            onStartCapture={() => handleStepChange('camera')}
            onViewResults={() => handleStepChange('results')}
          />
        );
      case 'camera':
        return (
          <CameraInterface
            onComplete={() => handleStepChange('processing')}
            onBack={() => handleStepChange('landing')}
          />
        );
      case 'processing':
        return (
          <ProcessingScreen
            onComplete={() => handleStepChange('results')}
          />
        );
      case 'results':
        return (
          <VitalsResults
            onBack={() => handleStepChange('landing')}
            onNewRecording={() => handleStepChange('camera')}
          />
        );
      default:
        return (
          <VitalsCaptureLanding
            onStartCapture={() => handleStepChange('camera')}
            onViewResults={() => handleStepChange('results')}
          />
        );
    }
  };

  return <div>{renderCurrentStep()}</div>;
};

export default VitalsApp;