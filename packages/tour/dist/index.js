"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
  Tour: () => Tour_default,
  TourContext: () => Context_default,
  TourProvider: () => TourProvider,
  components: () => components,
  default: () => index_default,
  useTour: () => useTour,
  withTour: () => withTour
});
module.exports = __toCommonJS(index_exports);

// Tour.tsx
var import_react7 = __toESM(require("react"));
var import_reactour_utils2 = require("reactour-utils");
var import_reactour_mask = require("reactour-mask");
var import_reactour_popover = require("reactour-popover");

// hooks.tsx
var import_react = require("react");
var import_reactour_utils = require("reactour-utils");
var initialState = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  windowWidth: 0,
  windowHeight: 0,
  x: 0,
  y: 0
};
function useSizes(step, scrollOptions = {
  block: "center",
  behavior: "smooth",
  inViewThreshold: 0
}) {
  const [transition, setTransition] = (0, import_react.useState)(false);
  const [observing, setObserving] = (0, import_react.useState)(false);
  const [isHighlightingObserved, setIsHighlightingObserved] = (0, import_react.useState)(false);
  const [refresher, setRefresher] = (0, import_react.useState)(null);
  const [dimensions, setDimensions] = (0, import_react.useState)(initialState);
  const target = (step == null ? void 0 : step.selector) instanceof Element ? step == null ? void 0 : step.selector : document.querySelector(step == null ? void 0 : step.selector);
  const handleResize = (0, import_react.useCallback)(() => {
    const _a = getHighlightedRect(
      target,
      step == null ? void 0 : step.highlightedSelectors,
      step == null ? void 0 : step.bypassElem
    ), { hasHighligtedElems } = _a, newDimensions = __objRest(_a, ["hasHighligtedElems"]);
    if (Object.entries(dimensions).some(
      ([key, value]) => newDimensions[key] !== value
    )) {
      setDimensions(newDimensions);
    }
  }, [target, step == null ? void 0 : step.highlightedSelectors, dimensions]);
  (0, import_react.useEffect)(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [target, step == null ? void 0 : step.highlightedSelectors, refresher]);
  (0, import_react.useEffect)(() => {
    const isInView = (0, import_reactour_utils.inView)(__spreadProps(__spreadValues({}, dimensions), {
      threshold: scrollOptions.inViewThreshold
    }));
    if (!isInView && target) {
      setTransition(true);
      (0, import_reactour_utils.smoothScroll)(target, scrollOptions).then(() => {
        if (!observing) setRefresher(Date.now());
      }).finally(() => {
        setTransition(false);
      });
    }
  }, [dimensions]);
  const observableRefresher = (0, import_react.useCallback)(() => {
    setObserving(true);
    const _a = getHighlightedRect(
      target,
      step == null ? void 0 : step.highlightedSelectors,
      step == null ? void 0 : step.bypassElem
    ), { hasHighligtedElems } = _a, dimesions = __objRest(_a, ["hasHighligtedElems"]);
    setIsHighlightingObserved(hasHighligtedElems);
    setDimensions(dimesions);
    setObserving(false);
  }, [target, step == null ? void 0 : step.highlightedSelectors, dimensions]);
  return {
    sizes: dimensions,
    transition,
    target,
    observableRefresher,
    isHighlightingObserved
  };
}
function getHighlightedRect(node, highlightedSelectors = [], bypassElem = true) {
  let hasHighligtedElems = false;
  const { w: windowWidth, h: windowHeight } = (0, import_reactour_utils.getWindow)();
  if (!highlightedSelectors) {
    return __spreadProps(__spreadValues({}, (0, import_reactour_utils.getRect)(node)), {
      windowWidth,
      windowHeight,
      hasHighligtedElems: false
    });
  }
  let attrs = (0, import_reactour_utils.getRect)(node);
  let altAttrs = {
    bottom: 0,
    height: 0,
    left: windowWidth,
    right: 0,
    top: windowHeight,
    width: 0
  };
  for (const selector of highlightedSelectors) {
    const element = document.querySelector(selector);
    if (!element || element.style.display === "none" || element.style.visibility === "hidden") {
      continue;
    }
    const rect = (0, import_reactour_utils.getRect)(element);
    hasHighligtedElems = true;
    if (bypassElem || !node) {
      if (rect.top < altAttrs.top) {
        altAttrs.top = rect.top;
      }
      if (rect.right > altAttrs.right) {
        altAttrs.right = rect.right;
      }
      if (rect.bottom > altAttrs.bottom) {
        altAttrs.bottom = rect.bottom;
      }
      if (rect.left < altAttrs.left) {
        altAttrs.left = rect.left;
      }
      altAttrs.width = altAttrs.right - altAttrs.left;
      altAttrs.height = altAttrs.bottom - altAttrs.top;
    } else {
      if (rect.top < attrs.top) {
        attrs.top = rect.top;
      }
      if (rect.right > attrs.right) {
        attrs.right = rect.right;
      }
      if (rect.bottom > attrs.bottom) {
        attrs.bottom = rect.bottom;
      }
      if (rect.left < attrs.left) {
        attrs.left = rect.left;
      }
      attrs.width = attrs.right - attrs.left;
      attrs.height = attrs.bottom - attrs.top;
    }
  }
  const bypassable = bypassElem || !node ? altAttrs.width > 0 && altAttrs.height > 0 : false;
  return {
    left: (bypassable ? altAttrs : attrs).left,
    top: (bypassable ? altAttrs : attrs).top,
    right: (bypassable ? altAttrs : attrs).right,
    bottom: (bypassable ? altAttrs : attrs).bottom,
    width: (bypassable ? altAttrs : attrs).width,
    height: (bypassable ? altAttrs : attrs).height,
    windowWidth,
    windowHeight,
    hasHighligtedElems,
    x: attrs.x,
    y: attrs.y
  };
}

