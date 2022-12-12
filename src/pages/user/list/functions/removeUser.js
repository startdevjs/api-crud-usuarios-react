import api from "../../../../services/api";

export const removeUser = async (id, setLoading, setSuccess, setError) => {
  setLoading(true);

  try {
    await api.delete(`/user/${id}`);
    setSuccess(true);
    setLoading(false);
  } catch (e) {
    setLoading(false);
    setError(true);
  }
};
