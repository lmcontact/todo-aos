import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Card, List, Divider, Row, Col, Space } from "antd";
import { Link } from "react-router-dom";
import {
    PlusCircleFilled,
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import CreateListModal from "../components/CreateListModal";
import UpdateListModal from "../components/UpdateListModal";
import { indexList } from "../store/indexListSlice";
import { deleteList } from "../store/deleteListSlice";

const Lists = ({ lists, loading, dispatch }) => {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [editedItem, setEditedItem] = useState(null);

    useEffect(() => {
        if (!loading) {
            dispatch(indexList());
        }
    }, []);

    const handleCreate = () => {
        setCreateModalVisible(true);
    };

    const handleUpdate = item => {
        setEditedItem(item);
        setUpdateModalVisible(true);
    };

    const handleDelete = listId => {
        dispatch(deleteList(listId));
    };

    return (
        <Card
            style={{ maxWidth: "800px", margin: "0 auto", minHeight: "100%" }}
        >
            <Divider
                orientation="left"
                style={{
                    fontSize: "2rem",
                    fontWeight: "600",
                    marginBottom: "3rem"
                }}
            >
                Mes listes
            </Divider>

            <List
                bordered={lists && lists.length}
                dataSource={lists}
                locale={{ emptyText: "Vous n'avez aucune liste." }}
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
                Créer une liste
            </Button>

            <CreateListModal
                visible={createModalVisible}
                setVisible={setCreateModalVisible}
            />

            <UpdateListModal
                visible={updateModalVisible}
                setVisible={setUpdateModalVisible}
                editedItem={editedItem}
            />
        </Card>
    );
};

const mapStateToProps = ({ indexList }) => ({
    lists: indexList.lists,
    loading: indexList.loading
});

export default connect(mapStateToProps)(Lists);
