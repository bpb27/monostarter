import { Button, Container, Field, Heading, Input } from "@repo/design";
import * as v from "valibot";
import { qpSchema, useQueryParams } from "~/utils/query-params";

const schema = v.object({
  name: qpSchema.string,
  age: qpSchema.number,
  status: qpSchema.enum(["active", "inactive"]),
});

export const AboutPage = () => {
  const [qps, setQps] = useQueryParams(schema);
  return (
    <Container maxW="lg" display="flex" flexDirection="column" gap="4">
      <Heading size="2xl">About</Heading>
      <Field label="Name">
        <Input name="Name" value={qps.name} onChange={(e) => setQps({ name: e.target.value })} />
      </Field>
      <Field label="Age">
        <Input name="Age" type="number" value={qps.age} onChange={(e) => setQps({ age: Number(e.target.value) })} />
      </Field>
      <Button onClick={() => setQps({ status: "active" })}>Set active</Button>
      <Button onClick={() => setQps({ status: "inactive" })}>Set inactive</Button>
      <Heading size="lg">Query Parameters</Heading>
      <pre>{JSON.stringify(qps, null, 2)}</pre>
    </Container>
  );
};
