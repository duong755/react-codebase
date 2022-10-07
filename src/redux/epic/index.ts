import { combineEpics } from "redux-observable";

import { languageChangeEpic } from "./language";

export const rootEpic = combineEpics(languageChangeEpic);
