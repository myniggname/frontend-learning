import { useCallback } from 'react';

/**
 * @typedef {Object} SegmentProps
 * @property {string} label
 * @property {number} value
 * @property {boolean} isSelected
 * @property {(segment: {label:string, value: number}) => void} onSelectSegment
 */

/**
 * @param {string} label
 * @param {boolean} isSelected
 * @param {(value:number) => void} onSelect
 */
export function Segment({ label, isSelected, onSelect }) {
  /**
   * @returns {void}
   */
  const handleClick = useCallback(() => {
    onSelect(index);
  }, [index, onSelect]);

  return (
    <button
      className={`flex-1 cursor-pointer rounded-[6px] px-3.5 py-1.25 ${isSelected ? 'bg-white text-inherit' : 'bg-transparent text-neutral-400'
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  ); 
}
