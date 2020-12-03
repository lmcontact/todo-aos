import React, { useState } from "react";
import { Form, Modal, Button, Input } from "antd";

const NewListModal = ({ visible, setVisible }) => {
    const [form] = Form.useForm();

    const handleCancel = () => {
        setVisible(false);
        setTitle("");
    };

    return (
        <Modal
            title="Création d'une nouvelle liste"
            visible={visible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Annuler
                </Button>,
                <Button
                    type="primary"
                    key="submit"
                    onClick={() => setVisible(false)}
                >
                    Valider
                </Button>
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Nom"
                    rules={[
                        {
                            required: true,
                            message: "Le nom est obligatoire."
                        },
                        {
                            min: 2,
                            message:
                                "Le nom doit contenir 6 caractères minimum."
                        },
                        {
                            max: 64,
                            message:
                                "Le nom doit contenir 64 caractères maximum."
                        }
                    ]}
                >
                    <Input size="large" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NewListModal;
