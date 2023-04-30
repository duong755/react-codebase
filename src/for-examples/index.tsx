import React from "react";

import { languageChangeThunk } from "#/redux/thunk";
import type { MyAppState } from "#/redux/slice";
import type { MyAppDispatch } from "#/redux/store";
import { sagaActions } from "#/redux/saga";
import { epicActions } from "#/redux/epic";

interface AppMiddlewareProps {
  dispatch: MyAppDispatch;
  language: MyAppState["language"];
  className: string;
  middlewareName: string;
  handleChangeSelection: React.ChangeEventHandler<HTMLSelectElement>;
}

const AppBase: React.FC<Omit<AppMiddlewareProps, "dispatch">> = ({
  language,
  handleChangeSelection,
  className,
  middlewareName,
}) => {
  return (
    <div className={className}>
      <div>{middlewareName}</div>
      <select value={language.value} onChange={handleChangeSelection}>
        <option value="en">en</option>
        <option value="de">de</option>
        <option value="vi">vi</option>
      </select>
    </div>
  );
};

export const AppThunk: React.FC<Pick<AppMiddlewareProps, "dispatch" | "language">> = ({ dispatch, language }) => {
  const handleChangeLanguageSelection: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const languageCode = event.target.value;
    dispatch(languageChangeThunk(languageCode));
  };

  return (
    <AppBase
      middlewareName="thunk"
      handleChangeSelection={handleChangeLanguageSelection}
      language={language}
      className="bg-blue-400"
    />
  );
};

export const AppSaga: React.FC<Pick<AppMiddlewareProps, "dispatch" | "language">> = ({ dispatch, language }) => {
  const handleChangeLanguageSelection: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const languageCode = event.target.value;
    dispatch(sagaActions.language.change(languageCode));
  };

  return (
    <AppBase
      middlewareName="saga"
      handleChangeSelection={handleChangeLanguageSelection}
      language={language}
      className="bg-purple-400"
    />
  );
};

export const AppEpic: React.FC<Pick<AppMiddlewareProps, "dispatch" | "language">> = ({ dispatch, language }) => {
  const handleChangeLanguageSelection: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const languageCode = event.target.value;
    dispatch(epicActions.language.change(languageCode));
  };

  return (
    <AppBase
      middlewareName="observable"
      handleChangeSelection={handleChangeLanguageSelection}
      language={language}
      className="bg-pink-400"
    />
  );
};
