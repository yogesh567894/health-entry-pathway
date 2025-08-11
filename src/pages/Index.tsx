import React from 'react';
import { VitalsDemoProvider } from '@/context/VitalsDemoContext';
import MainTabs from '@/components/MainTabs';

const Index = () => {
  return (
    <VitalsDemoProvider>
      <MainTabs />
    </VitalsDemoProvider>
  );
};

export default Index;

