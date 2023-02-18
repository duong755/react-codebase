import React from "react";
import { Helmet } from "react-helmet";

import { useAppTranslation } from "#/lib/translation";

export const AboutScreen: React.FunctionComponent = () => {
  const { t } = useAppTranslation("about-screen");
  return (
    <>
      <Helmet>
        <title>{t("title", { defaultValue: "About" })}</title>
      </Helmet>
      <div>path "/about"</div>
    </>
  );
};
