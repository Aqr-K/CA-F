import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import { VBtn } from "vuetify/components/VBtn";
import * as labsComponents from "vuetify/labs/components";
import defaults from "./defaults";
import theme from "./theme";
import { Ripple } from "vuetify/directives";

// Styles
import "vuetify/styles";

export default createVuetify({
  aliases: {
    IconBtn: VBtn,
  },
  directives: {
    Ripple,
  },
  defaults,
  theme,
  components: {
    ...components,
    ...labsComponents,
  },
});
