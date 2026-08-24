declare module "spin-wheel" {
  export interface SpinWheelItem {
    label: string;
    labelColor?: string;
    backgroundColor?: string;
    value?: unknown;
    weight?: number;
    image?: HTMLImageElement;
  }

  export type ItemLabelAlign = "left" | "center" | "right";

  export interface SpinEvent {
    type: "spin";
    method: "interact" | "spin" | "spinto" | "spintoitem";
    duration?: number;
    rotationResistance?: number;
    rotationSpeed?: number;
    targetItemIndex?: number;
    targetRotation?: number;
  }

  export interface RestEvent {
    type: "rest";
    currentIndex: number;
    rotation: number;
  }

  export interface CurrentIndexChangeEvent {
    type: "currentIndexChange";
    currentIndex: number;
  }

  export interface SpinWheelProps {
    radius?: number;
    borderWidth?: number;
    borderColor?: string;
    lineWidth?: number;
    lineColor?: string;
    itemBackgroundColors?: string[];
    itemLabelColors?: string[];
    itemLabelFontSizeMax?: number;
    itemLabelRadius?: number;
    itemLabelRadiusMax?: number;
    itemLabelFont?: string;
    itemLabelAlign?: ItemLabelAlign;
    itemLabelRotation?: number;
    itemLabelBaselineOffset?: number;
    itemLabelStrokeColor?: string;
    itemLabelStrokeWidth?: number;
    pointerAngle?: number;
    rotation?: number;
    overlayImage?: HTMLImageElement;
    isInteractive?: boolean;
    items: SpinWheelItem[];
    onSpin?: (event: SpinEvent) => void;
    onRest?: (event: RestEvent) => void;
    onCurrentIndexChange?: (event: CurrentIndexChangeEvent) => void;
  }

  export interface SpinWheelInstance {
    spinToItem: (
      itemIndex: number,
      duration?: number,
      spinToCenter?: boolean,
      numberOfRevolutions?: number,
      direction?: 1 | -1,
      easingFunction?: ((t: number) => number) | null
    ) => void;
    spin: (rotationSpeed?: number) => void;
    spinTo: (
      rotation?: number,
      duration?: number,
      easingFunction?: ((t: number) => number) | null
    ) => void;
    stop: () => void;
    raiseEvent_onRest: () => void;
    getCurrentIndex: () => number;
    remove: () => void;
  }

  export class Wheel {
    constructor(container: Element, props?: SpinWheelProps);
    init(props?: SpinWheelProps): void;
    resize(): void;
    remove(): void;
    spin(rotationSpeed?: number): void;
    spinTo(rotation?: number, duration?: number, easingFunction?: ((t: number) => number) | null): void;
    spinToItem(
      itemIndex?: number,
      duration?: number,
      spinToCenter?: boolean,
      numberOfRevolutions?: number,
      direction?: 1 | -1,
      easingFunction?: ((t: number) => number) | null
    ): void;
    stop(): void;
    getCurrentIndex(): number;
  }
}
