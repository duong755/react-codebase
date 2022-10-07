import React from "react";

import { useCustomTranslation } from "./utils/translation";

const App: React.FunctionComponent = () => {
  const { t } = useCustomTranslation();

  return (
    <div className="text-center">
      <div className="font-bold">{t("introduction")}</div>
    </div>
  );
};

export { App };
