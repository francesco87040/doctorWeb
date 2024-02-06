import { Meta, StoryObj } from '@storybook/angular';

import { CarddoctorComponent } from './carddoctor.component';

type ComponentWithCustomControls = CarddoctorComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Carddoctor',
  component: CarddoctorComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Carddoctor` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Carddoctor: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
