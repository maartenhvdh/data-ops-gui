import React from "react";

interface StepProps {
  nextStep: () => void;
  handleData: (input: Record<string, any>) => void;
}

const Step1: React.FC<StepProps> = ({ nextStep, handleData }) => {
  const [action, setAction] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleData({ action });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Choose an Action</h2>
      <label className="radio">
        <input
          type="radio"
          value="Sync"
          checked={action === "Sync"}
          onChange={() => setAction("Sync")}
        />
        <span className="radio-button"></span>
        Sync
      </label>
      <label className="radio">
        <input
          type="radio"
          value="Export"
          checked={action === "Export"}
          onChange={() => setAction("Export")}
        />
        <span className="radio-button"></span>
        Export
      </label>
      <div>
        <button type="submit" disabled={!action}>
          Next
        </button>
      </div>
    </form>
  );
};

export default Step1;
