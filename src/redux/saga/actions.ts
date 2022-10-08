import { createAction } from "@reduxjs/toolkit";

export const sagaActions = {
  language: {
    change: createAction<string>("[saga]language/change"),
  },
};
