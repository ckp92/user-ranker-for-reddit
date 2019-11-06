import { CLICK_HAMBURGER_MENU } from './types';

export const toggleHamburgerMenu = () => {
  console.log('action creator triggered');
  return { type: CLICK_HAMBURGER_MENU };
};
