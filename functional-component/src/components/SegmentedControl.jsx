import { Segment } from './Segment';
import { useCallback } from 'react';

/**
 * @typedef {Object} Segment
 * @property {number} value
 * @property {string} label
 */

/**
 * @typedef {Object} SegmentedControlProps
 * @property {Segment[]} segments
 * @property {Segment} selectedSegment
 * @property {(selectedSegment: Segment) => void} onSelectSegment
 */

/**
 * @param {SegmentedControlProps} props
 */
export function SegmentedControl({ segment, selectedSegment, onSelectSegment }) {
  return (
    <div className="flex w-60 rounded-md bg-neutral-50 p-0.5">
      {segments.map((segment) => (
        <Segment 
          key={segment.value}
          label={segment.label}
          isSelected={segment === selectedSegment}
          onSelect={handleSelectSegment} 
        />
      ))}
    </div>
  )
}