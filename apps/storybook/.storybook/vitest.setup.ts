import { setProjectAnnotations } from "@storybook/react";
import { beforeAll } from "vitest";
import * as projectAnnotations from "./preview";

// https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([projectAnnotations]);

beforeAll(project.beforeAll);
