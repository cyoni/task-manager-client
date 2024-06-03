import { OPEN_CLOSE_SITE_MENU } from "@/actions/general.actions";

const initialState = {
  isSiteMenuOpen: false,
};

const GeneralReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_CLOSE_SITE_MENU:
      return { ...state, isSiteMenuOpen: action.payload };

    default:
      return state;
  }
};

export default GeneralReducer;
