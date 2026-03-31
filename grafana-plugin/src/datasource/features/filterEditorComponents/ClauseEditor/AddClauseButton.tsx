import { Menu, Dropdown, IconButton } from '@grafana/ui';
import { ClickBubblingStopper } from 'public-ui';
import React from 'react';

import { tid } from 'datasource/components';

type AddClauseButtonProps = {
  addClauseWithOr: () => void;
  addClauseWithAnd: () => void;
};

export function AddClauseButton({ addClauseWithOr, addClauseWithAnd }: AddClauseButtonProps) {
  const menu = (
    <Menu>
      <Menu.Item
        label="AND"
        onClick={addClauseWithAnd}
        // data-testid doesn't work, so using className
        className="clause-editor.add-clause-button.and"
      />
      <Menu.Item
        label="OR"
        onClick={addClauseWithOr}
        // data-testid doesn't work, so using className
        className="clause-editor.add-clause-button.or"
      />
    </Menu>
  );

  return (
    <ClickBubblingStopper>
      <Dropdown overlay={menu} data-testid={tid('clause-editor.add-clause-button')}>
        <IconButton
          aria-label="add"
          name="plus"
          size="lg"
          data-testid={tid('clause-editor.add-clause-button.plus-icon')}
        />
      </Dropdown>
    </ClickBubblingStopper>
  );
}
