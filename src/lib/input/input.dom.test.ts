import { getInput } from "../../test-utils/accessibility-assertions";
import Input from "./Input.svelte";
import { commonControlScenarios, commonRenderingScenarios } from "../../test-utils/scenarios.dom";

commonRenderingScenarios(Input, { getElement: getInput });
commonControlScenarios(Input);
describe.skip("commonFormScenarios", () => {});
