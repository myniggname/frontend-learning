import { IconCheck } from '@/components/Icons';

/**
 * @typedef {Object} CheckBoxProps
 * @property {boolean} isChecked
 * @property {() => void} onToggle
 */

/**
 * @param {CheckBoxProps} props
 */
export function CheckBox({ isChecked, onToggled }) {
  return (
    <span
      className="initial-flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white"
      onClick={onToggled}
    >
      {isChecked && <IconCheck stroke="#0088FF" />}
    </span>
  );
}
