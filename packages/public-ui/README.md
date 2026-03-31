# Public UI

This package contains UI components that are supposed to be shared among consumers.

## Storybook for components

Storybook allows to develop common UI components independently from consumers.
Documentation is available on [this link](https://storybook.js.org/docs).

To get storybook environment run `pnpm storybook` command in `public-ui` directory. It will open application on `http://localhost:6006/` address where you will be able to see all the stories that are in `/src` folder and end with `.stories.ts`.
It is possible to check components with different background and theme. To change them use toolbar on the top of storybook.
To configure more backgrounds and/or themes you should update `.storybook/preview.tsx` file with necessary configuration.

To run storybook update run `npx storybook@latest upgrade`. It will install latest available version of storybook for project.
