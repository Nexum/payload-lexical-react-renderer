import { jsx as u, Fragment as y } from "react/jsx-runtime";
import c from "react";
const g = 1, b = 2, I = 4, x = 8, S = 16, E = 32, T = 64, _ = 128;
function e({
  indent: t,
  format: i
}) {
  const a = {};
  return t > 0 && (a.marginLeft = `${t * 20}px`), (i === "right" || i === "center" || i === "justify") && (a.textAlign = i), a;
}
const k = {
  heading: (t) => c.createElement(
    t.tag,
    {
      style: e(t)
    },
    t.children
  ),
  list: (t) => c.createElement(
    t.tag,
    {
      style: e(t)
    },
    t.children
  ),
  listItem: (t) => /* @__PURE__ */ u("li", { style: e(t), children: t.children }),
  paragraph: (t) => /* @__PURE__ */ u("p", { style: e(t), children: t.children }),
  link: (t) => /* @__PURE__ */ u(
    "a",
    {
      href: t.fields.url,
      target: t.fields.newTab ? "_blank" : "_self",
      style: e(t),
      children: t.children
    }
  ),
  autolink: (t) => /* @__PURE__ */ u(
    "a",
    {
      href: t.fields.url,
      target: t.fields.newTab ? "_blank" : "_self",
      style: e(t),
      children: t.children
    }
  ),
  quote: (t) => /* @__PURE__ */ u("blockquote", { style: e(t), children: t.children }),
  linebreak: () => /* @__PURE__ */ u("br", {}),
  tab: () => /* @__PURE__ */ u("br", {}),
  upload: (t) => {
    var i;
    if ((i = t.value.mimeType) != null && i.includes("image"))
      return /* @__PURE__ */ u("img", { src: t.value.url, alt: t.value.alt });
  }
}, w = (t) => {
  const i = {};
  return t.bold && (i.fontWeight = "bold"), t.italic && (i.fontStyle = "italic"), t.underline && (i.textDecoration = "underline"), t.strikethrough && (i.textDecoration = "line-through"), t.code ? /* @__PURE__ */ u("code", { children: t.text }) : t.highlight ? /* @__PURE__ */ u("mark", { style: i, children: t.text }) : t.subscript ? /* @__PURE__ */ u("sub", { style: i, children: t.text }) : t.superscript ? /* @__PURE__ */ u("sup", { style: i, children: t.text }) : Object.keys(i).length === 0 ? /* @__PURE__ */ u(y, { children: t.text }) : /* @__PURE__ */ u("span", { style: i, children: t.text });
};
function v({
  content: t,
  elementRenderers: i = k,
  renderMark: a = w,
  blockRenderers: p = {}
}) {
  const s = c.useCallback(
    (r, l) => {
      if (!i)
        throw new Error("'elementRenderers' prop not provided.");
      if (r.type === "link" && r.fields)
        return i.link({
          ...r,
          children: l
        });
      if (r.type === "autolink" && r.fields)
        return i.autolink({
          ...r,
          children: l
        });
      if (r.type === "heading")
        return i.heading({
          ...r,
          children: l
        });
      if (r.type === "paragraph")
        return i.paragraph({
          ...r,
          children: l
        });
      if (r.type === "list")
        return i.list({
          ...r,
          children: l
        });
      if (r.type === "listitem")
        return i.listItem({
          ...r,
          children: l
        });
      if (r.type === "quote")
        return i.quote({
          ...r,
          children: l
        });
      if (r.type === "linebreak")
        return i.linebreak();
      if (r.type === "tab")
        return i.tab();
      if (r.type === "upload")
        return i.upload(r);
      const f = i[r.type];
      if (typeof f == "function")
        return f(r);
      throw new Error(`Missing element renderer for node type '${r.type}'`);
    },
    [i]
  ), n = c.useCallback(
    (r) => {
      if (!a)
        throw new Error("'renderMark' prop not provided.");
      return r.format ? a({
        text: r.text,
        bold: (r.format & g) > 0,
        italic: (r.format & b) > 0,
        underline: (r.format & x) > 0,
        strikethrough: (r.format & I) > 0,
        code: (r.format & S) > 0,
        subscript: (r.format & E) > 0,
        superscript: (r.format & T) > 0,
        highlight: (r.format & _) > 0
      }) : a({
        text: r.text
      });
    },
    [a]
  ), h = c.useCallback(
    (r) => r.map((l, f) => {
      if (l.type === "text")
        return /* @__PURE__ */ u(c.Fragment, { children: n(l) }, f);
      if (l.type === "block") {
        const o = p[l.fields.blockType];
        if (typeof o != "function")
          throw new Error(
            `Missing block renderer for block type '${l.fields.blockType}'`
          );
        return /* @__PURE__ */ u(c.Fragment, { children: o(l) }, f);
      }
      return l.type === "linebreak" || l.type === "tab" || l.type === "upload" ? /* @__PURE__ */ u(c.Fragment, { children: s(l) }, f) : /* @__PURE__ */ u(c.Fragment, { children: s(l, h(l.children)) }, f);
    }),
    [s, n, p]
  );
  return /* @__PURE__ */ u(y, { children: h(t.root.children) });
}
export {
  v as PayloadLexicalReactRenderer,
  k as defaultElementRenderers,
  w as defaultRenderMark
};
