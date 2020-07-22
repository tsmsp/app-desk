// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, Menu} = require('electron')
const path = require('path')
const assetsDirectory = path.join(__dirname, 'assets')

let tray = undefined

const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'iconTemplate.png'))    
  
   const contextMenu = Menu.buildFromTemplate([    
    { label: 'Music Player', type: 'radio', checked: false }    
   ])
  tray.setToolTip('Player Study')
  tray.setContextMenu(contextMenu)
}

function createWindow () {  
  const win = new BrowserWindow({      
    icon: path.join(__dirname, 'assets/icons/64x64.png'),  
    backgroundColor: '#312450',    
    width: 1366,
    height: 762,            
    titleBarStyle: 'show',
    fullscreen: false,    
    show: true,    
    webPreferences: {
      nodeIntegration: true,
      images: true,
      sandbox: true,
      preload: path.join(app.getAppPath(), 'preload.js')      
    }    
  })

//app.dock.hide()
app.on('ready', () => {
  createTray();
  createWindow();
  win.once('ready-to-show', () => {
    win.show();
  }) 
})

  // and load the index.html of the app  
  win.loadURL('https://gk4m.github.io/vue-spotify/#/browse/genres')  

  // Open the DevTools.
  // win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


