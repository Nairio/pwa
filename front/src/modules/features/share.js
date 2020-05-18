import {settings} from "./settings";

export async function share() {
    if (window.Windows) {
        const DataTransferManager = window.Windows.ApplicationModel.DataTransfer.DataTransferManager;
        const dataTransferManager = DataTransferManager.getForCurrentView();
        dataTransferManager.addEventListener("datarequested", (ev) => {
            const data = ev.request.data;
            data.properties.title = settings.title;
            data.properties.url = document.location.protocol + "//" + document.location.hostname;
            data.setText(settings.subtitle)
        });
        DataTransferManager.showShareUI();
        return true;
    } else if (navigator.share) {
        try {
            await navigator.share({title: settings.title, text: settings.subtitle, url: document.location.protocol + "//" + document.location.hostname});
            return true;
        } catch (err) {
            console.error('There was an error trying to share this content');
            return false;
        }
    } else {
        alert("Устройство не поддерживает navigator.share")
    }
}
