const electron = require('electron');
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require('axios');
const ipc = electron.ipcRenderer;

const notifyBtn = document.getElementById('notifyBtn');
var price = document.querySelector('h1');
var targetPrice = document.getElementById('targetPrice');
var targetPriceVal;

const notification = {
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

function notifyMe() {
    Notification.requestPermission().then(result => {
        // alert(result);
        if(result == 'granted'){
            var myNotification = new Notification('BTC Alert', {
                body: 'BTC just beat your target price!',
                icon: path.join(__dirname, '../assets/images/btc.png')
            });
        }
        // var myNotification = new Notification('BTC Alert', notification);
    })
}

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD;
            price.innerHTML = '$'+cryptos.toLocaleString('en');
            
            if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
                notifyMe();   
            }
        });
}

getBTC();
setInterval(() => {
    getBTC();
}, 10000);

notifyBtn.addEventListener('click', (event) => {
    const modalPath = path.join('file://', __dirname, 'add.html');
    let win = new BrowserWindow({
        width: 400,
        height: 200,
        frame: false,
        transparent: true,
        alwaysOnTop: true
    });
    win.on('close', () => { win = null });
    win.loadURL(modalPath);
    win.show();
});

ipc.on('targetPriceVal', (event, arg) => {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en');
});