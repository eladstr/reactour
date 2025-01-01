var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// Popover.tsx
import React, { useRef } from "react";
import {
  useRect,
  bestPositionOf,
  isOutsideX,
  isOutsideY,
  getWindow,
  getPadding
} from "reactour-utils";

// styles.tsx
var defaultStyles = {
  popover: () => ({
    position: "fixed",
    maxWidth: 353,
    backgroundColor: "#fff",
    padding: "24px 30px",
    boxShadow: "0 0.5em 3em rgba(0, 0, 0, 0.3)",
    color: "inherit",
    zIndex: 1e5,
    transition: "transform 0.3s",
    top: 0,
    left: 0
  })
};
function stylesMatcher(styles) {
  return (key, state) => {
    const base = defaultStyles[key](state);
    const custom = styles[key];
    return custom ? custom(base, state) : base;
  };
}

// Popover.tsx
var Popover = (_a) => {
  var _b = _a, {
    children,
    position: providedPosition = "bottom",
    padding = 10,
    styles = {},
    sizes,
    refresher
  } = _b, props = __objRest(_b, [
    "children",
    "position",
    "padding",
    "styles",
    "sizes",
    "refresher"
  ]);
  const helperRef = useRef(null);
  const positionRef = useRef("");
  const verticalAlignRef = useRef("");
  const horizontalAlignRef = useRef("");
  const { w: windowWidth, h: windowHeight } = getWindow();
  const getStyles = stylesMatcher(styles);
  const helperRect = useRect(helperRef, refresher);
  const { width: helperWidth, height: helperHeight } = helperRect;
  const [pt, pr, pb, pl] = getPadding(padding);
  const targetLeft = (sizes == null ? void 0 : sizes.left) - pl;
  const targetTop = (sizes == null ? void 0 : sizes.top) - pt;
  const targetRight = (sizes == null ? void 0 : sizes.right) + pr;
  const targetBottom = (sizes == null ? void 0 : sizes.bottom) + pb;
  const position = providedPosition && typeof providedPosition === "function" ? providedPosition(
    {
      width: helperWidth,
      height: helperHeight,
      windowWidth,
      windowHeight,
      top: targetTop,
      left: targetLeft,
      right: targetRight,
      bottom: targetBottom,
      x: sizes.x,
      y: sizes.y
    },
    helperRect
  ) : providedPosition;
  const available = {
    left: targetLeft,
    right: windowWidth - targetRight,
    top: targetTop,
    bottom: windowHeight - targetBottom
  };
  const couldPositionAt = (position2, isOutsideX2, isOutsideY2) => {
    switch (position2) {
      case "top":
        return available.top > helperHeight + pb;
      case "right":
        return isOutsideX2 ? false : available.right > helperWidth + pl;
      case "bottom":
        return isOutsideY2 ? false : available.bottom > helperHeight + pt;
      case "left":
        return available.left > helperWidth + pr;
      default:
        return false;
    }
  };
  const autoPosition = (coords, outX, outY) => {
    const positionsOrder = bestPositionOf(
      available,
      outY ? ["right", "left"] : outX ? ["top", "bottom"] : []
    );
    for (let j = 0; j < positionsOrder.length; j++) {
      if (couldPositionAt(positionsOrder[j], outX, outY)) {
        positionRef.current = positionsOrder[j];
        return coords[positionsOrder[j]];
      }
    }
    positionRef.current = "center";
    return coords.center;
  };
  const pos = (helperPosition) => {
    if (Array.isArray(helperPosition)) {
      const isOutX = isOutsideX(helperPosition[0], windowWidth);
      const isOutY = isOutsideY(helperPosition[1], windowHeight);
      positionRef.current = "custom";
      return [
        isOutX ? windowWidth / 2 - helperWidth / 2 : helperPosition[0],
        isOutY ? windowHeight / 2 - helperHeight / 2 : helperPosition[1]
      ];
    }
    const isHelperOutsideX = isOutsideX(targetLeft + helperWidth, windowWidth);
    const isHelperOutsideY = isOutsideY(
      targetBottom + helperHeight,
      windowHeight
    );
    const x = isHelperOutsideX ? Math.min(targetLeft, windowWidth - helperWidth) : Math.max(targetLeft, 0);
    const y = isHelperOutsideY ? helperHeight > available.bottom ? Math.max(targetBottom - helperHeight, 0) : Math.max(targetTop, 0) : targetTop;
    if (isHelperOutsideY) {
      if (helperHeight > available.bottom) {
        verticalAlignRef.current = "bottom";
      } else {
        verticalAlignRef.current = "top";
      }
    } else {
      verticalAlignRef.current = "top";
    }
    if (isHelperOutsideX) {
      horizontalAlignRef.current = "left";
    } else {
      horizontalAlignRef.current = "right";
    }
    const coords = {
      top: [x - pl, targetTop - helperHeight - pb],
      right: [targetRight + pl, y - pt],
      bottom: [x - pl, targetBottom + pt],
      left: [targetLeft - helperWidth - pr, y - pt],
      center: [
        windowWidth / 2 - helperWidth / 2,
        windowHeight / 2 - helperHeight / 2
      ]
    };
    if (helperPosition === "center" || couldPositionAt(helperPosition, isHelperOutsideX, isHelperOutsideY) && !isHelperOutsideX && !isHelperOutsideY) {
      positionRef.current = helperPosition;
      return coords[helperPosition];
    }
    return autoPosition(coords, isHelperOutsideX, isHelperOutsideY);
  };
  const p = pos(position);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: "reactour__popover",
      style: __spreadValues({
        transform: `translate(${Math.round(p[0])}px, ${Math.round(p[1])}px)`
      }, getStyles("popover", {
        position: positionRef.current,
        verticalAlign: verticalAlignRef.current,
        horizontalAlign: horizontalAlignRef.current,
        helperRect,
        targetRect: sizes
      })),
      ref: helperRef
    }, props),
    children
  );
};
var Popover_default = Popover;

// index.tsx
var index_default = Popover_default;
export {
  Popover_default as Popover,
  index_default as default
};
