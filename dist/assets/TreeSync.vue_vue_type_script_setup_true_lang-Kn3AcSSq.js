import {
  a as x,
  a5 as z,
  a6 as C,
  q as D,
  r as p,
  a7 as O,
  b as K,
  o as d,
  h as _,
  i as e,
  w as t,
  Y as h,
  Z as f,
  L as b,
  c as g,
  a8 as k,
  e as Y,
  T as i,
  E as P,
  a9 as y,
  F as T,
  j as $,
  $ as U,
  g as Z,
  D as A,
  C as G,
  aa as M,
  ab as S,
  K as I,
  v as R,
} from "./index-Q-NX_net.js";
const H = { class: "btn-settings" },
  le = x({
    __name: "SymlinkSettings",
    props: z(
      { type: String, isNew: { type: Boolean, required: !1, default: !1 } },
      {
        syncConfig: {},
        syncConfigModifiers: {},
        syncTemplate: {},
        syncTemplateModifiers: {},
      }
    ),
    emits: ["update:syncConfig", "update:syncTemplate"],
    setup(c) {
      const l = C(c, "syncConfig"),
        m = C(c, "syncTemplate"),
        o = c,
        s = D(() => m.value.map((r) => r.task_name)),
        u = p(s[0]),
        v = p([
          {
            label: "源目录",
            key: "media_dir",
            hint: "视频所在的文件夹,如果是cd2挂载文件夹,请直接挂载网盘根目录,否则会出现路径错误等问题",
          },
          {
            label: "链接目录",
            key: "symlink_dir",
            hint: "程序会在此文件夹中创建软链接/strm文件,同步方向为媒体目录到本地目录,多目录同步时,本地目录不能完全相同",
          },
          {
            label: "排除目录",
            key: "exclude_dir_path",
            hint: "要排除同步的文件夹路径，多个路径以;隔开，被排除的文件夹不会被同步和监控",
          },
          {
            label: "云盘根目录",
            key: "cloud_root_path",
            hint: "网盘文件夹的上级目录,如/mnt/115,就填/mnt",
          },
          {
            label: "云盘名称",
            key: "cloud_name",
            hint: "网盘目录的名称,如cd2中的115文件夹叫115网盘,就填115网盘",
          },
        ]),
        N = p([
          { label: "更新软链接", key: "symlink_creator" },
          { label: "更新元数据", key: "metadata_copyer" },
          { label: "元数据覆盖", key: "metadata_covered" },
          { label: "无效文件夹", key: "symlink_dir_checker" },
          { label: "无效软链接", key: "symlink_checker" },
          { label: "无效元数据", key: "metadata_checker" },
        ]),
        j = p([
          {
            label: "挂载类型",
            key: "cloud_type",
            items: ["cd2", "alist", "custom"],
            hint: "custom是自定义模式,主要用于cd2和alist以外的网盘工具",
          },
          {
            label: "云端地址",
            key: "cloud_url",
            hint: "以http或https开头的链接,如cd2就是http://ip:19798",
          },
          {
            label: "云端地址后缀",
            key: "cloud_url_suffix",
            hint: "云端地址后需要加的链接,用于拼接云端文件的下载地址,注意不要忘记首尾的'/''",
          },
          {
            label: "链接文件大小",
            key: "symlink_size",
            hint: "单位为Mb,低于设定值的视频文件会直接进行复制",
          },
          {
            label: "排除目录名",
            key: "exclude_dir_name",
            hint: "要排除同步的文件夹名，指定名称的文件夹不会被同步和监控",
          },
          {
            label: "Strm模式",
            key: "strm_mode",
            items: ["cloud", "local"],
            hint: "cloud模式文件内是http开头的链接,local模式文件内是文件的路径",
          },
          {
            label: "Strm后缀",
            key: "strm_ext",
            hint: "指定后缀名的文件会生成Strm文件,常见的视频格式:.mp4;.mkv;.ts;.iso;.rmvb;.avi;.mov;.mpeg;.mpg;.wmv;.3gp;.asf;.m4v;.flv;.m2ts;.strm;.tp;.f4v",
          },
          {
            label: "软链接后缀",
            key: "symlink_ext",
            hint: "指定后缀名的文件会生成软链接,常见的视频格式:.mp4;.mkv;.ts;.iso;.rmvb;.avi;.mov;.mpeg;.mpg;.wmv;.3gp;.asf;.m4v;.flv;.m2ts;.strm;.tp;.f4v",
          },
          {
            label: "元数据后缀",
            key: "metadata_ext",
            hint: "指定后缀名的文件会直接同步到本地",
          },
        ]),
        B = p(""),
        F = p(""),
        E = p("");
      O(
        () => l.value.cloud_type,
        (r) => {
          q();
        }
      ),
        O(
          () => l.value.cloud_url,
          (r) => {
            q();
          }
        );
      function q() {
        const r = l.value.cloud_type;
        r === "cd2"
          ? (l.value.cloud_url_suffix = `/static/${l.value.cloud_url.replace(
              "://",
              "/"
            )}/false/`)
          : r == "alist"
          ? (l.value.cloud_url_suffix = "/d/")
          : (l.value.cloud_url_suffix = "");
      }
      async function J() {
        let r = { path: B.value, url: F.value };
        try {
          const n = await I.post("/autosymlink/caculate_path", r);
          E.value = n;
        } catch (n) {
          console.error("Error fetching sync list:", n);
        }
      }
      function W(r) {
        const n = m.value.find((w) => w.task_name === r);
        n
          ? (l.value = JSON.parse(JSON.stringify(n)))
          : console.log("Template config not found");
      }
      return (r, n) => {
        const w = K("VPathInput");
        return (
          d(),
          _("div", null, [
            e(M, null, {
              default: t(() => [
                e(h, null, {
                  default: t(() => [
                    e(
                      f,
                      { cols: "12", md: "6" },
                      {
                        default: t(() => [
                          e(
                            b,
                            { class: "sync-config", title: "基础配置" },
                            {
                              default: t(() => [
                                o.isNew
                                  ? (d(),
                                    g(
                                      i,
                                      { key: 0, class: "pt-3" },
                                      {
                                        default: t(() => [
                                          e(
                                            k,
                                            {
                                              label: "复制现有配置",
                                              items: Y(s),
                                              modelValue: u.value,
                                              "onUpdate:modelValue": [
                                                n[0] ||
                                                  (n[0] = (a) => (u.value = a)),
                                                W,
                                              ],
                                              class: "pt-3",
                                              hint: "复制现有的目录配置",
                                              "persistent-hint": "",
                                            },
                                            null,
                                            8,
                                            ["items", "modelValue"]
                                          ),
                                        ]),
                                        _: 1,
                                      }
                                    ))
                                  : P("", !0),
                                e(
                                  i,
                                  { class: "pt-3" },
                                  {
                                    default: t(() => [
                                      e(
                                        y,
                                        {
                                          label: "任务名称",
                                          modelValue: l.value.task_name,
                                          "onUpdate:modelValue":
                                            n[1] ||
                                            (n[1] = (a) =>
                                              (l.value.task_name = a)),
                                        },
                                        null,
                                        8,
                                        ["modelValue"]
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                                e(
                                  i,
                                  { class: "pt-3" },
                                  {
                                    default: t(() => [
                                      e(
                                        k,
                                        {
                                          label: "同步模式",
                                          items: [
                                            "常规同步",
                                            "星标同步",
                                            "目录树同步",
                                          ],
                                          modelValue: l.value.sync_mode,
                                          "onUpdate:modelValue":
                                            n[2] ||
                                            (n[2] = (a) =>
                                              (l.value.sync_mode = a)),
                                          class: "pt-3",
                                          hint: "常规同步即对文件夹进行遍历同步,目录树同步是通过115的api生成目录树后进行同步,星标同步是根据115的星标文件夹进行同步,如果平时不需要星标功能可以用星标同步",
                                          "persistent-hint": "",
                                        },
                                        null,
                                        8,
                                        ["modelValue"]
                                      ),
                                      (d(!0),
                                      _(
                                        T,
                                        null,
                                        $(
                                          v.value,
                                          (a, L) => (
                                            d(),
                                            g(
                                              i,
                                              { class: "pt-3" },
                                              {
                                                default: t(() => [
                                                  e(
                                                    w,
                                                    {
                                                      label: a.label,
                                                      modelValue:
                                                        l.value[a.key],
                                                      "onUpdate:modelValue": (
                                                        V
                                                      ) => (l.value[a.key] = V),
                                                      hint: a.hint,
                                                    },
                                                    null,
                                                    8,
                                                    [
                                                      "label",
                                                      "modelValue",
                                                      "onUpdate:modelValue",
                                                      "hint",
                                                    ]
                                                  ),
                                                ]),
                                                _: 2,
                                              },
                                              1024
                                            )
                                          )
                                        ),
                                        256
                                      )),
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
                      }
                    ),
                    e(
                      f,
                      { cols: "12", md: "6" },
                      {
                        default: t(() => [
                          e(
                            b,
                            { class: "sync-config", title: "同步配置" },
                            {
                              default: t(() => [
                                e(
                                  h,
                                  { class: "ml-2" },
                                  {
                                    default: t(() => [
                                      (d(!0),
                                      _(
                                        T,
                                        null,
                                        $(
                                          N.value,
                                          (a, L) => (
                                            d(),
                                            g(
                                              f,
                                              { cols: "12", md: "6" },
                                              {
                                                default: t(() => [
                                                  e(
                                                    U,
                                                    {
                                                      label: a.label,
                                                      modelValue:
                                                        l.value[a.key],
                                                      "onUpdate:modelValue": (
                                                        V
                                                      ) => (l.value[a.key] = V),
                                                      class: "p-0 m-0",
                                                    },
                                                    null,
                                                    8,
                                                    [
                                                      "label",
                                                      "modelValue",
                                                      "onUpdate:modelValue",
                                                    ]
                                                  ),
                                                ]),
                                                _: 2,
                                              },
                                              1024
                                            )
                                          )
                                        ),
                                        256
                                      )),
                                    ]),
                                    _: 1,
                                  }
                                ),
                                e(i, null, {
                                  default: t(() => [
                                    e(
                                      k,
                                      {
                                        label: "元数据模式",
                                        items: ["下载模式", "本地模式"],
                                        modelValue:
                                          l.value.metadata_copyer_mode,
                                        "onUpdate:modelValue":
                                          n[3] ||
                                          (n[3] = (a) =>
                                            (l.value.metadata_copyer_mode = a)),
                                        class: "pt-3",
                                        hint: "下载模式速度更快,适合网盘向本地同步;本地模式适合本地向网盘同步",
                                        "persistent-hint": "",
                                      },
                                      null,
                                      8,
                                      ["modelValue"]
                                    ),
                                  ]),
                                  _: 1,
                                }),
                                e(i, null, {
                                  default: t(() => [
                                    e(
                                      y,
                                      {
                                        label: "同步线程数",
                                        modelValue: l.value.num_threads,
                                        "onUpdate:modelValue":
                                          n[4] ||
                                          (n[4] = (a) =>
                                            (l.value.num_threads = a)),
                                        class: "pt-3",
                                      },
                                      null,
                                      8,
                                      ["modelValue"]
                                    ),
                                  ]),
                                  _: 1,
                                }),
                              ]),
                              _: 1,
                            }
                          ),
                        ]),
                        _: 1,
                      }
                    ),
                    e(
                      f,
                      { cols: "12", md: "6" },
                      {
                        default: t(() => [
                          e(
                            b,
                            { class: "sync-config", title: "软链接置" },
                            {
                              default: t(() => [
                                (d(!0),
                                _(
                                  T,
                                  null,
                                  $(
                                    j.value,
                                    (a, L) => (
                                      d(),
                                      g(
                                        i,
                                        { class: "pt-3" },
                                        {
                                          default: t(() => [
                                            a.items
                                              ? (d(),
                                                g(
                                                  k,
                                                  {
                                                    key: 0,
                                                    label: a.label,
                                                    items: a.items,
                                                    modelValue: l.value[a.key],
                                                    "onUpdate:modelValue": (
                                                      V
                                                    ) => (l.value[a.key] = V),
                                                    class: "pt-3",
                                                    hint: a.hint,
                                                    "persistent-hint": "",
                                                  },
                                                  null,
                                                  8,
                                                  [
                                                    "label",
                                                    "items",
                                                    "modelValue",
                                                    "onUpdate:modelValue",
                                                    "hint",
                                                  ]
                                                ))
                                              : (d(),
                                                g(
                                                  y,
                                                  {
                                                    key: 1,
                                                    label: a.label,
                                                    modelValue: l.value[a.key],
                                                    "onUpdate:modelValue": (
                                                      V
                                                    ) => (l.value[a.key] = V),
                                                    class: "pt-3",
                                                    hint: a.hint,
                                                    "persistent-hint": "",
                                                  },
                                                  null,
                                                  8,
                                                  [
                                                    "label",
                                                    "modelValue",
                                                    "onUpdate:modelValue",
                                                    "hint",
                                                  ]
                                                )),
                                          ]),
                                          _: 2,
                                        },
                                        1024
                                      )
                                    )
                                  ),
                                  256
                                )),
                              ]),
                              _: 1,
                            }
                          ),
                        ]),
                        _: 1,
                      }
                    ),
                    e(
                      f,
                      { cols: "12", md: "6" },
                      {
                        default: t(() => [
                          e(
                            b,
                            {
                              class: "sync-config",
                              title: "根目录计算",
                              subtitle: "用于获取cd2根目录/alist根目录",
                            },
                            {
                              default: t(() => [
                                e(i, null, {
                                  default: t(() => [
                                    e(
                                      w,
                                      {
                                        label: "文件路径",
                                        modelValue: B.value,
                                        "onUpdate:modelValue":
                                          n[5] || (n[5] = (a) => (B.value = a)),
                                        hint: "在媒体目录中选择任意一个文件",
                                        fileRequired: !0,
                                      },
                                      null,
                                      8,
                                      ["modelValue"]
                                    ),
                                  ]),
                                  _: 1,
                                }),
                                e(i, null, {
                                  default: t(() => [
                                    e(
                                      y,
                                      {
                                        label: "文件链接",
                                        modelValue: F.value,
                                        "onUpdate:modelValue":
                                          n[6] || (n[6] = (a) => (F.value = a)),
                                        class: "pt-3",
                                        hint: "该文件在cd2中的链接",
                                        "persistent-hint": "",
                                      },
                                      null,
                                      8,
                                      ["modelValue"]
                                    ),
                                  ]),
                                  _: 1,
                                }),
                                e(i, null, {
                                  default: t(() => [
                                    e(
                                      y,
                                      {
                                        label: "根目录",
                                        modelValue: E.value,
                                        "onUpdate:modelValue":
                                          n[7] || (n[7] = (a) => (E.value = a)),
                                        class: "pt-3",
                                        hint: "将根目录的值复制到对应的设置里即可",
                                        "persistent-hint": "",
                                      },
                                      null,
                                      8,
                                      ["modelValue"]
                                    ),
                                  ]),
                                  _: 1,
                                }),
                                Z("div", H, [
                                  e(
                                    A,
                                    { onClick: J },
                                    {
                                      default: t(
                                        () => n[8] || (n[8] = [G("生成")])
                                      ),
                                      _: 1,
                                    }
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
                }),
              ]),
              _: 1,
            }),
            S(r.$slots, "footer"),
          ])
        );
      };
    },
  }),
  te = x({
    __name: "ScheduledSettings",
    props: { syncConfig: {}, syncConfigModifiers: {} },
    emits: ["update:syncConfig"],
    setup(c) {
      const l = C(c, "syncConfig");
      return (m, o) => (
        d(),
        _("div", null, [
          e(M, null, {
            default: t(() => [
              e(h, null, {
                default: t(() => [
                  e(
                    f,
                    { cols: "12", md: "6" },
                    {
                      default: t(() => [
                        e(
                          b,
                          { class: "sync-config", title: "定时任务" },
                          {
                            default: t(() => [
                              e(i, null, {
                                default: t(() => [
                                  e(
                                    U,
                                    {
                                      label: "定时同步",
                                      modelValue: l.value.sync_scheduled,
                                      "onUpdate:modelValue":
                                        o[0] ||
                                        (o[0] = (s) =>
                                          (l.value.sync_scheduled = s)),
                                      class: "mb-5",
                                    },
                                    null,
                                    8,
                                    ["modelValue"]
                                  ),
                                  e(
                                    y,
                                    {
                                      label: "同步时间",
                                      modelValue: l.value.sync_time,
                                      "onUpdate:modelValue":
                                        o[1] ||
                                        (o[1] = (s) => (l.value.sync_time = s)),
                                      hint: `定时同步的时间间隔:单位为秒,支持乘法表达式,比如一天就是24*3600,每隔指定的时间进行同步,
支持5位cron表达式`,
                                      "persistent-hint": "",
                                    },
                                    null,
                                    8,
                                    ["modelValue"]
                                  ),
                                  e(
                                    U,
                                    {
                                      label: "定时备份",
                                      modelValue: l.value.backup_scheduled,
                                      "onUpdate:modelValue":
                                        o[2] ||
                                        (o[2] = (s) =>
                                          (l.value.backup_scheduled = s)),
                                      class: "mt-10",
                                    },
                                    null,
                                    8,
                                    ["modelValue"]
                                  ),
                                  e(
                                    y,
                                    {
                                      label: "备份时间",
                                      modelValue: l.value.backup_time,
                                      "onUpdate:modelValue":
                                        o[3] ||
                                        (o[3] = (s) =>
                                          (l.value.backup_time = s)),
                                      class: "my-5",
                                      hint: `定时备份的时间间隔:单位为秒,支持乘法表达式,比如一天就是24*3600,意思是每隔指定的时间进行同步
支持5位cron表达式`,
                                      "persistent-hint": "",
                                    },
                                    null,
                                    8,
                                    ["modelValue"]
                                  ),
                                  e(
                                    y,
                                    {
                                      label: "备份后缀",
                                      modelValue: l.value.backup_ext,
                                      "onUpdate:modelValue":
                                        o[4] ||
                                        (o[4] = (s) =>
                                          (l.value.backup_ext = s)),
                                      class: "my-5",
                                      hint: `定时备份指定后缀名的文件,以;隔开如果想要备份所有格式的文件,就填*.*
如只想备份元数据,则填:'.nfo;.jpg;.png;.svg;.ass;.srt;.sup'`,
                                      "persistent-hint": "",
                                    },
                                    null,
                                    8,
                                    ["modelValue"]
                                  ),
                                ]),
                                _: 1,
                              }),
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
              }),
            ]),
            _: 1,
          }),
          S(m.$slots, "footer"),
        ])
      );
    },
  }),
  ae = x({
    __name: "ObserverSettings",
    props: { syncConfig: {}, syncConfigModifiers: {} },
    emits: ["update:syncConfig"],
    setup(c) {
      const l = C(c, "syncConfig"),
        m = p([
          { label: "实时监控", key: "observer_enabled" },
          { label: "更新软链接", key: "observer_symlink_creator" },
          { label: "更新元数据", key: "observer_metadata_copyer" },
          { label: "删除软链接", key: "observer_symlink_checker" },
          { label: "删除元数据", key: "observer_metadata_checker" },
        ]);
      return (o, s) => (
        d(),
        _("div", null, [
          e(h, null, {
            default: t(() => [
              e(
                f,
                { cols: "12", md: "6" },
                {
                  default: t(() => [
                    e(
                      b,
                      {
                        class: "sync-config",
                        title: "实时监控",
                        subtitle: "网盘+事件通知建议开启挂载检测",
                      },
                      {
                        default: t(() => [
                          e(i, null, {
                            default: t(() => [
                              e(
                                k,
                                {
                                  label: "监控模式",
                                  items: ["事件通知", "Webhook"],
                                  modelValue: l.value.observer_mode,
                                  "onUpdate:modelValue":
                                    s[0] ||
                                    (s[0] = (u) => (l.value.observer_mode = u)),
                                  hint: "新手推荐用事件通知,如果想用Webhook,请去github上根据教程进行配置",
                                  "persistent-hint": "",
                                },
                                null,
                                8,
                                ["modelValue"]
                              ),
                            ]),
                            _: 1,
                          }),
                          e(i, null, {
                            default: t(() => [
                              e(
                                y,
                                {
                                  label: "延迟时间",
                                  modelValue: l.value.observer_delay,
                                  "onUpdate:modelValue":
                                    s[1] ||
                                    (s[1] = (u) =>
                                      (l.value.observer_delay = u)),
                                  hint: "监测到文件变化时,进行延迟处理",
                                  "persistent-hint": "",
                                },
                                null,
                                8,
                                ["modelValue"]
                              ),
                            ]),
                            _: 1,
                          }),
                          e(
                            h,
                            { class: "ml-2 mb-3" },
                            {
                              default: t(() => [
                                (d(!0),
                                _(
                                  T,
                                  null,
                                  $(
                                    m.value,
                                    (u, v) => (
                                      d(),
                                      g(
                                        f,
                                        { cols: "12", md: "6" },
                                        {
                                          default: t(() => [
                                            e(
                                              U,
                                              {
                                                label: u.label,
                                                modelValue: l.value[u.key],
                                                "onUpdate:modelValue": (N) =>
                                                  (l.value[u.key] = N),
                                                class: "no-wrap",
                                              },
                                              null,
                                              8,
                                              [
                                                "label",
                                                "modelValue",
                                                "onUpdate:modelValue",
                                              ]
                                            ),
                                          ]),
                                          _: 2,
                                        },
                                        1024
                                      )
                                    )
                                  ),
                                  256
                                )),
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
                }
              ),
            ]),
            _: 1,
          }),
          S(o.$slots, "footer"),
        ])
      );
    },
  }),
  Q = { key: 0 },
  se = x({
    __name: "CloudStatus",
    props: { syncConfig: {}, syncConfigModifiers: {} },
    emits: ["update:syncConfig"],
    setup(c) {
      const l = C(c, "syncConfig"),
        m = p([]);
      async function o() {
        try {
          const s = await I.get("/system/settings/cloud_status");
          m.value = s.map((u) => u.name);
        } catch (s) {
          console.error("Error fetching sync config:", s);
        }
      }
      return (
        R(() => {
          o();
        }),
        (s, u) =>
          m.value.length > 0
            ? (d(),
              _("div", Q, [
                e(M, null, {
                  default: t(() => [
                    e(h, null, {
                      default: t(() => [
                        e(
                          f,
                          { cols: "12", md: "6", title: "掉盘检测" },
                          {
                            default: t(() => [
                              e(
                                b,
                                { class: "sync-config" },
                                {
                                  default: t(() => [
                                    e(
                                      i,
                                      { class: "pt-3" },
                                      {
                                        default: t(() => [
                                          e(
                                            U,
                                            {
                                              label: "启用检测",
                                              modelValue:
                                                l.value.cloud_status_enabled,
                                              "onUpdate:modelValue":
                                                u[0] ||
                                                (u[0] = (v) =>
                                                  (l.value.cloud_status_enabled =
                                                    v)),
                                              class: "p-0 m-0",
                                            },
                                            null,
                                            8,
                                            ["modelValue"]
                                          ),
                                        ]),
                                        _: 1,
                                      }
                                    ),
                                    e(
                                      i,
                                      { class: "pt-3 mb-6" },
                                      {
                                        default: t(() => [
                                          e(
                                            k,
                                            {
                                              label: "配置组",
                                              items: m.value,
                                              modelValue:
                                                l.value.cloud_status_group,
                                              "onUpdate:modelValue":
                                                u[1] ||
                                                (u[1] = (v) =>
                                                  (l.value.cloud_status_group =
                                                    v)),
                                              hint: "",
                                              "persistent-hint": "",
                                            },
                                            null,
                                            8,
                                            ["items", "modelValue"]
                                          ),
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
                          }
                        ),
                      ]),
                      _: 1,
                    }),
                  ]),
                  _: 1,
                }),
                S(s.$slots, "footer"),
              ]))
            : P("", !0)
      );
    },
  }),
  X = { key: 0 },
  ne = x({
    __name: "Setting115",
    props: { syncConfig: {}, syncConfigModifiers: {} },
    emits: ["update:syncConfig"],
    setup(c) {
      const l = p([]);
      async function m() {
        try {
          const s = await I.get("/system/settings/115_settings");
          l.value = s.map((u) => u.name);
        } catch (s) {
          console.error("Error fetching sync config:", s);
        }
      }
      const o = C(c, "syncConfig");
      return (
        R(() => {
          m();
        }),
        (s, u) =>
          l.value.length > 0
            ? (d(),
              _("div", X, [
                e(M, null, {
                  default: t(() => [
                    e(h, null, {
                      default: t(() => [
                        e(
                          f,
                          { cols: "12", md: "6" },
                          {
                            default: t(() => [
                              e(
                                b,
                                {
                                  class: "sync-config",
                                  title: "115配置",
                                  subtitle:
                                    '同步模式选择 "星标同步/目录树同步" 后此项生效',
                                },
                                {
                                  default: t(() => [
                                    e(i, null, {
                                      default: t(() => [
                                        e(
                                          k,
                                          {
                                            label: "选择配置",
                                            items: l.value,
                                            modelValue: o.value.settings_115,
                                            "onUpdate:modelValue":
                                              u[0] ||
                                              (u[0] = (v) =>
                                                (o.value.settings_115 = v)),
                                            hint: "选择对应的115配置",
                                            "persistent-hint": "",
                                          },
                                          null,
                                          8,
                                          ["items", "modelValue"]
                                        ),
                                      ]),
                                      _: 1,
                                    }),
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
                    }),
                  ]),
                  _: 1,
                }),
                S(s.$slots, "footer"),
              ]))
            : P("", !0)
      );
    },
  });
export { le as _, te as a, ae as b, se as c, ne as d };
