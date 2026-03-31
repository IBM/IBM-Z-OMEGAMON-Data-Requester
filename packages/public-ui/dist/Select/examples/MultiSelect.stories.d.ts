import { StoryObj } from '@storybook/react';
import { default as MultiSelect } from './MultiSelect';
declare const meta: {
    title: string;
    component: typeof MultiSelect;
    parameters: {
        layout: string;
    };
    argTypes: {};
    args: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const NoOptions: Story;
export declare const Default: Story;
export declare const WithSelectedItems: Story;
export declare const AllowCustomValues: Story;
