import { AnyAction } from "redux";
import { IChosenIngredient, IIngredientsState } from "../../utils/types";
import {
  DELETE_ORDER_LIST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  MODAL_CLOSE,
  MODAL_DETAILS_OPEN,
  MODAL_ORDER_INFO_OPEN,
  MODAL_ORDER_OPEN,
  UPGRADE_ORDER_LIST,
} from "../actions/ingredients";

const initialIngredients: IIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  chosenIngredients: [],
  ingredientsList: [],
  bun: null,
  orderData: 0,
  orderRequest: false,
  orderFailed: false,
  orderInfo: 0,
  modalDetailsVisible: false,
  modalOrderInfoVisible: false,
  modalOrderVisible: false,
  ingredientDetails: null,
  finalCost: 0,
};

export const ingredientsReducer = (state = initialIngredients, action: any) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderData: action.orderData,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    case UPGRADE_ORDER_LIST: {
      return {
        ...state,
        chosenIngredients: action.payload,
        ingredientsList: action.payload.filter(
          (item: IChosenIngredient) => item.element.type !== "bun"
        ),
        bun: action.payload[0],
        finalCost: action.payload.reduce((prev: number, next: IChosenIngredient) => {
          return prev + next.element.price;
        }, action.payload[0].element.price),
      };
    }
    case DELETE_ORDER_LIST: {
      return {
        ...state,
        chosenIngredients: [],
        ingredientsList: [],
        bun: null,
        finalCost: 0,
      };
    }

    case MODAL_DETAILS_OPEN: {
      return {
        ...state,
        modalDetailsVisible: true,
        ingredientDetails: action.item,
      };
    }
    case MODAL_ORDER_OPEN: {
      return {
        ...state,
        modalOrderVisible: true,
      };
    }
    case MODAL_ORDER_INFO_OPEN: {
      return {
        ...state,
        modalOrderInfoVisible: true,
        orderInfo: action.order,
      };
    }
    case MODAL_CLOSE: {
      return {
        ...state,
        modalOrderVisible: false,
        modalDetailsVisible: false,
        modalOrderInfoVisible: false,
      };
    }

    default: {
      return state;
    }
  }
};