import api from "../../../../services/api";

export const saveUser = async (data, setLoading, alert, navigate) => {
  setLoading(true);

  try {
    await api.post("/user", data);
    alert.show("Usuário criado com sucesso");
    navigate("/");
    setLoading(false);
  } catch (e) {
    setLoading(false);
    alert.error("Não foi possível adicionar o usuário, tente novamente");
  }
};
