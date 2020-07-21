const { BrowserWindow, app } = require ('electron')
require ('electron-reload')(__dirname);


function createWindow(){
    const win = new BrowserWindow ({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: true           
        }
    });

    win.loadFile('.src/index.html');
}

app.whenReady().them(createWindow);
app.on('window-all-closed', ()=> {
    if (process.platform !=='darwin')
        app.quit()
})

app.on('active', () => {
    if (BrowserWindow.getFocusedWindow().length === 0)
        createWindow();
})