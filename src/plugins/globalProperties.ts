import type { App } from "vue";

import { formatDate_UTC } from "utils/date-format";
import $type from "utils/classifyTypes";

export default function (app: App) {
  app.config.globalProperties.$filters = {
    formatUTC(s: string): string {
      return formatDate_UTC(s);
    },
  };

  app.config.globalProperties.$type = $type;
}
