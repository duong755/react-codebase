/* eslint-disable import/no-named-as-default-member */
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import "dayjs/locale/de";
import "dayjs/locale/vi";

import { useTranslation } from "react-i18next";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export const useDatetime = (date?: dayjs.ConfigType) => {
  const { 1: i18n } = useTranslation("translation");
  return dayjs(date).locale(i18n.language);
};

/**
 *
 * @param date
 * @param localizedFormat
 * @link https://day.js.org/docs/en/display/format#list-of-localized-formats
 * @returns
 */
export const useLocalizedDatetime = (date?: dayjs.ConfigType, localizedFormat?: string) => {
  const { 1: i18n } = useTranslation("translation");
  return dayjs(date).locale(i18n.language).format(localizedFormat);
};

/**
 *
 * @param localizedFormat
 * @link https://day.js.org/docs/en/display/format#list-of-localized-formats
 * @returns
 */
export const useLocalizedNow = (localizedFormat?: string) => {
  const { 1: i18n } = useTranslation("translation");
  return dayjs().locale(i18n.language).format(localizedFormat);
};
