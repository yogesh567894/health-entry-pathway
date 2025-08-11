import React, { createContext, useContext, useState, ReactNode } from 'react';

export type VitalsDemoSettings = {
  fastMode: boolean;
  forceCameraPermissionDenied: boolean;
  forceUploadFailure: boolean;
  forceProcessingTimeout: boolean;
  forceNetworkIssue: boolean;
};

interface VitalsDemoContextType {
  settings: VitalsDemoSettings;
  setSettings: (patch: Partial<VitalsDemoSettings>) => void;
}

const defaultSettings: VitalsDemoSettings = {
  fastMode: false,
  forceCameraPermissionDenied: false,
  forceUploadFailure: false,
  forceProcessingTimeout: false,
  forceNetworkIssue: false,
};

const VitalsDemoContext = createContext<VitalsDemoContextType | undefined>(undefined);

export const VitalsDemoProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettingsState] = useState<VitalsDemoSettings>(defaultSettings);

  const setSettings = (patch: Partial<VitalsDemoSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...patch }));
  };

  return (
    <VitalsDemoContext.Provider value={{ settings, setSettings }}>
      {children}
    </VitalsDemoContext.Provider>
  );
};

export const useVitalsDemo = () => {
  const ctx = useContext(VitalsDemoContext);
  if (!ctx) throw new Error('useVitalsDemo must be used within VitalsDemoProvider');
  return ctx;
};
