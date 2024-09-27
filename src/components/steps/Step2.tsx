import React from "react";

interface StepProps {
  nextStep: () => void;
  prevStep: () => void;
  handleData: (input: Record<string, any>) => void;
  data: Record<string, any>;
}

const Step2: React.FC<StepProps> = ({ nextStep, prevStep, handleData, data }) => {
  const [sourceEnvId, setSourceEnvId] = React.useState<string>(data.sourceEnvId || "");
  const [useModelFile, setUseModelFile] = React.useState<boolean>(false);
  const [modelFile, setModelFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setModelFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleData({ sourceEnvId, modelFile });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sync - Provide Environment IDs</h2>
      {!useModelFile
        ? (
          <div>
            <label>
              Source Environment ID:
              <input
                type="text"
                value={sourceEnvId}
                onChange={(e) => setSourceEnvId(e.target.value)}
                required
              />
            </label>
          </div>
        )
        : (
          <div>
            <label>
              Choose Model File:
              <input type="file" onChange={handleFileChange} required />
            </label>
          </div>
        )}
      <label>
        <input
          type="checkbox"
          checked={useModelFile}
          onChange={() => setUseModelFile(!useModelFile)}
        />
        Sync from existing model file
      </label>
      <div>
        <button type="button" onClick={prevStep}>
          Back
        </button>
        <button type="submit">
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
