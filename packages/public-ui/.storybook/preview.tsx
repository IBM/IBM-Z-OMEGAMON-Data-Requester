import type { Preview } from '@storybook/react';

import React from 'react';
import { Theme } from '@carbon/react';
import { PartialStoryFn, StoryContext } from '@storybook/types';

import '~/app.css';
import '@carbon/styles/css/styles.css';

const withCarbonTheme = (Story: PartialStoryFn, context: StoryContext) => {
  const { theme } = context.globals;
  return (
    <Theme theme={theme}>
      <div style={{ padding: '3rem' }}>
        <Story />
      </div>
    </Theme>
  );
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'white',
    toolbar: {
      icon: 'circlehollow',

      items: [
        { value: 'white', title: 'Carbon White' },
        { value: 'g10', title: 'Carbon g10' },
        { value: 'g90', title: 'Carbon g90' },
        { value: 'g100', title: 'Carbon g100' },
      ],
      showName: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'Dark', value: '#0F1115' },
        { name: 'Light', value: '#FFFFFF' },
      ],
      default: 'Light',
    },
    controls: { expanded: true },
  },
  decorators: [withCarbonTheme],
};

export default preview;
