import React$1, { MouseEventHandler } from 'react';
import { RectResult } from 'reactour-utils';

type StyleFn = (props: {
    [key: string]: any;
}, state?: {
    [key: string]: any;
}) => React.CSSProperties & {
    rx?: number;
};
type Styles = {
    maskWrapper: StyleFn;
    svgWrapper: StyleFn;
    maskArea: StyleFn;
    maskRect: StyleFn;
    clickArea: StyleFn;
    highlightedArea: StyleFn;
};
type StylesObj = {
    [key in StyleKey]?: StyleFn;
};
type StyleKey = keyof Styles;

declare const Mask: React$1.FC<MaskProps>;
type MaskProps = {
    children?: React$1.ReactNode;
    sizes: RectResult;
    styles?: StylesObj;
    className?: string;
    highlightedAreaClassName?: string;
    padding?: number | number[];
    wrapperPadding?: number | number[];
    onClick?: MouseEventHandler<HTMLDivElement>;
    onClickHighlighted?: MouseEventHandler<SVGRectElement>;
    maskId?: string;
    clipId?: string;
};

export { Mask, type StylesObj as MaskStylesObj, Mask as default };
