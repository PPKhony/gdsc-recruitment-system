import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ApplicationSelectData {
  field: string;
  label: string;
  options: string[];
  description: string;
}

interface FormComponentProps {
  applicationSelect: ApplicationSelectData[];
  prevData: { [key: string]: string };
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({
  applicationSelect,
  prevData,
  handleChange,
}) => {
  const RenderStaticSelect = applicationSelect.map((data) => (
    <div key={uuidv4()} className="mb-3">
      <div>
        <label htmlFor={data.field} className="form-label">
          {data.label}
        </label>
        <select
          className="form-select"
          id={data.field}
          name={data.field}
          aria-describedby={data.field}
          defaultValue={prevData[data.field.toLowerCase()]}
          onChange={handleChange}
          required
        >
          <option value="">Select an option</option>
          {data.options.map((option) => (
            <option key={uuidv4()} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="form-text">{data.description}</div>
      </div>
    </div>
  ));

  return <>{RenderStaticSelect}</>;
};

export default FormComponent;