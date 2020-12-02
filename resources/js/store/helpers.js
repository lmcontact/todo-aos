export function formatFields(response) {
    return Object.keys(response.data.errors).map(key => ({
        errors: response.data.errors[key],
        name: key
    }));
}

export function formatErrorMessage(response, request) {
    if (response) {
        return "Une erreur interne au serveur est survenue, veuillez réessayer.";
    }
    return request
        ? "Aucune réponse du serveur, veuillez réessayer."
        : "Une erreur est survenue lors de l'envoi de la requếte, veuillez réessayer.";
}
