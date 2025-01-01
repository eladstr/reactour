// Mask.tsx
import React from "react";

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
import { safe, getWindow, getPadding } from "reactour-utils";
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
  const [pt, pr, pb, pl] = getPadding(padding);
  const [wpt, wpr, wpb, wpl] = getPadding(wrapperPadding);
  const { w, h } = getWindow();
  const width = safe((sizes == null ? void 0 : sizes.width) + pl + pr);
  const height = safe((sizes == null ? void 0 : sizes.height) + pt + pb);
  const top = safe((sizes == null ? void 0 : sizes.top) - pt - wpt);
  const left = safe((sizes == null ? void 0 : sizes.left) - pl - wpl);
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
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: getStyles("maskWrapper", {}),
      onClick,
      className
    },
    /* @__PURE__ */ React.createElement(
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
      /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("mask", { id: maskID }, /* @__PURE__ */ React.createElement(
        "rect",
        {
          x: 0,
          y: 0,
          width: windowWidth,
          height: windowHeight,
          fill: "white"
        }
      ), /* @__PURE__ */ React.createElement(
        "rect",
        {
          style: maskAreaStyles,
          rx: maskAreaStyles.rx ? 1 : void 0
        }
      )), /* @__PURE__ */ React.createElement("clipPath", { id: clipID }, /* @__PURE__ */ React.createElement(
        "polygon",
        {
          points: `0 0, 0 ${windowHeight}, ${left} ${windowHeight}, ${left} ${top}, ${left + width} ${top}, ${left + width} ${top + height}, ${left} ${top + height}, ${left} ${windowHeight}, ${windowWidth} ${windowHeight}, ${windowWidth} 0`
        }
      ))),
      /* @__PURE__ */ React.createElement(
        "rect",
        {
          style: getStyles("maskRect", {
            windowWidth,
            windowHeight,
            maskID
          })
        }
      ),
      /* @__PURE__ */ React.createElement(
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
      /* @__PURE__ */ React.createElement(
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
export {
  Mask_default as Mask,
  index_default as default
};
