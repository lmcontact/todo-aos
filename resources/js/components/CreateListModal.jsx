import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Modal, Button, Input } from "antd";
import { createList, setCreateListFormFields } from "../store/createListSlice";

const NewListModal = ({
    visible,
    setVisible,
    fields,
    setFormFields,
    loading,
    dispatch
}) => {
    const [form] = Form.useForm();
    const [submitDisabled, setSubmitDisabled] = useState(true);

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
        dispatch(createList(handleCancel, { name }));
    };

    return (
        <Modal
            title="Création d'une nouvelle liste"
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

const mapStateToProps = ({ createList }, { visible, setVisible }) => ({
    fields: createList.fields,
    loading: createList.loading,
    visible,
    setVisible
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    setFormFields: payload => dispatch(setCreateListFormFields(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewListModal);
