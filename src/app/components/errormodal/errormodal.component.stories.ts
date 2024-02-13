import { Meta, StoryObj } from '@storybook/angular';

import { ErrormodalComponent } from './errormodal.component';

type ComponentWithCustomControls = ErrormodalComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Errormodal',
  component: ErrormodalComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Errormodal` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Errormodal: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}