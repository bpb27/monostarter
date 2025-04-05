import { Navbar, Text } from "@repo/design";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Navbar> = {
  title: "Example/Navbar",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: "Basic",
  render: () => (
    <Navbar.Root>
      <Navbar.Left>
        <Text>Hey 1</Text>
        <Text>Hey 2</Text>
      </Navbar.Left>
      <Navbar.Right>
        <Text>Hey 3</Text>
        <Text>Hey 4</Text>
        <Navbar.Dropdown>
          <Navbar.DropdownItem actionDescription="Item 1">Item 1</Navbar.DropdownItem>
          <Navbar.DropdownItem actionDescription="Item 2">Item 2</Navbar.DropdownItem>
        </Navbar.Dropdown>
      </Navbar.Right>
    </Navbar.Root>
  ),
};
