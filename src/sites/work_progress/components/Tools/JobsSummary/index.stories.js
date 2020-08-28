import React from 'react';

import JobsSummary from './index';

export default {
	component: JobsSummary,
	title: 'Jobs Summary',
};
const Template = (args) => <JobsSummary {...args} />;

export const Default = Template.bind({});
Default.args = {};
