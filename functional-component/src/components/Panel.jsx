/**
 * @typedef {Object} PanelProps
 * @property {React.ReactNode} children
 */

/**
 * @param {PanelProps} props
 */
function Panel({ children }) {
  return (
    <section className="rounded-xl border border-solid border-neutral-100 bg-white">
      {children}
    </section>
  );
}

/**
 * @typedef {Object} PanelHeaderProps
 * @property {React.ReactNode} children
 */

/**
 * @param {PanelHeaderProps} props
 */
function PanelHeader({ children }) {
  return (
    <div className="border-b border-solid border-neutral-100 p-3.5">
      {children}
    </div>
  );
}

/**
 * @typedef {Object} PanelBodyProps
 * @property {React.ReactNode} children
 */

/**
 * @param {PanelBodyProps} props
 */
function PanelBody({ children }) {
  return <div className="p-3.5">{children}</div>;
}

Panel.Header = PanelHeader;
Panel.Body = PanelBody;

export { Panel };
