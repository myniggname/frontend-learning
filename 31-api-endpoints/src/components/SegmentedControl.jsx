import { useCallback } from 'react';
import { Segment } from './Segment';

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
export function SegmentedControl({
  segments,
  selectedSegment,
  onSelectSegment,
}) {
  const handleSelectSegment = useCallback(
    (value) => {
      onSelectSegment?.(value);
    },
    [onSelectSegment],
  );

  const getIsSelected = (segmentValue) => {
    if (typeof selectedSegment === 'object' && selectedSegment !== null) {
      return segmentValue === selectedSegment.value;
    }
    return segmentValue === selectedSegment;
  };

  return (
    <div className="flex w-60 rounded-md bg-neutral-50 p-0.5">
      {segments?.map((segment) => (
        <Segment
          key={segment.value}
          label={segment.label}
          isSelected={getIsSelected(segment.value)}
          onSelect={() => handleSelectSegment(segment)}
        />
      ))}
    </div>
  );
}
