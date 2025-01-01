"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.tsx
var index_exports = {};
__export(index_exports, {
  Mask: () => Mask_default,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// Mask.tsx
var import_react = __toESM(require("react"));

// styles.tsx
var defaultStyles = {
  maskWrapper: () => ({
    opacity: 0.7,
    left: 0,
    top: 0,
    position: "fixed",
    zIndex: 99999,
    pointerEvents: "none",
    color: "#000"
  }),
  svgWrapper: ({ windowWidth, windowHeight, wpt, wpl }) => ({
    width: windowWidth,
    height: windowHeight,
    left: Number(wpl),
    top: Number(wpt),
    position: "fixed"
  }),
  maskArea: ({ x, y, width, height }) => ({
    x,
    y,
    width,
    height,
    fill: "black",
    rx: 0
  }),
  maskRect: ({ windowWidth, windowHeight, maskID }) => ({
    x: 0,
    y: 0,
    width: windowWidth,
    height: windowHeight,
    fill: "currentColor",
    mask: `url(#${maskID})`
  }),
  clickArea: ({ windowWidth, windowHeight, clipID }) => ({
    x: 0,
    y: 0,
    width: windowWidth,
    height: windowHeight,
    fill: "currentcolor",
    pointerEvents: "auto",
    clipPath: `url(#${clipID})`
  }),
  highlightedArea: ({ x, y, width, height }) => ({
    x,
    y,
    width,
    height,
    pointerEvents: "auto",
    fill: "transparent",
    display: "none"
  })
};
function stylesMatcher(styles) {
  return (key, state) => {
    const base = defaultStyles[key](state);
    const custom = styles[key];
    return custom ? custom(base, state) : base;
  };
}

// Mask.tsx
var import_reactour_utils = require("reactour-utils");
var Mask = ({
  padding = 10,
  wrapperPadding = 0,
  onClick,
  onClickHighlighted,
  styles = {},
  sizes,
  className,
  highlightedAreaClassName,
  maskId,
  clipId
}) => {
  const maskID = maskId || uniqueId("mask__");
  const clipID = clipId || uniqueId("clip__");
  const getStyles = stylesMatcher(styles);
  const [pt, pr, pb, pl] = (0, import_reactour_utils.getPadding)(padding);
  const [wpt, wpr, wpb, wpl] = (0, import_reactour_utils.getPadding)(wrapperPadding);
  const { w, h } = (0, import_reactour_utils.getWindow)();
  const width = (0, import_reactour_utils.safe)((sizes == null ? void 0 : sizes.width) + pl + pr);
  const height = (0, import_reactour_utils.safe)((sizes == null ? void 0 : sizes.height) + pt + pb);
  const top = (0, import_reactour_utils.safe)((sizes == null ? void 0 : sizes.top) - pt - wpt);
  const left = (0, import_reactour_utils.safe)((sizes == null ? void 0 : sizes.left) - pl - wpl);
  const windowWidth = w - wpl - wpr;
  const windowHeight = h - wpt - wpb;
  const maskAreaStyles = getStyles("maskArea", {
    x: left,
    y: top,
    width,
    height
  });
  const highlightedAreaStyles = getStyles("highlightedArea", {
    x: left,
    y: top,
    width,
    height
  });
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      style: getStyles("maskWrapper", {}),
      onClick,
      className
    },
    /* @__PURE__ */ import_react.default.createElement(
      "svg",
      {
        width: windowWidth,
        height: windowHeight,
        xmlns: "http://www.w3.org/2000/svg",
        style: getStyles("svgWrapper", {
          windowWidth,
          windowHeight,
          wpt,
          wpl
        })
      },
      /* @__PURE__ */ import_react.default.createElement("defs", null, /* @__PURE__ */ import_react.default.createElement("mask", { id: maskID }, /* @__PURE__ */ import_react.default.createElement(
        "rect",
        {
          x: 0,
          y: 0,
          width: windowWidth,
          height: windowHeight,
          fill: "white"
        }
      ), /* @__PURE__ */ import_react.default.createElement(
        "rect",
        {
          style: maskAreaStyles,
          rx: maskAreaStyles.rx ? 1 : void 0
        }
      )), /* @__PURE__ */ import_react.default.createElement("clipPath", { id: clipID }, /* @__PURE__ */ import_react.default.createElement(
        "polygon",
        {
          points: `0 0, 0 ${windowHeight}, ${left} ${windowHeight}, ${left} ${top}, ${left + width} ${top}, ${left + width} ${top + height}, ${left} ${top + height}, ${left} ${windowHeight}, ${windowWidth} ${windowHeight}, ${windowWidth} 0`
        }
      ))),
      /* @__PURE__ */ import_react.default.createElement(
        "rect",
        {
          style: getStyles("maskRect", {
            windowWidth,
            windowHeight,
            maskID
          })
        }
      ),
      /* @__PURE__ */ import_react.default.createElement(
        "rect",
        {
          style: getStyles("clickArea", {
            windowWidth,
            windowHeight,
            top,
            left,
            width,
            height,
            clipID
          })
        }
      ),
      /* @__PURE__ */ import_react.default.createElement(
        "rect",
        {
          style: highlightedAreaStyles,
          className: highlightedAreaClassName,
          onClick: onClickHighlighted,
          rx: highlightedAreaStyles.rx ? 1 : void 0
        }
      )
    )
  );
};
var Mask_default = Mask;
function uniqueId(prefix) {
  return prefix + Math.random().toString(36).substring(2, 16);
}

// index.tsx
var index_default = Mask_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Mask
});