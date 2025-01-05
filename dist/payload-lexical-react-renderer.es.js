import { jsx as c, Fragment as y } from "react/jsx-runtime";
import u from "react";
const g = 1, b = 2, x = 4, I = 8, S = 16, E = 32, T = 64, _ = 128;
function f({
  indent: t,
  format: i
}) {
  const a = {};
  return t > 0 && (a.marginLeft = `${t * 20}px`), (i === "right" || i === "center" || i === "justify") && (a.textAlign = i), a;
}
const k = {
  heading: (t) => u.createElement(
    t.tag,
    {
      style: f(t)
    },
    t.children
  ),
  list: (t) => u.createElement(
    t.tag,
    {
      style: f(t)
    },
    t.children
  ),
  listItem: (t) => /* @__PURE__ */ c("li", { style: f(t), children: t.children }),
  paragraph: (t) => /* @__PURE__ */ c("p", { style: f(t), children: t.children }),
  link: (t) => /* @__PURE__ */ c(
    "a",
    {
      href: t.fields.url,
      target: t.fields.newTab ? "_blank" : "_self",
      style: f(t),
      children: t.children
    }
  ),
  autolink: (t) => /* @__PURE__ */ c(
    "a",
    {
      href: t.fields.url,
      target: t.fields.newTab ? "_blank" : "_self",
      style: f(t),
      children: t.children
    }
  ),
  quote: (t) => /* @__PURE__ */ c("blockquote", { style: f(t), children: t.children }),
  linebreak: () => /* @__PURE__ */ c("br", {}),
  tab: () => /* @__PURE__ */ c("br", {}),
  upload: (t) => {
    var i;
    if ((i = t.value.mimeType) != null && i.includes("image"))
      return /* @__PURE__ */ c("img", { src: t.value.url, alt: t.value.alt });
  }
}, w = (t) => {
  const i = {};
  return t.bold && (i.fontWeight = "bold"), t.italic && (i.fontStyle = "italic"), t.underline && (i.textDecoration = "underline"), t.strikethrough && (i.textDecoration = "line-through"), t.code ? /* @__PURE__ */ c("code", { children: t.text }) : t.highlight ? /* @__PURE__ */ c("mark", { style: i, children: t.text }) : t.subscript ? /* @__PURE__ */ c("sub", { style: i, children: t.text }) : t.superscript ? /* @__PURE__ */ c("sup", { style: i, children: t.text }) : Object.keys(i).length === 0 ? /* @__PURE__ */ c(y, { children: t.text }) : /* @__PURE__ */ c("span", { style: i, children: t.text });
};
function v({
  content: t,
  elementRenderers: i = k,
  renderMark: a = w,
  blockRenderers: p = {}
}) {
  const s = u.useCallback(
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
      const e = i[r.type];
      if (typeof e == "function")
        return e(r);
      throw console.log("payloadLexicalReactRenderer.tsx:405 / ANON", e), new Error(`Missing element renderer for node type '${r.type}'`);
    },
    [i]
  ), n = u.useCallback(
    (r) => {
      if (!a)
        throw new Error("'renderMark' prop not provided.");
      return r.format ? a({
        text: r.text,
        bold: (r.format & g) > 0,
        italic: (r.format & b) > 0,
        underline: (r.format & I) > 0,
        strikethrough: (r.format & x) > 0,
        code: (r.format & S) > 0,
        subscript: (r.format & E) > 0,
        superscript: (r.format & T) > 0,
        highlight: (r.format & _) > 0
      }) : a({
        text: r.text
      });
    },
    [a]
  ), o = u.useCallback(
    (r) => r.map((l, e) => {
      if (l.type === "text")
        return /* @__PURE__ */ c(u.Fragment, { children: n(l) }, e);
      if (l.type === "block") {
        const h = p[l.fields.blockType];
        if (typeof h != "function")
          throw new Error(
            `Missing block renderer for block type '${l.fields.blockType}'`
          );
        return /* @__PURE__ */ c(u.Fragment, { children: h(l) }, e);
      }
      return l.type === "linebreak" || l.type === "tab" || l.type === "upload" ? /* @__PURE__ */ c(u.Fragment, { children: s(l) }, e) : /* @__PURE__ */ c(u.Fragment, { children: s(l, o(l.children)) }, e);
    }),
    [s, n, p]
  );
  return /* @__PURE__ */ c(y, { children: o(t.root.children) });
}
export {
  v as PayloadLexicalReactRenderer,
  k as defaultElementRenderers,
  w as defaultRenderMark
};
