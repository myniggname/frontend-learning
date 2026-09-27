import { useCallback } from 'react';

/**
 * @typedef {Object} SegmentProps
 * @property {string} label
 * @property {number} value
 * @property {boolean} isSelected
 * @property {(segment: {label:string, value: number}) => void} onSelect
 */

/**
 * @param {segmentProps} props
 */
export function Segment({ label, value, isSelected, onSelect }) {
  /**
   * @returns {void}
   */
  const handleClick = useCallback(() => {
    onSelect(value);
  }, [value, onSelect]);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={`flex-1 cursor-pointer rounded-[6px] px-3.5 py-1.25 text-sm font-medium transition-colors select-none ${
        isSelected
          ? 'bg-white text-neutral-900 shadow-sm'
          : 'bg-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/50'
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
