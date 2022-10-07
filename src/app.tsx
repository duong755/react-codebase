import React from "react";

import { useAppDispatch, useAppSelector } from "./redux/store";
import { languageChangeThunk, languageResetThunk } from "./redux/thunk";

import { useCustomTranslation } from "./utils/translation";

const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language);
  const { t } = useCustomTranslation();

  const handleChangeLanguageSelection: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const languageCode = event.target.value;
    dispatch(languageChangeThunk(languageCode));
  };
  const handleClickResetButton: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(languageResetThunk());
  };

  return (
    <div className="text-center">
      <div>
        <select value={language.value} onChange={handleChangeLanguageSelection}>
          <option value="en">en</option>
          <option value="de">de</option>
          <option value="vi">vi</option>
        </select>
        <button className="bg-slate-400" onClick={handleClickResetButton}>
          Reset language
        </button>
      </div>
      <div className="font-bold">{t("introduction")}</div>
    </div>
  );
};

export { App };
