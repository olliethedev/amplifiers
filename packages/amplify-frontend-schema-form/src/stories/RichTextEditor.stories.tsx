import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import RichTextEditor from './RichTextEditor';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Editor',
  component: RichTextEditor,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof RichTextEditor>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RichTextEditor> = (args) => <RichTextEditor {...args} />;

export const Editor = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Editor.args = {
  initialMarkdown: 'Hello **World**',
};

