import React from 'react'

type FileFormProps = {
    setFile: (file: File | null) => void;
}

export const FileForm: React.FC<FileFormProps> = (props) => {
  return (
    <div>
    <label className="file-picker">
      <input
        type="file"
        onChange={(e) =>
          props.setFile(e.target.files ? e.target.files[0] : null)
        }
        required
      />
    </label>
  </div>
  )
}