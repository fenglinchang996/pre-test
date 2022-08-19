import { useState } from 'react';
import CustomInputNumber from './customInputNumber';

const parseNumber = (newVal, max, min) => {
  if (newVal === '') {
    return min ? min : '';
  } else {
    const num = parseInt(newVal);
    if (Number.isNaN(num)) {
      return min ? min : newVal;
    } else {
      if (num >= max) {
        return max;
      } else if (num <= min) {
        return min;
      } else {
        return num;
      }
    }
  }
};

const App = () => {
  const [value, setValue] = useState(1);
  const max = 16;
  const min = 1;
  const step = 2;

  console.log(value);

  return (
    <CustomInputNumber
      min={min}
      max={max}
      step={step}
      name="input-number"
      value={value}
      disabled
      onChange={(e) => setValue(parseNumber(e.target.value))}
      onBlur={(e) => {
        setValue(parseNumber(e.target.value, max, min));
      }}
    />
  );
};

export default App;
