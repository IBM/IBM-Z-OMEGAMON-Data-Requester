import { ArrowDown } from '@carbon/icons-react';
import { TextInput, Button, DismissibleTag } from '@carbon/react';
import React, { forwardRef } from 'react';

import { sharedApply, Option, FUIBadgeProps } from '~/Select';

export type FUISelectProps = {
  options: Option[];
  allowCustomValues?: boolean;
  value?: Option;
  placeHolder?: string;
};

export const options: Option[] = [
  {
    label: 'DB2 Subsystems',
    value: 'KDP',
    id: '%IBM.STATIC017',
    apply: sharedApply,
  },
  {
    label: 'MVS CICSTG',
    value: 'KGW',
    id: '%IBM.STATIC115',
    apply: sharedApply,
  },
  {
    label: 'IMS Subsystems',
    value: 'KIP',
    id: '%IBM.STATIC014',
    apply: sharedApply,
  },
];

export const variables: Option[] = [
  {
    id: 'db2id',
    value: '${db2id}',
    label: 'DB2 variable',
    apply: sharedApply,
  },
];

export const AsCombobox = forwardRef<HTMLDivElement>(function F(props, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className="fui:flex fui:flex-row fui:items-center fui:bg-[var(--cds-field)] fui:!p-[2px] fui:focus-within:!outline-[2px] fui:focus-within:!outline-offset-[-2px] fui:focus-within:!outline-[var(--cds-focus)]"
      style={{
        borderBlockEnd: '1px solid var(--cds-border-strong)',
      }}
    />
  );
});

export const AsButton = forwardRef<HTMLButtonElement>(function F(props, ref) {
  return (
    <Button {...props} hasIconOnly size="md" kind="ghost" iconDescription="Open" renderIcon={ArrowDown} ref={ref} />
  );
});

export const AsInput = forwardRef<HTMLInputElement>(function F(props, ref) {
  return <TextInput {...props} ref={ref} labelText="" id="fui-input" />;
});

export const AsOptions = forwardRef<HTMLDivElement>(function F(props, ref) {
  return <div {...props} ref={ref} className="fui:bg-[var(--cds-field)] fui:text-[var(--cds-text-primary)]" />;
});

export const AsOption = forwardRef<HTMLDivElement>(function F(props, ref) {
  return <div {...props} ref={ref} className="cds--list-box__menu-item__option" />;
});

export const AsFields = forwardRef<HTMLDivElement>(function F(props, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className="fui:flex fui:flex-row"
      style={{
        gap: '1rem',
        padding: '0.5rem',
      }}
    />
  );
});

export const AsBadge = forwardRef<HTMLDivElement, FUIBadgeProps>(function F({ onRemove, ...props }, ref) {
  return (
    <DismissibleTag
      {...props}
      ref={ref}
      onClose={(e: React.MouseEvent) => {
        e.stopPropagation();
        if (onRemove) {
          onRemove(props.option);
        }
      }}
      title="Remove"
      text={props.option.label || props.option.value}
      type="high-contrast"
    />
  );
});
