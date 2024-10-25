import {
  d as $,
  r as p,
  a as B,
  S as U,
  v as E,
  o as b,
  h as k,
  i as n,
  w as e,
  a0 as I,
  a1 as N,
  E as j,
  f as D,
  K as C,
  F,
  j as L,
  a2 as W,
  g as a,
  B as q,
  C as i,
  t as z,
  a3 as c,
  a4 as v,
  D as u,
  m as V,
  _ as K,
} from "./index-Q-NX_net.js";
import { S as M } from "./variable-BbLTKFSv.js";
import {
  _ as R,
  a as A,
  b as G,
  c as H,
  d as J,
} from "./Setting115.vue_vue_type_script_setup_true_lang-Kn3AcSSq.js";
const O = $("buttonShow", () => {
    const m = p(!1);
    function r() {
      m.value = !1;
    }
    function g() {
      m.value = !0;
    }
    return { isShow: m, hideButton: r, showButton: g };
  }),
  P = { key: 0 },
  Q = { class: "btn-settings" },
  X = { class: "btn-settings" },
  Y = { class: "btn-settings" },
  Z = { class: "btn-settings" },
  h = { class: "btn-settings" },
  ss = B({
    __name: "sync_config",
    setup(m) {
      const r = U.useToast();
      O();
      const g = D(),
        { id: w } = g.params,
        _ = p(!0),
        l = p({ ...M }),
        y = p(g.query.tab),
        x = [
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
        ];
      async function S() {
        try {
          const o = await C.get(`/autosymlink/sync_config/${w}`);
          (l.value = o), (_.value = !1);
        } catch (o) {
          console.error("Error fetching sync config:", o);
        }
      }
      async function d() {
        try {
          const o = await C.post("/autosymlink/save_config", l.value);
          o.success ? r.success(o.message) : r.error(o.message);
        } catch (o) {
          console.error("Error fetching sync config:", o);
        }
      }
      async function f() {
        try {
          const o = await C.post("/autosymlink/delete_config", l.value);
          o.success ? r.success(o.message) : r.error(o.message),
            setTimeout(() => {
              V.push("/sync_list");
            }, 1e3);
        } catch (o) {
          console.error("Error fetching sync config:", o);
        }
      }
      function T(o) {
        V.push("/sync_config/" + l.value.id + "?tab=" + o);
      }
      return (
        E(() => {
          S();
        }),
        (o, s) =>
          _.value
            ? j("", !0)
            : (b(),
              k("div", P, [
                n(
                  I,
                  {
                    modelValue: y.value,
                    "onUpdate:modelValue":
                      s[0] || (s[0] = (t) => (y.value = t)),
                    "show-arrows": "",
                    class: "v-tabs-pill",
                  },
                  {
                    default: e(() => [
                      (b(),
                      k(
                        F,
                        null,
                        L(x, (t) =>
                          n(
                            W,
                            {
                              key: t.icon,
                              value: t.tab,
                              "selected-class":
                                "v-slide-group-item--active v-tab--selected",
                              onClick: (ns) => T(t.tab),
                            },
                            {
                              default: e(() => [
                                a("div", null, [
                                  n(
                                    q,
                                    { size: "20", start: "", icon: t.icon },
                                    null,
                                    8,
                                    ["icon"]
                                  ),
                                  i(" " + z(t.title), 1),
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
                n(
                  N,
                  {
                    modelValue: y.value,
                    "onUpdate:modelValue":
                      s[6] || (s[6] = (t) => (y.value = t)),
                    class: "mt-5 disable-tab-transition",
                    touch: !1,
                  },
                  {
                    default: e(() => [
                      n(
                        c,
                        { value: "symlink" },
                        {
                          default: e(() => [
                            n(
                              v,
                              { name: "fade-slide", appear: "" },
                              {
                                default: e(() => [
                                  a("div", null, [
                                    n(
                                      R,
                                      {
                                        syncConfig: l.value,
                                        "onUpdate:syncConfig":
                                          s[1] || (s[1] = (t) => (l.value = t)),
                                      },
                                      {
                                        footer: e(() => [
                                          a("div", Q, [
                                            n(
                                              u,
                                              { color: "red", onClick: f },
                                              {
                                                default: e(
                                                  () =>
                                                    s[7] || (s[7] = [i("删除")])
                                                ),
                                                _: 1,
                                              }
                                            ),
                                            s[9] ||
                                              (s[9] = a(
                                                "span",
                                                { class: "mx-3" },
                                                null,
                                                -1
                                              )),
                                            n(
                                              u,
                                              { onClick: d },
                                              {
                                                default: e(
                                                  () =>
                                                    s[8] || (s[8] = [i("保存")])
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
                      n(
                        c,
                        { value: "scheduled_task" },
                        {
                          default: e(() => [
                            n(
                              v,
                              { name: "fade-slide", appear: "" },
                              {
                                default: e(() => [
                                  a("div", null, [
                                    n(
                                      A,
                                      {
                                        syncConfig: l.value,
                                        "onUpdate:syncConfig":
                                          s[2] || (s[2] = (t) => (l.value = t)),
                                      },
                                      {
                                        footer: e(() => [
                                          a("div", X, [
                                            n(
                                              u,
                                              { color: "red", onClick: f },
                                              {
                                                default: e(
                                                  () =>
                                                    s[10] ||
                                                    (s[10] = [i("删除")])
                                                ),
                                                _: 1,
                                              }
                                            ),
                                            s[12] ||
                                              (s[12] = a(
                                                "span",
                                                { class: "mx-3" },
                                                null,
                                                -1
                                              )),
                                            n(
                                              u,
                                              { onClick: d },
                                              {
                                                default: e(
                                                  () =>
                                                    s[11] ||
                                                    (s[11] = [i("保存")])
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
                      n(
                        c,
                        { value: "sync_observer" },
                        {
                          default: e(() => [
                            n(
                              v,
                              { name: "fade-slide", appear: "" },
                              {
                                default: e(() => [
                                  a("div", null, [
                                    n(
                                      G,
                                      {
                                        syncConfig: l.value,
                                        "onUpdate:syncConfig":
                                          s[3] || (s[3] = (t) => (l.value = t)),
                                      },
                                      {
                                        footer: e(() => [
                                          a("div", Y, [
                                            n(
                                              u,
                                              { color: "red", onClick: f },
                                              {
                                                default: e(
                                                  () =>
                                                    s[13] ||
                                                    (s[13] = [i("删除")])
                                                ),
                                                _: 1,
                                              }
                                            ),
                                            s[15] ||
                                              (s[15] = a(
                                                "span",
                                                { class: "mx-3" },
                                                null,
                                                -1
                                              )),
                                            n(
                                              u,
                                              { onClick: d },
                                              {
                                                default: e(
                                                  () =>
                                                    s[14] ||
                                                    (s[14] = [i("保存")])
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
                      n(
                        c,
                        { value: "cloud_status" },
                        {
                          default: e(() => [
                            n(
                              v,
                              { name: "fade-slide", appear: "" },
                              {
                                default: e(() => [
                                  a("div", null, [
                                    n(
                                      H,
                                      {
                                        syncConfig: l.value,
                                        "onUpdate:syncConfig":
                                          s[4] || (s[4] = (t) => (l.value = t)),
                                      },
                                      {
                                        footer: e(() => [
                                          a("div", Z, [
                                            n(
                                              u,
                                              { color: "red", onClick: f },
                                              {
                                                default: e(
                                                  () =>
                                                    s[16] ||
                                                    (s[16] = [i("删除")])
                                                ),
                                                _: 1,
                                              }
                                            ),
                                            s[18] ||
                                              (s[18] = a(
                                                "span",
                                                { class: "mx-3" },
                                                null,
                                                -1
                                              )),
                                            n(
                                              u,
                                              { onClick: d },
                                              {
                                                default: e(
                                                  () =>
                                                    s[17] ||
                                                    (s[17] = [i("保存")])
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
                      n(
                        c,
                        { value: "115_settings" },
                        {
                          default: e(() => [
                            n(
                              v,
                              { name: "fade-slide", appear: "" },
                              {
                                default: e(() => [
                                  a("div", null, [
                                    n(
                                      J,
                                      {
                                        syncConfig: l.value,
                                        "onUpdate:syncConfig":
                                          s[5] || (s[5] = (t) => (l.value = t)),
                                      },
                                      {
                                        footer: e(() => [
                                          a("div", h, [
                                            n(
                                              u,
                                              { color: "red", onClick: f },
                                              {
                                                default: e(
                                                  () =>
                                                    s[19] ||
                                                    (s[19] = [i("删除")])
                                                ),
                                                _: 1,
                                              }
                                            ),
                                            s[21] ||
                                              (s[21] = a(
                                                "span",
                                                { class: "mx-3" },
                                                null,
                                                -1
                                              )),
                                            n(
                                              u,
                                              { onClick: d },
                                              {
                                                default: e(
                                                  () =>
                                                    s[20] ||
                                                    (s[20] = [i("保存")])
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
              ]))
      );
    },
  }),
  as = K(ss, [["__scopeId", "data-v-1fd5be84"]]);
export { as as default };
