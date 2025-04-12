import { Button, Container, Field, Heading, Input } from "@repo/design";
import { fieldTypes, useQueryParams } from "~/utils/serializer";

const schema = {
  name: fieldTypes.string(),
  age: fieldTypes.integer(),
  status: fieldTypes.enum(["active", "inactive"]),
  favoriteColors: fieldTypes.enums(["red", "green", "blue"]),
};

export const AboutPage = () => {
  const [qps, setQps, toggle] = useQueryParams({ schema });
  return (
    <Container maxW="lg" display="flex" flexDirection="column" gap="4">
      <Heading size="2xl">About</Heading>
      <Field label="Name">
        <Input name="Name" value={qps.name} onChange={e => setQps({ name: e.target.value })} />
      </Field>
      <Field label="Age">
        <Input name="Age" type="number" value={qps.age} onChange={e => setQps({ age: Number(e.target.value) })} />
      </Field>
      <Button onClick={() => setQps({ status: "active" })}>Set active</Button>
      <Button onClick={() => setQps({ status: "inactive" })}>Set inactive</Button>
      <Button onClick={() => toggle({ favoriteColors: "red" })} colorPalette="red">
        Red {qps.favoriteColors.includes("red") ? "(selected)" : ""}
      </Button>
      <Button onClick={() => toggle({ favoriteColors: "green" })} colorPalette="green">
        Green {qps.favoriteColors.includes("green") ? "(selected)" : ""}
      </Button>
      <Button onClick={() => toggle({ favoriteColors: "blue" })} colorPalette="blue">
        Blue {qps.favoriteColors.includes("blue") ? "(selected)" : ""}
      </Button>
      <Heading size="lg">Query Parameters</Heading>
      <pre>{JSON.stringify(qps, null, 2)}</pre>
    </Container>
  );
};
