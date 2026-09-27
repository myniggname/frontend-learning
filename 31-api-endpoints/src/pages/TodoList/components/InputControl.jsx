import { IconPenLine } from '@/components/Icons';
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

  const hasValue = value.trim().length > 0;

  const handleOnInputChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const handleClickOnAddButton = useCallback(() => {
    const name = value.trim();
    if (!name) return;

    onAddTask(name);
    setValue('');
  }, [value, onAddTask]);

  const handleKeyDownOnInput = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleClickOnAddButton();
      }
    },
    [handleClickOnAddButton],
  );

  return (
    <div className="flex items-center gap-3">
      <span className="inline-block">
        <IconPenLine className="h-5 w-5 text-gray-500" />
      </span>
      <input
        type="text"
        className="flex-1 border-none font-medium outline-none"
        placeholder="Add a new task"
        value={value}
        onChange={handleOnInputChange}
        onKeyDown={handleKeyDownOnInput}
      />
      <button
        className={`gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-colors ${
          hasValue
            ? 'bg-[#1E1E1E] text-white cursor-pointer'
            : 'bg-[#EBEBEB] text-neutral-400 cursor-not-allowed'
        }`}
        onClick={handleClickOnAddButton}
        disabled={!hasValue}
      >
        + Add
      </button>
    </div>
  );
}
