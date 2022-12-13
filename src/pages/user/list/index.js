import { Header } from "./styles";
import { Button, Loading } from "../../../components";
import { Table, Popconfirm } from "antd";
import { getUsers } from "./functions/getUser";
import { useEffect, useState } from "react";
import { removeUser } from "./functions/removeUser";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers(setLoading, setData, setError);
  }, [success]);

  useEffect(() => {
    if (error) alert.error("Não foi possível realizar essa operação");
    if (success) alert.show("Operação realizada com sucesso");

    // eslint-disable-next-line
  }, [error, success]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ações",
      align: "center",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            label="Editar"
            onClick={() => navigate("/create", { state: { id: record.id } })}
          />
          <div style={{ marginLeft: "10px" }} />
          <Popconfirm
            title="Tem certeza que deseja excluir esse usuário?"
            onConfirm={() =>
              removeUser(record.id, setLoading, setSuccess, setError)
            }
            okText="Sim"
            cancelText="Não"
          >
            <Button type="primary" label="Excluir" danger={true} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header>
        <Button
          label="Adicionar usuário"
          type="primary"
          onClick={() => navigate("/create")}
        />
      </Header>
      {loading && <Loading />}
      {!loading && <Table columns={columns} dataSource={data} />}
    </>
  );
};

export default List;
