import { createAction } from "@reduxjs/toolkit";

export const epicActions = {
  language: {
    change: createAction<string>("[epic]language/change"),
  },
};
