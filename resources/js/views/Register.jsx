import React from "react";
import { Form, Input, Card, Button } from "antd";

const inputStyle = {
    marginBottom: "1rem"
};

function Register() {
    const [form] = Form.useForm();

    const handleFormFinish = values => {
        console.log(values);
    };

    return (
        <Card style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "3rem" }}>
                Inscription
            </h1>
            <Form form={form} layout="vertical" onFinish={handleFormFinish}>
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
                    style={inputStyle}
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
                    style={inputStyle}
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
                    style={inputStyle}
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
                        >
                            S'inscrire
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </Card>
    );
}

export default Register;