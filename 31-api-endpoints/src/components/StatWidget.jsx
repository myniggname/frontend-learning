import {
  IconListClipboard,
  IconListLayout,
  IconSquareCheck,
} from '@/components/Icons';
import { StatWidgetVariants } from '@/constants/task';
import { cn } from '@/lib/utils';

const statWidgetVariantClass = {
  [StatWidgetVariants.LEAD]:
    'bg-linear-to-b from-lead-100 to-lead-200 text-lead-50',
  [StatWidgetVariants.INFO]:
    'bg-linear-to-b from-info-100 to-info-200 text-info-50',
  [StatWidgetVariants.SUCCESS]:
    'bg-linear-to-b from-success-100 to-success-200 text-success-50',
};

const statWidgetVariantIcon = Object.freeze({
  [StatWidgetVariants.LEAD]: <IconListClipboard />,
  [StatWidgetVariants.INFO]: <IconListLayout />,
  [StatWidgetVariants.SUCCESS]: <IconSquareCheck />,
});

/**
 * @typedef {Object} StatWidgetProps
 * @typedef {string} Icon
 * @typedef {string} label
 * @typedef {string} value
 * @typedef {string} variant
 */

/**
 * @typedef {StatWidgetProps} props
 */
export function StatWidget({ Icon, label, value, variant }) {
  const renderIcon = Icon || (variant && statWidgetVariantIcon[variant]);

  return (
    <div
      className={cn(
        'flex-1 rounded-xl p-3',
        variant && statWidgetVariantClass[variant],
      )}
    >
      {renderIcon && <div className="mb-2 block">{renderIcon}</div>}
      <div className="mb-2 block">{Icon}</div>
      <div className="flex items-end justify-between">
        <span className="text-sm font-bold">{label}</span>
        <span className="text-[40px] leading-10 font-bold">{value}</span>
      </div>
    </div>
  );
}
