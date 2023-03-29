import { ActionType } from '../enums/actions';

export const DEFAULT_BLUR_STYLE = 'blur(5px)';
export const DEFAULT_BRIGHTNESS_STYLE = 'brightness(0.3)';
export const DEFAULT_SATURATION_STYLE = 'saturate(30%)';

export const ActionTypeToStyle = {
  [ActionType.Blur]: DEFAULT_BLUR_STYLE,
  [ActionType.Brightness]: DEFAULT_BRIGHTNESS_STYLE,
  [ActionType.Saturation]: DEFAULT_SATURATION_STYLE,
  [ActionType.Screamer]: '',
};
