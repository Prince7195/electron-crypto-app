const electron = require('electron');
const path = require('path');

const ipc = electron.ipcRenderer;
const remote = electron.remote;

const closeBtn = document.getElementById('closeBtn');

const closeWindow = () => {
    var window = remote.getCurrentWindow();
    window.close();
}

closeBtn.addEventListener('click', (event) => {
    closeWindow();
});

const updateBtn = document.getElementById('updateBtn');

updateBtn.addEventListener('click', () => {
    ipc.send(
            'update-notify-value', 
            document.getElementById('notifyVal').value
        );
    closeWindow();
});