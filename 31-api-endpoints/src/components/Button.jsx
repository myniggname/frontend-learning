/**
 * @typedef {Object} ButtonProps
 * @property {string} label
 * @property {() => void} onClick
 */

/**
 * @param {ButtonProps} props
 */
export function Button({ label, onClick }) {
  return (
    <button
      className="inline-block py-1.5 px-2.5 border-none rounded-md bg-neutral-900 text-white font-medium text-center cursor-pointer"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
