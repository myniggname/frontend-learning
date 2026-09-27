import IconPenLine from '@/assets/images/icon-pen-line.svg';
import { useCallback, useState } from 'react';

/**
 * @typedef {Object} InputControlProps
 * @property {(name: string) => void} onAddTask
 */

/**
 * @param {InputControlProps} props
 */
export function InputControl({ onAddTask }) {
  const [value, setValue] = useState('');

  const handleOnInputChange = useCallback((event) => {
    setValue(event.target.value);
  });

  const handleClickOnAddButton = useCallback(
    (event) => {
      const name = value.trim();
      if (!name) return;

      onAddTask(name);
      setValue('');
    },

    [value, onAddTask],
  );

  return (
    <div className="flex items-center gap-3">
      <span className="inline-block">
        <img src={IconPenLine} />
      </span>
      <input
        type="text"
        className="flex-1 border-none font-medium outline-none"
        placeholder="Add a new task"
        onChange={handleOnInputChange}
      />
      <button
        className="gap-1.5 rounded-md bg-[#1E1E1E] px-2.5 py-1.5 text-white"
        onClick={handleClickOnAddButton}
      >
        + Add
      </button>
    </div>
  );
}
