import React from "react";

import { languageChangeThunk } from "#/redux/thunk";
import type { MyAppDispatch, MyAppState } from "#/redux/store";

interface AppMiddlewareProps {
  dispatch: MyAppDispatch;
  language: MyAppState["language"];
}

export const AppThunk: React.FunctionComponent<AppMiddlewareProps> = ({ dispatch, language }) => {
  const handleChangeLanguageSelection: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const languageCode = event.target.value;
    dispatch(languageChangeThunk(languageCode));
  };

  return (
    <div className="bg-blue-400">
      <div>Redux Thunk</div>
      <select value={language.value} onChange={handleChangeLanguageSelection}>
        <option value="en">en</option>
        <option value="de">de</option>
        <option value="vi">vi</option>
      </select>
    </div>
  );
};

export const AppSaga: React.FunctionComponent<AppMiddlewareProps> = ({ dispatch, language }) => {
  const handleChangeLanguageSelection: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const languageCode = event.target.value;
    dispatch({ type: "[saga]language/change", payload: languageCode });
  };

  return (
    <div className="bg-purple-400">
      <div>Redux Saga</div>
      <select value={language.value} onChange={handleChangeLanguageSelection}>
        <option value="en">en</option>
        <option value="de">de</option>
        <option value="vi">vi</option>
      </select>
    </div>
  );
};

export const AppEpic: React.FunctionComponent<AppMiddlewareProps> = ({ dispatch, language }) => {
  const handleChangeLanguageSelection: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const languageCode = event.target.value;
    dispatch({ type: "[epic]language/change", payload: languageCode });
  };

  return (
    <div className="bg-pink-400">
      <div>Redux Observable</div>
      <select value={language.value} onChange={handleChangeLanguageSelection}>
        <option value="en">en</option>
        <option value="de">de</option>
        <option value="vi">vi</option>
      </select>
    </div>
  );
};
