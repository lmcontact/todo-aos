import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Form, Input, Button } from "antd";
import { isSubmitButtonDisabled } from "./helpers";
import { createTask, setCreateTaskFormFields } from "../store/createTaskSlice";

const CreateTaskModal = ({
    listId,
    visible,
    setVisible,
    fields,
    setFormFields,
    loading,
    dispatch
}) => {
    const [form] = Form.useForm();
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const handleCancel = () => {
        if (!loading) {
            setVisible(false);
            form.resetFields();
        }
    };

    const handleFormFieldsChange = (_, allFields) => {
        setSubmitDisabled(isSubmitButtonDisabled(form, ["name"]));
        setFormFields(allFields);
    };

    const handleFormFinish = ({ name, description }) => {
        dispatch(createTask(handleCancel, listId, { name, description }));
    };

    return (
        <Modal
            title="Création d'une nouvelle tâche"
            visible={visible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel} disabled={loading}>
                    Annuler
                </Button>,
                <Button
                    type="primary"
                    key="submit"
                    onClick={() => form.submit()}
                    loading={loading}
                    disabled={submitDisabled}
                >
                    Valider
                </Button>
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                fields={fields}
                onFieldsChange={handleFormFieldsChange}
                onFinish={handleFormFinish}
            >
                <Form.Item
                    name="name"
                    label="Nom"
                    rules={[
                        {
                            required: true,
                            message: "Le nom est obligatoire."
                        },
                        {
                            min: 4,
                            message:
                                "Le nom doit contenir 4 caractères minimum."
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

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            max: 500,
                            message:
                                "La description doit contenir 500 caractères maximum."
                        }
                    ]}
                >
                    <Input.TextArea size="large" showCount maxLength={500} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const mapStateToProps = ({ createTask }, { listId, visible, setVisible }) => ({
    fields: createTask.fields,
    loading: createTask.loading,
    listId,
    visible,
    setVisible
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    setFormFields: payload => dispatch(setCreateTaskFormFields(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal);
