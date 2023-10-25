import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { WelcomeComponent } from './welcome.component';

const meta: Meta<WelcomeComponent> = {
    title: 'Welcome',
    parameters: {
      viewport: {
        defaultViewport: 'mobile1',
      },
    },
  component: WelcomeComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<WelcomeComponent>;

export const Default: Story = {
  render: (args: WelcomeComponent) => ({
    props: args,
  }),
};
