import { Dialog } from "quasar";

function showErrorMessage(message) {
    Dialog.create({
        title: 'Error',
        message: message
    })
}

export { showErrorMessage }