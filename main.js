const { app, BrowserWindow } = require('electron')
const path = require('path')
const gotTheLock = app.requestSingleInstanceLock()

const createWindow = () => {
    const win = new BrowserWindow({
        transparent: true, // deja trasparente el background de la ventana
        frame: false, // deja sin marco la venta y botones
        resizable: false,
        closable: false,
        width: 185,
        height: 140,
        icon: path.join(__dirname, "build-assets/alerta.ico"),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })


    win.loadFile('index.html')
}

if (!gotTheLock) { ///
    app.quit()
} else {
    ('second-instance', (event, commandLine, workingDirectory) => {
        if (win) {
            if (win.isMinimized()) win.restore()
            win.focus()
        }
    })

}


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
