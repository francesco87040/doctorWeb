import { Meta, StoryObj } from '@storybook/angular';

import { HeaderComponent } from './header.component';

type ComponentWithCustomControls = HeaderComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Header',
  component: HeaderComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Header` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Header: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
