import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { BrowserRouter as Router } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { getUserData } from "../../services/actions/profile";
import ModalSwitch from "../ModalSwitch/ModalSwitch";
import { AppDispatch, useMyDispatch, useMySelector } from "../../utils/types";

const App = () => {
  const dispatch: AppDispatch = useMyDispatch();
  const { accessToken } = useMySelector((store) => store.profile);

  useEffect(() => {
    dispatch(getUserData(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Router>
          <AppHeader />
          <ModalSwitch />
        </Router>
      </DndProvider>
    </div>
  );
};

export default App;
