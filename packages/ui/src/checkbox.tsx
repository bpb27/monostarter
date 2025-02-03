import { Checkbox, Flex, Text } from "@radix-ui/themes";

export const ConditionsCheckbox = () => (
	<Text as="label" size="2">
		<Flex gap="2">
			<Checkbox defaultChecked />
			Agree to Conditions
		</Flex>
	</Text>
);

export const TermsCheckbox = () => (
	<Text as="label" size="2">
		<Flex gap="2">
			<Checkbox defaultChecked />
			Agree to Terms
		</Flex>
	</Text>
);
