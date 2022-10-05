import React from "react";

import { useCustomTranslation } from "./utils/translation";

const App: React.FunctionComponent = () => {
  const { t } = useCustomTranslation();

  return (
    <div>
      <div className="text-center">{t("introduction")}</div>
    </div>
  );
};

export { App };
