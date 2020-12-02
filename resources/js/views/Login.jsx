import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Card, Button, Checkbox } from "antd";
import { login, setLoginFormFields } from "../store/loginSlice";

function Login({ fields, loading, setFormFields, dispatch }) {
    const history = useHistory();
    const [form] = Form.useForm();

    const handleFormFieldsChange = (_, allFields) => {
        setFormFields(allFields);
    };

    const handleFormFinish = ({ username, password, remember }) => {
        dispatch(login(history, { username, password, remember }));
    };

    return (
        <Card style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "3rem" }}>
                Connexion
            </h1>

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
                        }
                    ]}
                    style={{ marginBottom: "1rem" }}
                >
                    <Input.Password type="password" size="large" />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    style={{ marginBottom: "1rem" }}
                >
                    <Checkbox>Se souvenir de moi</Checkbox>
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
                            Se connecter
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </Card>
    );
}

const mapStateToProps = ({ login }) => ({
    fields: login.fields,
    loading: login.loading
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    setFormFields: payload => dispatch(setLoginFormFields(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
