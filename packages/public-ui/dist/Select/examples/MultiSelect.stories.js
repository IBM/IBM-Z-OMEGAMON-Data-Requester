import { variables as o, options as t } from "./data.js";
import e from "./MultiSelect.js";
const l = {
  title: "Example/Multi Select",
  component: e,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered"
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {}
}, r = {
  args: {
    options: []
  }
}, n = {
  args: {
    options: [...o, ...t]
  }
}, i = {
  args: {
    options: [...o, ...t],
    value: [...t]
  }
}, p = {
  args: {
    options: [...o, ...t],
    allowCustomValues: !0
  }
};
export {
  p as AllowCustomValues,
  n as Default,
  r as NoOptions,
  i as WithSelectedItems,
  l as default
};
