import { Input, ErrorMessage, Button, Loading } from "../../../components";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Row, Col } from "antd";
import { SessionButtons } from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import { saveUser } from "./functions/saveUser";
import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { getUserById } from "./functions/getUserById";
import { updateUser } from "./functions/updateUser";

const Create = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const alert = useAlert();
  const location = useLocation();

  const schema = yup.object({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("Email inválido "),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(6, "Mínimo 6 caracteres"),
    phone: yup.string(),
  });

  const schemaUpdate = yup.object({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("Email inválido "),
    password: yup.string(),
    phone: yup.string(),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(!location?.state?.id ? schema : schemaUpdate),
  });

  const getUser = async () => {
    const user = await getUserById(location.state.id, setLoading, alert);

    setValue("name", user?.name);
    setValue("email", user?.email);
    setValue("phone", user?.phone);
  };

  useEffect(() => {
    if (location?.state?.id) {
      getUser();
    }
    // eslint-disable-next-line
  }, [location]);

  const save = (data) => {
    if (!location?.state?.id) {
      saveUser(data, setLoading, alert, navigate);
    } else {
      if (!data.password) delete data.password;
      updateUser(location.state.id, data, setLoading, alert);
    }
  };

  return (
    <>
      <div style={{ marginTop: "20px" }} />
      {loading && <Loading />}
      {!loading && (
        <form onSubmit={handleSubmit(save)}>
          <Row gutter={[20, 20]}>
            <Col className="gutter-row" span={12}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    label="Nome"
                    placeholder="Digite o Nome"
                  />
                )}
              />
              {errors.name && (
                <ErrorMessage>{errors?.name?.message}</ErrorMessage>
              )}
            </Col>
            <Col className="gutter-row" span={12}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    label="Email"
                    placeholder="Digite o Email"
                  />
                )}
              />
              {errors.email && (
                <ErrorMessage>{errors?.email?.message}</ErrorMessage>
              )}
            </Col>
            <Col className="gutter-row" span={12}>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    label="Senha"
                    placeholder="Digite a Senha"
                    type="password"
                  />
                )}
              />
              {errors.password && (
                <ErrorMessage>{errors?.password?.message}</ErrorMessage>
              )}
            </Col>
            <Col className="gutter-row" span={12}>
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    label="Telefone"
                    placeholder="Digite o Telefone"
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <SessionButtons>
                <Button label="Cancelar" onClick={() => navigate("/")} />
                <div style={{ marginLeft: "10px" }} />
                <Button label="Salvar" type="primary" htmlType="submit" />
              </SessionButtons>
            </Col>
          </Row>
        </form>
      )}
    </>
  );
};

export default Create;
