import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

// create your reducer
const reducer = (
  state = { order: { name: "", price: 0, count: 0 } },
  action
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case "ORDER":
      console.log("redux", action);
      return { ...state, order: action.payload.order };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore = (context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
