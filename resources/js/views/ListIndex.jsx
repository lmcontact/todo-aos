import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Card, List, Divider, Row, Col, Space } from "antd";
import {
    PlusCircleFilled,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined
} from "@ant-design/icons";
import CreateListModal from "../components/CreateListModal";
import { indexList } from "../store/indexListSlice";
import { useHistory } from "react-router-dom";

const Lists = ({ lists, loading, dispatch }) => {
    const history = useHistory();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        dispatch(indexList());
    }, []);

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
                bordered
                dataSource={lists}
                locale={{ emptyText: "Vous n'avez aucune liste." }}
                loading={loading}
                renderItem={item => (
                    <List.Item onClick={() => history.push("/account")}>
                        <Row
                            style={{ width: "100%" }}
                            align="middle"
                            justify="space-between"
                        >
                            <Col style={{ fontWeight: "600" }}>{item.name}</Col>
                            <Space />
                            <Col>
                                <Button
                                    type="primary"
                                    ghost
                                    shape="circle"
                                    icon={<EyeOutlined />}
                                    style={{ marginRight: "1rem" }}
                                />
                                <Button
                                    type="primary"
                                    ghost
                                    shape="circle"
                                    icon={<EditOutlined />}
                                    style={{ marginRight: "1rem" }}
                                />
                                <Button
                                    type="primary"
                                    ghost
                                    shape="circle"
                                    icon={<DeleteOutlined />}
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
                onClick={() => setModalVisible(true)}
            >
                Créer une liste
            </Button>

            <CreateListModal
                visible={modalVisible}
                setVisible={setModalVisible}
            />
        </Card>
    );
};

const mapStateToProps = ({ indexList }) => ({
    lists: indexList.lists,
    loading: indexList.loading
});

export default connect(mapStateToProps)(Lists);
