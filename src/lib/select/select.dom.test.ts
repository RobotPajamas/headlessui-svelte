import Select from "./Select.svelte";
import { getInput, getSelect } from "../../test-utils/accessibility-assertions";
import { focus, type, word } from "../../test-utils/interactions";
import {
  commonControlScenarios,
  commonFormScenarios,
  commonRenderingScenarios,
} from "../../test-utils/scenarios.dom";

commonRenderingScenarios(Select, { getElement: getSelect });
commonControlScenarios(Select);
commonFormScenarios(Select, {
  async performUserInteraction(control) {
    if (control instanceof HTMLSelectElement) {
        control.value = 'alice'
      }
  },
});
