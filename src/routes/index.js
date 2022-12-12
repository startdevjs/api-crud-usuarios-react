import { Routes, Route, useNavigate } from "react-router-dom";
import List from "../pages/user/list";
import Create from "../pages/user/create";
import { Menu } from "../components";

const RoutesComponent = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Menu title="Usuários" subTitle="Aqui estão todos os seus usuários">
            <List />
          </Menu>
        }
      />
      <Route
        path="/create"
        element={
          <Menu
            title="Usuários"
            subTitle="Aqui você poderá criar seus usuários"
            onBack={() => navigate("/")}
          >
            <Create />
          </Menu>
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
