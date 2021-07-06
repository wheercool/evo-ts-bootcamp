import { ChangeEvent, useCallback } from 'react';

interface Sol {
  value: number;

  onChange(value: number): void;
}

export function Sol(props: Sol) {
  const { value, onChange } = props;
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange(+e.target.value), [value]);
  return <div>
    Sol: <input type="number" min={1} value={value} onChange={handleChange}/>
  </div>
}
