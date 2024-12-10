import { getInput } from "../../test-utils/accessibility-assertions";
import Input from "./Input.svelte";
import { commonRenderingScenarios } from "../../test-utils/scenarios";

commonRenderingScenarios(Input, { getElement: getInput });
describe.skip("commonControlScenarios", () => {});
describe.skip("commonFormScenarios", () => {});
