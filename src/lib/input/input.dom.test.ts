import Input from "./Input.svelte";
import { getInput } from "../../test-utils/accessibility-assertions";
import { focus, type, word } from "../../test-utils/interactions";
import {
  commonControlScenarios,
  commonFormScenarios,
  commonRenderingScenarios,
} from "../../test-utils/scenarios.dom";

commonRenderingScenarios(Input, { getElement: getInput });
commonControlScenarios(Input);
commonFormScenarios(Input, {
  async performUserInteraction(input) {
    await focus(input);
    await type(word("alice"));
  },
});
