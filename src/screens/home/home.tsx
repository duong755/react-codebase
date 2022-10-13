import React from "react";
import { Helmet } from "react-helmet";

import { useAppTranslation } from "#/utils/translation";

export const HomeScreen: React.FunctionComponent = () => {
  const { t } = useAppTranslation("home-screen");
  return (
    <>
      <Helmet>
        <title>{t("title", { defaultValue: "Home page" })}</title>
      </Helmet>
      <div>path "/"</div>
    </>
  );
};