// Keyboard.tsx
var import_react2 = require("react");
var Keyboard = ({
  disableKeyboardNavigation,
  setCurrentStep,
  currentStep,
  setIsOpen,
  stepsLength,
  disable,
  rtl,
  clickProps,
  keyboardHandler
}) => {
  function keyDownHandler(e) {
    e.stopPropagation();
    if (disableKeyboardNavigation === true || disable) {
      return;
    }
    let isEscDisabled, isRightDisabled, isLeftDisabled;
    if (disableKeyboardNavigation) {
      isEscDisabled = disableKeyboardNavigation.includes("esc");
      isRightDisabled = disableKeyboardNavigation.includes("right");
      isLeftDisabled = disableKeyboardNavigation.includes("left");
    }
    function next() {
      setCurrentStep(Math.min(currentStep + 1, stepsLength - 1));
    }
    function prev() {
      setCurrentStep(Math.max(currentStep - 1, 0));
    }
    if (keyboardHandler && typeof keyboardHandler === "function") {
      keyboardHandler(e, clickProps, {
        isEscDisabled,
        isRightDisabled,
        isLeftDisabled
      });
    } else {
      if (e.keyCode === 27 && !isEscDisabled) {
        e.preventDefault();
        setIsOpen(false);
      }
      if (e.keyCode === 39 && !isRightDisabled) {
        e.preventDefault();
        if (rtl) {
          prev();
        } else {
          next();
        }
      }
      if (e.keyCode === 37 && !isLeftDisabled) {
        e.preventDefault();
        if (rtl) {
          next();
        } else {
          prev();
        }
      }
    }
  }
  (0, import_react2.useEffect)(() => {
    window.addEventListener("keydown", keyDownHandler, false);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [disable, setCurrentStep, currentStep]);
  return null;
};
var Keyboard_default = Keyboard;

// components/PopoverContent.tsx
var import_react6 = __toESM(require("react"));

// components/Badge.tsx
var import_react3 = __toESM(require("react"));

// styles.tsx
var defaultStyles = {
  badge: () => ({
    position: "absolute",
    fontFamily: "monospace",
    background: "var(--reactour-accent,#007aff)",
    height: "1.875em",
    lineHeight: 2,
    paddingLeft: "0.8125em",
    paddingRight: "0.8125em",
    fontSize: "1em",
    borderRadius: "1.625em",
    color: "white",
    textAlign: "center",
    boxShadow: "0 0.25em 0.5em rgba(0, 0, 0, 0.3)",
    top: "-0.8125em",
    left: "-0.8125em"
  }),
  controls: () => ({
    display: "flex",
    marginTop: 24,
    alignItems: "center",
    justifyContent: "space-between"
  }),
  navigation: () => ({
    counterReset: "dot",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  }),
  button: ({ disabled }) => ({
    display: "block",
    padding: 0,
    border: 0,
    background: "none",
    cursor: disabled ? "not-allowed" : "pointer"
  }),
  arrow: ({ disabled }) => ({
    color: disabled ? "#caccce" : "#646464",
    width: 16,
    height: 12,
    flex: "0 0 16px"
    // '&:hover': {
    //   color: disabled ? '#caccce' : '#000',
    // },
  }),
  dot: ({ current, disabled, showNumber }) => ({
    counterIncrement: "dot",
    width: 8,
    height: 8,
    border: current ? "0" : "1px solid #caccce",
    borderRadius: "100%",
    padding: 0,
    display: "block",
    margin: 4,
    transition: "opacity 0.3s, transform 0.3s",
    cursor: disabled ? "not-allowed" : "pointer",
    transform: `scale(${current ? 1.25 : 1})`,
    color: current ? "var(--reactour-accent, #007aff)" : "#caccce",
    background: current ? "var(--reactour-accent, #007aff)" : "none"
    // '&:before': {
    //   content: 'counter(dot)',
    //   position: 'absolute',
    //   bottom: 'calc(100% + 0.25em)',
    //   left: '50%',
    //   opacity: 0,
    //   transform: 'translate(-50%, 1em)',
    //   transition: '0.3s',
    //   display: showNumber ? 'block' : 'none',
    // },
    // '&:hover': {
    //   backgroundColor: 'currentColor',
    //   '&:before': {
    //     opacity: 0.5,
    //     transform: 'translate(-50%, -2px)',
    //   },
    // },
  }),
  close: ({ disabled }) => ({
    position: "absolute",
    top: 22,
    right: 22,
    width: 9,
    height: 9,
    "--rt-close-btn": disabled ? "#caccce" : "#5e5e5e",
    "--rt-close-btn-disabled": disabled ? "#caccce" : "#000"
  }),
  svg: () => ({
    display: "block"
  })
};
function stylesMatcher(styles) {
  return (key, state) => {
    const base = defaultStyles[key](state);
    const custom = styles[key];
    return custom ? custom(base, state) : base;
  };
}

// components/Badge.tsx
var Badge = ({
  styles = {},
  children
}) => {
  const getStyles = stylesMatcher(styles);
  return /* @__PURE__ */ import_react3.default.createElement("span", { style: getStyles("badge", {}) }, children);
};
var Badge_default = Badge;

// components/Close.tsx
var import_react4 = __toESM(require("react"));
var Close = (_a) => {
  var _b = _a, {
    styles = {},
    onClick,
    disabled
  } = _b, props = __objRest(_b, [
    "styles",
    "onClick",
    "disabled"
  ]);
  const getStyles = stylesMatcher(styles);
  return /* @__PURE__ */ import_react4.default.createElement(
    "button",
    __spreadValues({
      className: "reactour__close-button",
      style: __spreadValues(__spreadValues({}, getStyles("button", {})), getStyles("close", { disabled })),
      onClick
    }, props),
    /* @__PURE__ */ import_react4.default.createElement(
      "svg",
      {
        viewBox: "0 0 9.1 9.1",
        "aria-hidden": true,
        role: "presentation",
        style: __spreadValues({}, getStyles("svg", {}))
      },
      /* @__PURE__ */ import_react4.default.createElement(
        "path",
        {
          fill: "currentColor",
          d: "M5.9 4.5l2.8-2.8c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L4.5 3.1 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4l2.8 2.8L.3 7.4c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3L4.5 6l2.8 2.8c.3.2.5.3.8.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.9 4.5z"
        }
      )
    )
  );
};
var Close_default = Close;

// components/Content.tsx
var Content = ({
  content,
  setCurrentStep,
  transition,
  isHighlightingObserved,
  currentStep,
  setIsOpen
}) => {
  return typeof content === "function" ? content({
    setCurrentStep,
    transition,
    isHighlightingObserved,
    currentStep,
    setIsOpen
  }) : content;
};
var Content_default = Content;

// components/Navigation.tsx
var import_react5 = __toESM(require("react"));
var Navigation = ({
  styles = {},
  steps,
  setCurrentStep,
  currentStep,
  setIsOpen,
  nextButton,
  prevButton,
  disableDots,
  hideDots,
  hideButtons,
  disableAll,
  rtl,
  Arrow = DefaultArrow
}) => {
  const stepsLength = steps.length;
  const getStyles = stylesMatcher(styles);
  const Button = ({
    onClick,
    kind = "next",
    children,
    hideArrow
  }) => {
    function clickHandler() {
      if (!disableAll) {
        if (onClick && typeof onClick === "function") {
          onClick();
        } else {
          if (kind === "next") {
            setCurrentStep(Math.min(currentStep + 1, stepsLength - 1));
          } else {
            setCurrentStep(Math.max(currentStep - 1, 0));
          }
        }
      }
    }
    return /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        style: getStyles("button", {
          kind,
          disabled: disableAll ? disableAll : kind === "next" ? stepsLength - 1 === currentStep : currentStep === 0
        }),
        onClick: clickHandler,
        "aria-label": `Go to ${kind} step`
      },
      !hideArrow ? /* @__PURE__ */ import_react5.default.createElement(
        Arrow,
        {
          styles,
          inverted: rtl ? kind === "prev" : kind === "next",
          disabled: disableAll ? disableAll : kind === "next" ? stepsLength - 1 === currentStep : currentStep === 0
        }
      ) : null,
      children
    );
  };
  return /* @__PURE__ */ import_react5.default.createElement("div", { style: getStyles("controls", {}), dir: rtl ? "rtl" : "ltr" }, !hideButtons ? prevButton && typeof prevButton === "function" ? prevButton({
    Button,
    setCurrentStep,
    currentStep,
    stepsLength,
    setIsOpen,
    steps
  }) : /* @__PURE__ */ import_react5.default.createElement(Button, { kind: "prev" }) : null, !hideDots ? /* @__PURE__ */ import_react5.default.createElement("div", { style: getStyles("navigation", {}) }, Array.from({ length: stepsLength }, (_, i) => i).map((index) => {
    var _a;
    return /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        style: getStyles("dot", {
          current: index === currentStep,
          disabled: disableDots || disableAll
        }),
        onClick: () => {
          if (!disableDots && !disableAll) setCurrentStep(index);
        },
        key: `navigation_dot_${index}`,
        "aria-label": ((_a = steps[index]) == null ? void 0 : _a.navDotAriaLabel) || `Go to step ${index + 1}`
      }
    );
  })) : null, !hideButtons ? nextButton && typeof nextButton === "function" ? nextButton({
    Button,
    setCurrentStep,
    currentStep,
    stepsLength,
    setIsOpen,
    steps
  }) : /* @__PURE__ */ import_react5.default.createElement(Button, null) : null);
};
var Navigation_default = Navigation;
var DefaultArrow = ({
  styles = {},
  inverted = false,
  disabled
}) => {
  const getStyles = stylesMatcher(styles);
  return /* @__PURE__ */ import_react5.default.createElement(
    "svg",
    {
      viewBox: "0 0 18.4 14.4",
      style: getStyles("arrow", { inverted, disabled })
    },
    /* @__PURE__ */ import_react5.default.createElement(
      "path",
      {
        d: inverted ? "M17 7.2H1M10.8 1L17 7.2l-6.2 6.2" : "M1.4 7.2h16M7.6 1L1.4 7.2l6.2 6.2",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeMiterlimit: "10"
      }
    )
  );
};

