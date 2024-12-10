import { getTextarea } from "../../test-utils/accessibility-assertions";
import { commonRenderingScenarios } from "../../test-utils/scenarios";
import Textarea from "./Textarea.svelte";

commonRenderingScenarios(Textarea, { getElement: getTextarea });
