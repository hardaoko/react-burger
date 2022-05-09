import { getIngredientsRequest, getOrderRequest } from "../Api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const ADD_BUN = "ADD_BUN";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    try {
      getIngredientsRequest().then((data) => {
        if (data) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: data.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      });
    } catch (e) {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
      console.error("Ошибка при передаче ингредиентов", e);
    }
  };
}

export function getOrder(chosenIngredients) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    try {
      getOrderRequest(chosenIngredients).then((data) => {
        console.log(data);
        if (data) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            orderData: data.order.number,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      });
    } catch (e) {
      dispatch({
        type: GET_ORDER_FAILED,
      });
      console.error("Ошибка формирования заказа", e);
    }
  };
}

export function addIngredients(chosenIngredients, ingredient) {
  return function (dispatch) {
    chosenIngredients.push(ingredient);
    dispatch({
      type: ADD_INGREDIENT,
      payload: chosenIngredients,
    });
  };
}

export function addBun(chosenIngredients, bun) {
  return function (dispatch) {
    chosenIngredients.splice(0, 1, bun);
    dispatch({
      type: ADD_INGREDIENT,
      payload: chosenIngredients,
    });
  };
}