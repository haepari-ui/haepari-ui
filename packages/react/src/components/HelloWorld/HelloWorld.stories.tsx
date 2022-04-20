import HelloWorld from './HelloWorld';
import React from 'react';

export default {
  component: HelloWorld,
  title: 'HelloWorld',
};

const Template = (args) => <HelloWorld {...args} />;

export const Default = Template.bind({});
Default.args = {
  HelloWorld: {},
};
