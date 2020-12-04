import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Modal, Button, Input } from "antd";
import { setUpdateTaskFormFields, updateTask } from "../store/updateTaskSlice";

const UpdateTaskModal = ({
    editedItem,
    fields,
    loading,
    visible,
    setVisible,
    dispatch,
    setFormFields
}) => {
    const [form] = Form.useForm();
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        if (editedItem) {
            dispatch(
                setFormFields([
                    { name: "name", value: editedItem.name },
                    { name: "description", value: editedItem.description }
                ])
            );
        }
    }, [editedItem]);

    const isSubmitButtonDisabled = (form, fields) => {
        return (
            !(
                form.isFieldTouched("name") ||
                form.isFieldTouched("description")
            ) ||
            form.getFieldsError().filter(({ errors }) => errors.length).length
        );
    };

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
        dispatch(
            updateTask(handleCancel, { id: editedItem.id, name, description })
        );
    };

    return (
        <Modal
            title="Mise à jour d'une tâche"
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

const mapStateToProps = (
    { updateTask },
    { visible, setVisible, editedItem }
) => ({
    fields: updateTask.fields,
    loading: updateTask.loading,
    visible,
    setVisible,
    editedItem
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    setFormFields: payload => dispatch(setUpdateTaskFormFields(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskModal);
