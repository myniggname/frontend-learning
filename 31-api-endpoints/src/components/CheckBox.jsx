import { IconCheck } from '@/components/Icons';

/**
 * @typedef {Object} CheckBoxProps
 * @property {boolean} isChecked
 * @property {() => void} onToggle
 */

/**
 * @param {CheckBoxProps} props
 */
export function CheckBox({ isChecked, onToggle }) {
  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white transition-colors"
      onClick={onToggle}
    >
      {isChecked && <IconCheck stroke="#0088FF" className="h-3 w-3 block" />}
    </span>
  );
}
