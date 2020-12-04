import React from "react";
import { Button, Modal } from "antd";

const ShowTaskModal = ({ item, visible, setVisible }) => {
    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Modal
            title={(item && item.name) || ""}
            visible={visible}
            onCancel={handleCancel}
            footer={[
                <Button key="1" type="primary" onClick={handleCancel}>
                    Fermer
                </Button>
            ]}
        >
            {(item && item.description) || ""}
        </Modal>
    );
};

export default ShowTaskModal;
