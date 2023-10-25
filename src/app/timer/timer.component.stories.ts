import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer.component';



const meta: Meta<TimerComponent> = {
    title: 'Timer',
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
          },
    },
  component: TimerComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TimerComponent>;

export const Default: Story = {
  render: (args: TimerComponent) => ({
    props: args,
  }),
};
