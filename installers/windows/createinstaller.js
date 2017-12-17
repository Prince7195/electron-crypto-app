const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig() {
    console.log('creating windows installer')
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release-builds')

    return Promise.resolve({
        appDirectory: path.join(outPath, 'electron-crypto-app-win32-ia32/'),
        authors: 'Vijay Deepak',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        exe: 'electron-crypto-app.exe',
        setupExe: 'CryptoApp.exe',
        setupIcon: path.join(rootPath, 'src', 'assets', 'icons', 'win', 'btc.ico')
    })
}