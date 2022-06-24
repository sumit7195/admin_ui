import {
  fetch_all_data,
  data_loading,
  error_loading,
  delete_user,
  delete_selected,
  select_item,
} from "./actionType";

const initalState = {
  loading: false,
  list: [],
  error: "",
  update: "",
};

export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case fetch_all_data: {
      return {
        ...state,
        list: action.payload.map((el) => {
          return { ...el, checked: false };
        }),
        loading: false,
      };
    }


    case data_loading: {
      return { ...state, loading: true };
    }
    case error_loading: {
      return { ...state, error: action.payload };
    }

    case delete_user: {
      let newData = state;

      let result = newData.list.filter((e) => {
        return e.id !== action.payload;
      });

      return { ...newData, list: result };
    }

    case delete_selected: {
      let selected = action.payload;
      let listItem = state;

      let results = listItem.list.filter((el) => {
        return selected.includes(el.id) !== true;
      });

      return { ...state, list: results };
    }

    case select_item: {
      let id = action.payload;
      let item = state.list;

      item.map((el, i) => {
        if (el.id === id) {
          return (el.checked = !el.checked);
        } else {
          return el;
        }
      });

      return { ...state, list: item };
    }

    default:
      return state;
  }
};
