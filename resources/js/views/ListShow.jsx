import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Card, Divider, List, Space, Button, Breadcrumb, Row, Col } from "antd";
import {
    PlusCircleFilled,
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { showList } from "../store/showListSlice";
import CreateTaskModal from "../components/CreateTaskModal";
import { deleteTask } from "../store/deleteTaskSlice";
import ShowTaskModal from "../components/ShowTaskModal";
import UpdateTaskModal from "../components/UpdateTaskModal";

const ListShow = ({ id, name, tasks, loading, dispatch }) => {
    const params = useParams();
    const [showModalVisible, setShowModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (!loading) {
            dispatch(showList(params.id));
        }
    }, []);

    const handleShow = item => {
        setSelectedItem(item);
        setShowModalVisible(true);
    };

    const handleCreate = () => {
        setCreateModalVisible(true);
    };

    const handleUpdate = item => {
        setSelectedItem(item);
        setUpdateModalVisible(true);
    };

    const handleDelete = taskId => {
        dispatch(deleteTask(id, taskId));
    };

    return (
        <Card
            style={{ maxWidth: "800px", margin: "0 auto", minHeight: "100%" }}
        >
            <Divider
                orientation="left"
                style={{
                    fontWeight: "600",
                    marginBottom: "3rem"
                }}
            >
                <Breadcrumb style={{ fontSize: "1.5rem" }}>
                    <Breadcrumb.Item>
                        <Link to="/lists">Mes listes</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{name}</Breadcrumb.Item>
                </Breadcrumb>
            </Divider>

            <List
                bordered={tasks && tasks.length}
                dataSource={tasks}
                locale={{ emptyText: "Vous n'avez aucune tâche." }}
                loading={loading}
                renderItem={item => (
                    <List.Item>
                        <Row
                            style={{ width: "100%" }}
                            align="middle"
                            justify="space-between"
                        >
                            <Col style={{ fontWeight: "600" }}>
                                {item.description ? (
                                    <Button
                                        type="link"
                                        style={{
                                            fontWeight: "600",
                                            padding: "0"
                                        }}
                                        onClick={() => handleShow(item)}
                                    >
                                        {item.name}
                                    </Button>
                                ) : (
                                    item.name
                                )}
                            </Col>
                            <Space />
                            <Col>
                                <Button
                                    size="small"
                                    shape="circle"
                                    icon={<EditOutlined />}
                                    style={{ marginRight: "1rem" }}
                                    onClick={() => handleUpdate(item)}
                                />
                                <Button
                                    size="small"
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDelete(item.id)}
                                />
                            </Col>
                        </Row>
                    </List.Item>
                )}
                style={{ marginBottom: "3rem" }}
            ></List>

            <Button
                type="primary"
                size="large"
                icon={<PlusCircleFilled />}
                style={{ display: "block", margin: "auto", width: "300px" }}
                onClick={handleCreate}
            >
                Créer une tâche
            </Button>

            <ShowTaskModal
                item={selectedItem}
                visible={showModalVisible}
                setVisible={setShowModalVisible}
            />

            <CreateTaskModal
                listId={id}
                visible={createModalVisible}
                setVisible={setCreateModalVisible}
            />

            <UpdateTaskModal
                item={selectedItem}
                visible={updateModalVisible}
                setVisible={setUpdateModalVisible}
                editedItem={selectedItem}
            />
        </Card>
    );
};

const mapStateToProps = ({ showList }) => ({
    id: showList.id,
    name: showList.name,
    tasks: showList.tasks,
    loading: showList.loading
});

export default connect(mapStateToProps)(ListShow);
