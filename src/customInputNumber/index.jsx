import { useEffect, useReducer, useRef } from 'react';
import styles from './index.module.css';

const parseNumber = (newVal, min) => {
  if (newVal === '') {
    return min || min === 0 ? min : '';
  } else {
    const num = Number(newVal);
    if (Number.isNaN(num)) {
      return min || min === 0 ? min : newVal;
    }
    return num;
  }
};

const CustomInputNumber = ({
  min = 0,
  max = Infinity,
  step = 1,
  name,
  value = 0,
  disabled,
  onChange = () => null,
  onBlur = () => null,
}) => {
  const numberReducer = (state, action) => {
    const number = parseNumber(state, min);
    const { type, payload } = action;
    switch (type) {
      case 'increase':
        if (number >= max) {
          return max;
        } else if (number < min) {
          return min;
        } else {
          return number + step > max ? max : number + step;
        }
      case 'decrease':
        if (number <= min) {
          return min;
        } else if (number > max) {
          return max;
        } else {
          return number - step < min ? min : number - step;
        }
      case 'assign':
        return parseNumber(payload);
      default:
        return state;
    }
  };
  const [number, numberDispatch] = useReducer(numberReducer, value);
  const inputRef = useRef();

  useEffect(() => {
    if (number !== parseNumber(inputRef.current.value)) {
      const setValue = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(inputRef.current),
        'value'
      ).set;
      setValue.call(inputRef.current, number);
      const event = new Event('change', {
        bubbles: true,
      });
      inputRef.current.dispatchEvent(event);
    }
  }, [number]);

  useEffect(() => {
    inputRef.current.value = value;
    numberDispatch({
      type: 'assign',
      payload: value,
    });
  }, [value]);

  return (
    <div className={styles.container}>
      <Button
        action={() => numberDispatch({ type: 'decrease' })}
        disabled={disabled || number <= min}
      >
        -
      </Button>
      <input
        ref={inputRef}
        type="number"
        name={name}
        disabled={disabled}
        className={styles['input-number']}
        onChange={(e) => {
          numberDispatch({
            type: 'assign',
            payload: e.target.value,
          });
          onChange(e);
        }}
        onBlur={(e) => {
          onBlur(e);
        }}
      />
      <Button
        action={() => numberDispatch({ type: 'increase' })}
        disabled={disabled || number >= max}
      >
        +
      </Button>
    </div>
  );
};

const Button = ({ children, action, disabled }) => {
  const startTimer = useRef(null);
  const continuousTimer = useRef(null);
  useEffect(() => {
    if (disabled) {
      clearTimeout(startTimer.current);
      clearInterval(continuousTimer.current);
    }
  }, [disabled]);
  return (
    <button
      type="button"
      className={styles.button}
      onMouseDown={() => {
        action();
        startTimer.current = setTimeout(() => {
          continuousTimer.current = setInterval(() => action(), 100);
        }, 1000);
      }}
      onMouseUp={() => {
        clearTimeout(startTimer.current);
        clearInterval(continuousTimer.current);
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomInputNumber;
