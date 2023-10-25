import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera.component';



const meta: Meta<CameraComponent> = {
    title: 'Camera',
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
          },
    },
  component: CameraComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CameraComponent>;

export const Default: Story = {
  render: (args: CameraComponent) => ({
    props: args,
  }),
};
