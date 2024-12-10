import { getTextarea } from "../../test-utils/accessibility-assertions";
import { commonControlScenarios, commonRenderingScenarios } from "../../test-utils/scenarios.dom";
import Textarea from "./Textarea.svelte";

commonRenderingScenarios(Textarea, { getElement: getTextarea });
commonControlScenarios(Textarea);
