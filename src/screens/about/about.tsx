import React from "react";
import { Helmet } from "react-helmet";

import { useCustomTranslation } from "#/utils/translation";

export const AboutScreen: React.FunctionComponent = () => {
  const { t } = useCustomTranslation("about-screen");
  return (
    <>
      <Helmet>
        <title>{t("title", { defaultValue: "About" })}</title>
      </Helmet>
      <div>path "/about"</div>
    </>
  );
};
