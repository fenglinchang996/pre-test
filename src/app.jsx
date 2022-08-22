import { useState } from 'react';
import CustomInputNumber from './customInputNumber';
import RoomAllocation from './roomAllocation';

const App = () => {
  return (
    <div>
      <RoomAllocation
        guest={10}
        room={5}
        onChange={(result) => console.log(result)}
      />
      {/* <CustomInputNumberTest /> */}
    </div>
  );
};

const CustomInputNumberTest = () => {
  const [value, setValue] = useState(0);

  return (
    <CustomInputNumber
      min={0}
      max={16}
      step={2}
      name="input-number"
      value={value}
      disabled={false}
      onChange={(e) => {
        console.log(e.target.value);
      }}
      onBlur={(e) => {
        console.log(e.target.value);
      }}
    />
  );
};

export default App;
