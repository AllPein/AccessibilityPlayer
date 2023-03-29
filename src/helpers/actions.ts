import { Notification } from '../notification/notification';
import { ActionType } from '../enums/actions';
import { Action } from '../types';
import {
  ActionTypeToStyle,
  DEFAULT_BLUR_STYLE,
  DEFAULT_BRIGHTNESS_STYLE,
  DEFAULT_SATURATION_STYLE,
} from '../constants/actions';

export const generateCurrentActions = (actions: Action[], time: number) => {
  return actions.reduce((acc: ActionType[], action: Action) => {
    if (
      time >= action.startTime &&
      (!action.endTime || time <= action.endTime)
    ) {
      acc.push(...action.actions);
    }

    return acc;
  }, []);
};

const applyBlur = (container: HTMLVideoElement) => {
  if (!container.style.filter.includes(DEFAULT_BLUR_STYLE)) {
    container.style.filter += ` ${DEFAULT_BLUR_STYLE}`;
  }
};

const removeFilter = (container: HTMLVideoElement, type: ActionType) => {
  if (container.style.filter.includes(ActionTypeToStyle[type])) {
    console.log(ActionTypeToStyle[type]);
    container.style.filter = container.style.filter
      .split(' ')
      .filter((f) => f !== ActionTypeToStyle[type])
      .join(' ');
  }
};

const applyScreamer = () => {
  new Notification('Через 5 секунд будет вспышка!');
};

const applyBrightnessFilter = (container: HTMLVideoElement) => {
  if (!container.style.filter.includes(DEFAULT_BRIGHTNESS_STYLE)) {
    container.style.filter += ` ${DEFAULT_BRIGHTNESS_STYLE}`;
  }
};

const applySaturationFilter = (container: HTMLVideoElement) => {
  if (!container.style.filter.includes(DEFAULT_SATURATION_STYLE)) {
    console.log('add');
    container.style.filter += ` ${DEFAULT_SATURATION_STYLE}`;
  }
};

export const actionsMap = {
  [ActionType.Brightness]: {
    applyFilter: applyBrightnessFilter,
    removeFilter: removeFilter,
  },
  [ActionType.Saturation]: {
    applyFilter: applySaturationFilter,
    removeFilter: removeFilter,
  },
  [ActionType.Blur]: {
    applyFilter: applyBlur,
    removeFilter: removeFilter,
  },
  [ActionType.Screamer]: {
    applyFilter: applyScreamer,
    removeFilter: () => {},
  },
};
