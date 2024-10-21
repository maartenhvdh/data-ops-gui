import React from "react";

type FileInputProps = {
  setFile: (file: File | null) => void;
};

export const FileInput: React.FC<FileInputProps> = (props) => {
  return (
    <div>
      <label className="file-picker">
        <input
          type="file"
          onChange={(e) => props.setFile(e.target.files ? e.target.files[0] : null)}
          required
        />
      </label>
    </div>
  );
};
