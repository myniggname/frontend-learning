/**
 * @typedef {Object} IconCheckProps
 * @property {string} stroke
 */

/**
 * @param {IconCheckProps} props
 */
export function IconCheck(props) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 3.5L5.25004 9.91667L2.33337 7"
        stroke={props.stroke || '#0088FF'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
