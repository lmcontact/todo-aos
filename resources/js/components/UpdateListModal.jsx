import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Modal, Button, Input } from "antd";
import { updateList, setUpdateListFormFields } from "../store/updateListSlice";

const UpdateListModal = ({
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
            dispatch(setFormFields([{ name: "name", value: editedItem.name }]));
        }
    }, [editedItem]);

    const isSubmitButtonDisabled = () =>
        !form.isFieldsTouched(true) ||
        form.getFieldsError().filter(({ errors }) => errors.length).length;

    const handleCancel = () => {
        if (!loading) {
            setVisible(false);
            form.resetFields();
        }
    };

    const handleFormFieldsChange = (_, allFields) => {
        setSubmitDisabled(isSubmitButtonDisabled());
        setFormFields(allFields);
    };

    const handleFormFinish = ({ name }) => {
        dispatch(updateList(handleCancel, { id: editedItem.id, name }));
    };

    return (
        <Modal
            title="Mise à jour d'une liste"
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

const mapStateToProps = (
    { updateList },
    { visible, setVisible, editedItem }
) => ({
    fields: updateList.fields,
    loading: updateList.loading,
    visible,
    setVisible,
    editedItem
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    setFormFields: payload => dispatch(setUpdateListFormFields(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateListModal);
