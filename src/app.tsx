import React from "react";

import { MyAppState, useAppDispatch, useAppSelector } from "./redux/store";
import type { MyAppDispatch } from "./redux/store";
import { languageChangeThunk } from "./redux/thunk";

import { useCustomTranslation } from "./utils/translation";

interface AppMiddlewareProps {
  dispatch: MyAppDispatch;
  language: MyAppState["language"];
}

const AppThunk: React.FunctionComponent<AppMiddlewareProps> = ({ dispatch, language }) => {
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

const AppSaga: React.FunctionComponent<AppMiddlewareProps> = ({ dispatch, language }) => {
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

const AppEpic: React.FunctionComponent<AppMiddlewareProps> = ({ dispatch, language }) => {
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

const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language);
  const { t } = useCustomTranslation();

  return (
    <div className="text-center">
      <h4 className="font-bold text-3xl py-2">Choose a Redux middleware</h4>
      <div className="flex">
        <div className="w-1/3">
          <AppThunk language={language} dispatch={dispatch} />
        </div>
        <div className="w-1/3">
          <AppSaga language={language} dispatch={dispatch} />
        </div>
        <div className="w-1/3">
          <AppEpic language={language} dispatch={dispatch} />
        </div>
      </div>
      <div className="font-bold">{t("introduction")}</div>
    </div>
  );
};

export { App };
