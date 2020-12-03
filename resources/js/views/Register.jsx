import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Card, Button, Divider } from "antd";
import { register, setRegisterFormFields } from "../store/registerSlice";

const Register = ({ fields, loading, setFormFields, dispatch }) => {
    const history = useHistory();
    const [form] = Form.useForm();

    const handleFormFieldsChange = (_, allFields) => {
        setFormFields(allFields);
    };

    const handleFormFinish = ({ username, password }) => {
        dispatch(register(history, { username, password }));
    };

    return (
        <Card style={{ maxWidth: "400px", margin: "0 auto" }}>
            <Divider
                orientation="left"
                style={{
                    fontSize: "2rem",
                    fontWeight: "600",
                    marginBottom: "3rem"
                }}
            >
                Inscription
            </Divider>

            <Form
                form={form}
                layout="vertical"
                fields={fields}
                onFieldsChange={handleFormFieldsChange}
                onFinish={handleFormFinish}
            >
                <Form.Item
                    name="username"
                    label="Nom d'utilisateur"
                    rules={[
                        {
                            required: true,
                            message: "Le nom d'utilisateur est obligatoire."
                        },
                        {
                            min: 6,
                            message:
                                "Le nom d'utilisateur doit contenir 6 caractères minimum."
                        },
                        {
                            max: 32,
                            message:
                                "Le nom d'utilisateur doit contenir 32 caractères maximum."
                        },
                        {
                            pattern: /^[a-zAZ0-9]*$/,
                            message:
                                "Le nom d'utilisateur doit seulement être composé de caractères et de chiffres."
                        }
                    ]}
                    style={{ marginBottom: "1rem" }}
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mot de passe"
                    rules={[
                        {
                            required: true,
                            message: "Le mot de passe est obligatoire."
                        },
                        {
                            min: 8,
                            message:
                                "Le mot de passe doit contenir 8 caractères minimum."
                        },
                        {
                            max: 64,
                            message:
                                "Le mot de passe doit contenir 64 caractères maximum."
                        }
                    ]}
                    style={{ marginBottom: "1rem" }}
                >
                    <Input.Password type="password" size="large" />
                </Form.Item>

                <Form.Item
                    name="password_confirmation"
                    label="Confirmation"
                    rules={[
                        {
                            required: true,
                            message: "La confirmation est obligatoire."
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    "La confirmation est différente du mot de passe."
                                );
                            }
                        })
                    ]}
                    style={{ marginBottom: "1rem" }}
                >
                    <Input.Password type="password" size="large" />
                </Form.Item>

                <Form.Item shouldUpdate style={{ marginTop: "2rem" }}>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form
                                    .getFieldsError()
                                    .filter(({ errors }) => errors.length)
                                    .length
                            }
                            loading={loading}
                        >
                            S'inscrire
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </Card>
    );
};

const mapStateToProps = ({ register }) => ({
    fields: register.fields,
    loading: register.loading
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    setFormFields: payload => dispatch(setRegisterFormFields(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
