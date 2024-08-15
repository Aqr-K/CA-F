import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import { VBtn } from "vuetify/components/VBtn";
import * as labsComponents from "vuetify/labs/components";
import defaults from "./defaults";
import theme from "./theme";

// Styles
import "vuetify/styles";

export default createVuetify({
  aliases: {
    IconBtn: VBtn,
  },
  defaults,
  theme,
  components: {
    ...components,
    ...labsComponents,
  },
});
