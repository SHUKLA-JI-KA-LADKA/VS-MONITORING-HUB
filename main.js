const electron = require('electron');
const url = require('url')
const path = require('path')
const {app, BrowserWindow, Menu} = electron;
const { ipcMain } = require('electron')
const fs = require('fs');

//importing functions
const sysMon = require('./sysMon.js')

app.on('ready', () => {

  const mainController = new BrowserWindow({

    width:500,
    height:500,
    minWidth:400,
    maxWidth:1920,
    minHeight:300,
    maxHeight:1080,
    backgroundColor: "#3c3c44",
    webPreferences:{
      nodeIntegration:true,
      contextIsolation:false
    }
  });

  //load HTML
  mainController.loadURL(url.format({
    pathname: path.join(__dirname, 'mainController.html'),
    protocol: 'file:',
    slashes:true
  }));

  //mainController.openDevTools()

  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);

  sysMon();
});

//Create menu template
const mainMenuTemplate = [
  {
    label : 'File',
    submenu:[

      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'command+Q' :'ctrl+Q',
        click(){
          app.quit();
        }
      }
    ],
  },

];
