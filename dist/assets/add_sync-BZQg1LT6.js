import {
  a as w,
  S as U,
  r as v,
  v as $,
  o as p,
  h as g,
  i as s,
  w as a,
  a0 as x,
  a1 as S,
  f as B,
  K as m,
  F as E,
  j as I,
  a2 as N,
  g as l,
  B as j,
  C as i,
  t as D,
  a3 as u,
  a4 as r,
  D as c,
  m as C,
  _ as F,
} from "./index-Q-NX_net.js";
import { S as W, a as q } from "./variable-BbLTKFSv.js";
import {
  _ as z,
  a as K,
  b as L,
  c as M,
  d as R,
} from "./Setting115.vue_vue_type_script_setup_true_lang-Kn3AcSSq.js";
const A = { class: "btn-settings" },
  G = { class: "btn-settings" },
  H = { class: "btn-settings" },
  J = { class: "btn-settings" },
  O = { class: "btn-settings" },
  P = w({
    __name: "add_sync",
    setup(Q) {
      const _ = U.useToast(),
        b = B(),
        o = v({ ...W }),
        f = v(b.query.tab),
        k = [
          { tab: "symlink", icon: "mdi-link-variant", title: "软链接" },
          {
            tab: "scheduled_task",
            icon: "mdi-calendar-clock",
            title: "定时任务",
          },
          { tab: "sync_observer", icon: "mdi-eye", title: "实时监控" },
          {
            tab: "cloud_status",
            icon: "mdi-weather-cloudy",
            title: "掉盘检测",
          },
          { tab: "115_settings", icon: "mdi-sync", title: "115配置" },
        ],
        y = v([{ ...q }]);
      async function V() {
        try {
          const n = await m.get("/autosymlink/sync_list");
          n.length > 0 && (y.value = n);
        } catch (n) {
          console.error("Error fetching sync config:", n);
        }
        try {
          const n = await m.get("/autosymlink/sync_template");
          o.value = n;
        } catch (n) {
          console.error("Error fetching sync config:", n);
        }
      }
      async function d() {
        try {
          const n = await m.post("/autosymlink/add_sync/save_config", o.value);
          n.success ? _.success(n.message) : _.error(n.message),
            setTimeout(() => {
              C.push("/sync_list");
            }, 1e3);
        } catch (n) {
          console.error("Error fetching sync config:", n);
        }
      }
      function T(n) {
        C.push("/add_sync?tab=" + n);
      }
      return (
        $(() => {
          V();
        }),
        (n, e) => (
          p(),
          g("div", null, [
            s(
              x,
              {
                modelValue: f.value,
                "onUpdate:modelValue": e[0] || (e[0] = (t) => (f.value = t)),
                "show-arrows": "",
                class: "v-tabs-pill",
              },
              {
                default: a(() => [
                  (p(),
                  g(
                    E,
                    null,
                    I(k, (t) =>
                      s(
                        N,
                        {
                          key: t.icon,
                          value: t.tab,
                          "selected-class":
                            "v-slide-group-item--active v-tab--selected",
                          onClick: (X) => T(t.tab),
                        },
                        {
                          default: a(() => [
                            l("div", null, [
                              s(
                                j,
                                { size: "20", start: "", icon: t.icon },
                                null,
                                8,
                                ["icon"]
                              ),
                              i(" " + D(t.title), 1),
                            ]),
                          ]),
                          _: 2,
                        },
                        1032,
                        ["value", "onClick"]
                      )
                    ),
                    64
                  )),
                ]),
                _: 1,
              },
              8,
              ["modelValue"]
            ),
            s(
              S,
              {
                modelValue: f.value,
                "onUpdate:modelValue": e[7] || (e[7] = (t) => (f.value = t)),
                class: "mt-5 disable-tab-transition",
                touch: !1,
              },
              {
                default: a(() => [
                  s(
                    u,
                    { value: "symlink" },
                    {
                      default: a(() => [
                        s(
                          r,
                          { name: "fade-slide", appear: "" },
                          {
                            default: a(() => [
                              l("div", null, [
                                s(
                                  z,
                                  {
                                    syncConfig: o.value,
                                    "onUpdate:syncConfig":
                                      e[1] || (e[1] = (t) => (o.value = t)),
                                    syncTemplate: y.value,
                                    "onUpdate:syncTemplate":
                                      e[2] || (e[2] = (t) => (y.value = t)),
                                    isNew: !0,
                                  },
                                  {
                                    footer: a(() => [
                                      l("div", A, [
                                        s(
                                          c,
                                          { onClick: d },
                                          {
                                            default: a(
                                              () => e[8] || (e[8] = [i("保存")])
                                            ),
                                            _: 1,
                                          }
                                        ),
                                      ]),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["syncConfig", "syncTemplate"]
                                ),
                              ]),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  s(
                    u,
                    { value: "scheduled_task" },
                    {
                      default: a(() => [
                        s(
                          r,
                          { name: "fade-slide", appear: "" },
                          {
                            default: a(() => [
                              l("div", null, [
                                s(
                                  K,
                                  {
                                    syncConfig: o.value,
                                    "onUpdate:syncConfig":
                                      e[3] || (e[3] = (t) => (o.value = t)),
                                  },
                                  {
                                    footer: a(() => [
                                      l("div", G, [
                                        s(
                                          c,
                                          { onClick: d },
                                          {
                                            default: a(
                                              () => e[9] || (e[9] = [i("保存")])
                                            ),
                                            _: 1,
                                          }
                                        ),
                                      ]),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["syncConfig"]
                                ),
                              ]),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  s(
                    u,
                    { value: "sync_observer" },
                    {
                      default: a(() => [
                        s(
                          r,
                          { name: "fade-slide", appear: "" },
                          {
                            default: a(() => [
                              l("div", null, [
                                s(
                                  L,
                                  {
                                    syncConfig: o.value,
                                    "onUpdate:syncConfig":
                                      e[4] || (e[4] = (t) => (o.value = t)),
                                  },
                                  {
                                    footer: a(() => [
                                      l("div", H, [
                                        s(
                                          c,
                                          { onClick: d },
                                          {
                                            default: a(
                                              () =>
                                                e[10] || (e[10] = [i("保存")])
                                            ),
                                            _: 1,
                                          }
                                        ),
                                      ]),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["syncConfig"]
                                ),
                              ]),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  s(
                    u,
                    { value: "cloud_status" },
                    {
                      default: a(() => [
                        s(
                          r,
                          { name: "fade-slide", appear: "" },
                          {
                            default: a(() => [
                              l("div", null, [
                                s(
                                  M,
                                  {
                                    syncConfig: o.value,
                                    "onUpdate:syncConfig":
                                      e[5] || (e[5] = (t) => (o.value = t)),
                                  },
                                  {
                                    footer: a(() => [
                                      l("div", J, [
                                        s(
                                          c,
                                          { onClick: d },
                                          {
                                            default: a(
                                              () =>
                                                e[11] || (e[11] = [i("保存")])
                                            ),
                                            _: 1,
                                          }
                                        ),
                                      ]),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["syncConfig"]
                                ),
                              ]),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  s(
                    u,
                    { value: "tree_sync" },
                    {
                      default: a(() => [
                        s(
                          r,
                          { name: "fade-slide", appear: "" },
                          {
                            default: a(() => [
                              l("div", null, [
                                s(
                                  R,
                                  {
                                    syncConfig: o.value,
                                    "onUpdate:syncConfig":
                                      e[6] || (e[6] = (t) => (o.value = t)),
                                  },
                                  {
                                    footer: a(() => [
                                      l("div", O, [
                                        s(
                                          c,
                                          { onClick: d },
                                          {
                                            default: a(
                                              () =>
                                                e[12] || (e[12] = [i("保存")])
                                            ),
                                            _: 1,
                                          }
                                        ),
                                      ]),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["syncConfig"]
                                ),
                              ]),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                _: 1,
              },
              8,
              ["modelValue"]
            ),
          ])
        )
      );
    },
  }),
  ee = F(P, [["__scopeId", "data-v-2aa1c689"]]);
export { ee as default };
