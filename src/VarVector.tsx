import React, { FC, useMemo } from 'react';
// import React, { FC, useCallback, useMemo } from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { roundValue } from './common/roundValue';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarVectorProps extends IVarBaseInputProps<number> {
  /**
   * Minimum value.
   */
  min?: number;

  /**
   * Maximum value.
   */
  max?: number;

  /**
   * Step.
   */
  step?: number;

  /**
   * Should the end result be rounded to an integer value.
   */
  integer?: boolean;
}

/**
 * Integer/float number component. Accepts and provides numbers.
 */
export const VarVector: FC<IVarVectorProps> = ({
  label,
  path,
  value,
  onChange,
  min,
  max,
  step = 1,
  integer,
  disabled,
  className,
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
  const rounded = useMemo(
    () => roundValue(currentValue, min, max, step, !!integer),
    [currentValue, min, max, step, integer]
  );

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <div className="react-var-ui-vector">
        <input
          className="react-var-ui-vector-input"
          type="number"
          min={min}
          max={max}
          step={step}
          value={rounded.toString()}
          onChange={e =>
            setCurrentValue(
              roundValue(parseFloat(e.target.value), min, max, step, !!integer)
            )
          }
        />
        <input
          className="react-var-ui-vector-input"
          type="number"
          min={min}
          max={max}
          step={step}
          value={rounded.toString()}
          onChange={e =>
            setCurrentValue(
              roundValue(parseFloat(e.target.value), min, max, step, !!integer)
            )
          }
        />
        <input
          className="react-var-ui-vector-input"
          type="number"
          min={min}
          max={max}
          step={step}
          value={rounded.toString()}
          onChange={e =>
            setCurrentValue(
              roundValue(parseFloat(e.target.value), min, max, step, !!integer)
            )
          }
        />
      </div>
    </VarBase>
  );
};
