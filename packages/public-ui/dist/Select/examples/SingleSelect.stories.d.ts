import { StoryObj } from '@storybook/react';
import { default as SingleSelect } from './SingleSelect';
declare const meta: {
    title: string;
    component: typeof SingleSelect;
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
export declare const AllowCustomValues: Story;
