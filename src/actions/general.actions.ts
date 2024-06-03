export const OPEN_CLOSE_SITE_MENU = "OPEN_CLOSE_SITE_MENU";

export const openCloseSiteMenu = (isOpen: boolean) => {
  return { type: OPEN_CLOSE_SITE_MENU, payload: isOpen };
};
