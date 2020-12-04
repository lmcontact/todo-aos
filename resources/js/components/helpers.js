export const isSubmitButtonDisabled = (form, fields) => {
    return (
        !form.isFieldsTouched(fields || true) ||
        form.getFieldsError().filter(({ errors }) => errors.length).length
    );
};