// components/index.tsx
var components = {
  Badge: Badge_default,
  Close: Close_default,
  Content: Content_default,
  Navigation: Navigation_default,
  Arrow: DefaultArrow
};
var defaultComponents = (comps) => __spreadValues(__spreadValues({}, components), comps);

// components/PopoverContent.tsx
var PopoverContent = ({
  styles,
  components: components2 = {},
  badgeContent,
  accessibilityOptions,
  disabledActions,
  onClickClose,
  steps,
  setCurrentStep,
  currentStep,
  transition,
  isHighlightingObserved,
  setIsOpen,
  nextButton,
  prevButton,
  disableDotsNavigation,
  rtl,
  showPrevNextButtons = true,
  showCloseButton = true,
  showNavigation = true,
  showBadge = true,
  showDots = true,
  meta,
  setMeta,
  setSteps
}) => {
  const step = steps[currentStep];
  const { Badge: Badge2, Close: Close2, Content: Content2, Navigation: Navigation2, Arrow } = defaultComponents(components2);
  const badge = badgeContent && typeof badgeContent === "function" ? badgeContent({
    currentStep,
    totalSteps: steps.length,
    transition
  }) : currentStep + 1;
  function closeClickHandler() {
    if (!disabledActions) {
      if (onClickClose && typeof onClickClose === "function") {
        onClickClose({
          setCurrentStep,
          setIsOpen,
          currentStep,
          steps,
          meta,
          setMeta,
          setSteps
        });
      } else {
        setIsOpen(false);
      }
    }
  }
  return /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, showBadge ? /* @__PURE__ */ import_react6.default.createElement(Badge2, { styles }, badge) : null, showCloseButton ? /* @__PURE__ */ import_react6.default.createElement(
    Close2,
    {
      styles,
      "aria-label": accessibilityOptions == null ? void 0 : accessibilityOptions.closeButtonAriaLabel,
      disabled: disabledActions,
      onClick: closeClickHandler
    }
  ) : null, /* @__PURE__ */ import_react6.default.createElement(
    Content2,
    {
      content: step == null ? void 0 : step.content,
      setCurrentStep,
      currentStep,
      transition,
      isHighlightingObserved,
      setIsOpen
    }
  ), showNavigation ? /* @__PURE__ */ import_react6.default.createElement(
    Navigation2,
    {
      setCurrentStep,
      currentStep,
      setIsOpen,
      steps,
      styles,
      "aria-hidden": !(accessibilityOptions == null ? void 0 : accessibilityOptions.showNavigationScreenReaders),
      nextButton,
      prevButton,
      disableDots: disableDotsNavigation,
      hideButtons: !showPrevNextButtons,
      hideDots: !showDots,
      disableAll: disabledActions,
      rtl,
      Arrow
    }
  ) : null);
};
var PopoverContent_default = PopoverContent;

