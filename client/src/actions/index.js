import { CLICK_HAMBURGER, CLOSE_HEADER_NOTIFICATION } from './types';

export const clickHamburger = () => {
  return { type: CLICK_HAMBURGER };
};

export const closeHeaderNotification = () => {
  return { type: CLOSE_HEADER_NOTIFICATION };
};
