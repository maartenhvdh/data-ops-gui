import React, { useState } from "react";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";

interface WizardData {
  action?: string;
  sourceEnvId?: string;
  targetEnvId?: string;
  apiKey?: string;
  targetApiKey?: string;
  [key: string]: any;
}

const Wizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<WizardData>({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleData = (input: Partial<WizardData>) => {
    setData((prevData) => ({ ...prevData, ...input }));
  };

  const resetWizard = () => {
    setStep(1);
    setData({});
  };

  switch (step) {
    case 1:
      return <Step1 nextStep={nextStep} handleData={handleData} />;
    case 2:
      return <Step2 nextStep={nextStep} prevStep={prevStep} handleData={handleData} data={data} />;
    default:
      return <div>Wizard Completed</div>;
  }
};

export default Wizard;