// Tour.tsx
var Tour = (_a) => {
  var _b = _a, {
    currentStep,
    setCurrentStep,
    setIsOpen,
    steps = [],
    setSteps,
    styles: globalStyles = {},
    scrollSmooth,
    afterOpen,
    beforeClose,
    padding = 10,
    position,
    onClickMask,
    onClickHighlighted,
    keyboardHandler,
    className = "reactour__popover",
    maskClassName = "reactour__mask",
    highlightedMaskClassName,
    clipId,
    maskId,
    disableInteraction,
    disableKeyboardNavigation: disableKeyboardNavigation,
    inViewThreshold,
    disabledActions,
    setDisabledActions,
    disableWhenSelectorFalsy,
    rtl,
    accessibilityOptions = {
      closeButtonAriaLabel: "Close Tour",
      showNavigationScreenReaders: true
    },
    ContentComponent,
    Wrapper,
    meta,
    setMeta,
    onTransition = () => {
      return "center";
    }
  } = _b, popoverProps = __objRest(_b, [
    "currentStep",
    "setCurrentStep",
    "setIsOpen",
    "steps",
    "setSteps",
    "styles",
    "scrollSmooth",
    "afterOpen",
    "beforeClose",
    "padding",
    "position",
    "onClickMask",
    "onClickHighlighted",
    "keyboardHandler",
    "className",
    "maskClassName",
    "highlightedMaskClassName",
    "clipId",
    "maskId",
    "disableInteraction",
    // disableFocusLock,
    "disableKeyboardNavigation",
    "inViewThreshold",
    "disabledActions",
    "setDisabledActions",
    "disableWhenSelectorFalsy",
    "rtl",
    "accessibilityOptions",
    "ContentComponent",
    "Wrapper",
    "meta",
    "setMeta",
    "onTransition"
  ]);
  var _a2;
  const step = steps[currentStep];
  const styles = __spreadValues(__spreadValues({}, globalStyles), step == null ? void 0 : step.styles);
  const {
    sizes,
    transition,
    observableRefresher,
    isHighlightingObserved,
    target
  } = useSizes(step, {
    block: "center",
    behavior: scrollSmooth ? "smooth" : "auto",
    inViewThreshold
  });
  (0, import_react7.useEffect)(() => {
    if (afterOpen && typeof afterOpen === "function") {
      afterOpen(target);
    }
    return () => {
      if (beforeClose && typeof beforeClose === "function") {
        beforeClose(target);
      }
    };
  }, []);
  const { maskPadding, popoverPadding, wrapperPadding } = getPadding(
    (_a2 = step == null ? void 0 : step.padding) != null ? _a2 : padding
  );
  const clickProps = {
    setCurrentStep,
    setIsOpen,
    currentStep,
    setSteps,
    steps,
    setMeta,
    meta
  };
  function maskClickHandler() {
    if (!disabledActions) {
      if (onClickMask && typeof onClickMask === "function") {
        onClickMask(clickProps);
      } else {
        setIsOpen(false);
      }
    }
  }
  const doDisableInteraction = typeof (step == null ? void 0 : step.stepInteraction) === "boolean" ? !(step == null ? void 0 : step.stepInteraction) : disableInteraction ? typeof disableInteraction === "boolean" ? disableInteraction : disableInteraction(clickProps) : false;
  (0, import_react7.useEffect)(() => {
    if ((step == null ? void 0 : step.action) && typeof (step == null ? void 0 : step.action) === "function") {
      step == null ? void 0 : step.action(target);
    }
    if ((step == null ? void 0 : step.disableActions) !== void 0) {
      setDisabledActions(step == null ? void 0 : step.disableActions);
    }
    return () => {
      if ((step == null ? void 0 : step.actionAfter) && typeof (step == null ? void 0 : step.actionAfter) === "function") {
        step == null ? void 0 : step.actionAfter(target);
      }
    };
  }, [step]);
  const popoverPosition = transition ? onTransition : (step == null ? void 0 : step.position) ? step == null ? void 0 : step.position : position;
  const TourWrapper = Wrapper ? Wrapper : import_react7.default.Fragment;
  return step ? /* @__PURE__ */ import_react7.default.createElement(TourWrapper, null, /* @__PURE__ */ import_react7.default.createElement(
    import_reactour_utils2.Observables,
    {
      mutationObservables: step == null ? void 0 : step.mutationObservables,
      resizeObservables: step == null ? void 0 : step.resizeObservables,
      refresh: observableRefresher
    }
  ), /* @__PURE__ */ import_react7.default.createElement(
    Keyboard_default,
    {
      setCurrentStep,
      currentStep,
      setIsOpen,
      stepsLength: steps.length,
      disableKeyboardNavigation,
      disable: disabledActions,
      rtl,
      clickProps,
      keyboardHandler
    }
  ), (!disableWhenSelectorFalsy || target) && /* @__PURE__ */ import_react7.default.createElement(
    import_reactour_mask.Mask,
    {
      sizes: transition ? initialState2 : sizes,
      onClick: maskClickHandler,
      styles: __spreadValues({
        highlightedArea: (base) => __spreadProps(__spreadValues({}, base), {
          display: doDisableInteraction ? "block" : "none"
        })
      }, styles),
      padding: transition ? 0 : maskPadding,
      highlightedAreaClassName: highlightedMaskClassName,
      className: maskClassName,
      onClickHighlighted: (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClickHighlighted)
          onClickHighlighted(e, clickProps);
      },
      wrapperPadding,
      clipId,
      maskId
    }
  ), (!disableWhenSelectorFalsy || target) && /* @__PURE__ */ import_react7.default.createElement(
    import_reactour_popover.Popover,
    {
      sizes,
      styles,
      position: popoverPosition,
      padding: popoverPadding,
      "aria-labelledby": accessibilityOptions == null ? void 0 : accessibilityOptions.ariaLabelledBy,
      className,
      refresher: currentStep
    },
    ContentComponent ? /* @__PURE__ */ import_react7.default.createElement(
      ContentComponent,
      __spreadValues({
        styles,
        setCurrentStep,
        currentStep,
        setIsOpen,
        steps,
        accessibilityOptions,
        disabledActions,
        transition,
        isHighlightingObserved,
        rtl
      }, popoverProps)
    ) : /* @__PURE__ */ import_react7.default.createElement(
      PopoverContent_default,
      __spreadValues({
        styles,
        setCurrentStep,
        currentStep,
        setIsOpen,
        steps,
        setSteps,
        accessibilityOptions,
        disabledActions,
        transition,
        isHighlightingObserved,
        rtl,
        meta,
        setMeta
      }, popoverProps)
    )
  )) : null;
};
var Tour_default = Tour;
function getPadding(padding) {
  if (typeof padding === "object" && padding !== null) {
    return {
      maskPadding: padding.mask,
      popoverPadding: padding.popover,
      wrapperPadding: padding.wrapper
    };
  }
  return {
    maskPadding: padding,
    popoverPadding: padding,
    wrapperPadding: 0
  };
}
var initialState2 = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0
};

