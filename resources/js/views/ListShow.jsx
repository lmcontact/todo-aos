import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Card, Divider, List, Space, Button, Breadcrumb } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { showList } from "../store/showListSlice";

const ListShow = ({ id, name, tasks, loading, dispatch }) => {
    const params = useParams();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [editedItem, setEditedItem] = useState(null);

    useEffect(() => {
        dispatch(showList(params.id));
    }, []);

    const handleCreate = () => {};

    const handleUpdate = () => {};

    const handleDelete = () => {};

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
                bordered={tasks.length}
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
                            <Link to={`/lists/${item.id}`}>
                                <Col style={{ fontWeight: "600" }}>
                                    {item.name}
                                </Col>
                            </Link>
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
