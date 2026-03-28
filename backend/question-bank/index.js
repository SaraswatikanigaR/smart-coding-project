import { arraysMCQ } from "./arrays/arrays-mcq.js";
import { arraysCoding } from "./arrays/arrays-coding.js";

import { stringsMCQ } from "./strings/strings-mcq.js";
import { stringsCoding } from "./strings/strings-coding.js";

import { hashmapsMCQ } from "./hashmaps/hashmaps-mcq.js";

export const questionBank = [
  ...arraysMCQ,
  ...arraysCoding,
  ...stringsMCQ,
  ...stringsCoding,
  ...hashmapsMCQ
];