// Context.tsx
var import_react8 = __toESM(require("react"));
var defaultState = {
  isOpen: false,
  setIsOpen: () => false,
  currentStep: 0,
  setCurrentStep: () => 0,
  steps: [],
  setSteps: () => [],
  setMeta: () => "",
  disabledActions: false,
  setDisabledActions: () => false,
  components: {}
};
var TourContext = import_react8.default.createContext(defaultState);
var TourProvider = (_a) => {
  var _b = _a, {
    children,
    defaultOpen = false,
    startAt = 0,
    steps: defaultSteps,
    setCurrentStep: customSetCurrentStep,
    currentStep: customCurrentStep
  } = _b, props = __objRest(_b, [
    "children",
    "defaultOpen",
    "startAt",
    "steps",
    "setCurrentStep",
    "currentStep"
  ]);
  const [isOpen, setIsOpen] = (0, import_react8.useState)(defaultOpen);
  const [currentStep, setCurrentStep] = (0, import_react8.useState)(startAt);
  const [steps, setSteps] = (0, import_react8.useState)(defaultSteps);
  const [meta, setMeta] = (0, import_react8.useState)("");
  const [disabledActions, setDisabledActions] = (0, import_react8.useState)(false);
  const value = __spreadValues({
    isOpen,
    setIsOpen,
    currentStep: customCurrentStep || currentStep,
    setCurrentStep: customSetCurrentStep && typeof customSetCurrentStep === "function" ? customSetCurrentStep : setCurrentStep,
    steps,
    setSteps,
    disabledActions,
    setDisabledActions,
    meta,
    setMeta
  }, props);
  return /* @__PURE__ */ import_react8.default.createElement(TourContext.Provider, { value }, children, isOpen ? /* @__PURE__ */ import_react8.default.createElement(Tour_default, __spreadValues({}, value)) : null);
};
var Context_default = TourContext;
function useTour() {
  return (0, import_react8.useContext)(TourContext);
}

// withTour.tsx
var import_react9 = __toESM(require("react"));
function withTour(WrappedComponent) {
  const ComponentWithTour = (props) => {
    const tourProps = useTour();
    return /* @__PURE__ */ import_react9.default.createElement(WrappedComponent, __spreadValues(__spreadValues({}, props), tourProps));
  };
  return ComponentWithTour;
}

// index.tsx
var index_default = Tour_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tour,
  TourContext,
  TourProvider,
  components,
  useTour,
  withTour
});
