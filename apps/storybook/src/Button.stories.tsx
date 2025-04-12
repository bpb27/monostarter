import { Button, ButtonPropValues } from "@repo/design";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DisplayTable } from "./display-helpers/display-table";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
    loading: false,
    disabled: false,
    loadingText: "Loading",
    variant: "solid",
    size: "md",
    colorPalette: "purple",
  },
  argTypes: {
    onClick: { table: { disable: true } },
    variant: { control: "select", options: ButtonPropValues.variant },
    size: { control: "select", options: ButtonPropValues.size },
    colorPalette: { control: "select", options: ButtonPropValues.colorPalette },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "Button",
  },
};

export const Variants: Story = {
  name: "Variants and Colors",
  argTypes: {
    variant: { table: { disable: true } },
    colorPalette: { table: { disable: true } },
  },
  render: args => (
    <DisplayTable
      rows={ButtonPropValues.variant}
      columns={ButtonPropValues.colorPalette}
      renderItem={(variant, colorPalette) => (
        <Button {...args} variant={variant} colorPalette={colorPalette}>
          Button
        </Button>
      )}
    />
  ),
};

export const Sizes: Story = {
  name: "Variants and Sizes",
  argTypes: {
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  render: args => (
    <DisplayTable
      rows={ButtonPropValues.variant}
      columns={ButtonPropValues.size}
      renderItem={(variant, size) => (
        <Button {...args} variant={variant} size={size}>
          Button
        </Button>
      )}
    />
  ),
};
