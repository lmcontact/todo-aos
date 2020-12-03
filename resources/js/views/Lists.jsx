import React, { useState } from "react";
import { Button, Card, List, Divider } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import NewListModal from "../components/NewListModal";

const Lists = () => {
    const [modalVisible, setModalVisible] = useState(false);

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

            <List locale={{ emptyText: "Vous n'avez aucune liste." }}></List>

            <Button
                type="primary"
                size="large"
                icon={<PlusCircleFilled />}
                style={{ display: "block", margin: "auto", width: "300px" }}
                onClick={() => setModalVisible(true)}
            >
                Créer une liste
            </Button>

            <NewListModal visible={modalVisible} setVisible={setModalVisible} />
        </Card>
    );
};

export default Lists;
