'use strict'

import { app, BrowserWindow, Tray, globalShortcut, protocol } from 'electron'
import devtools from './devtools'
import handleErrors from './handle-errors'
import setIpcMainEvents from './ipcMainEvents'
import os from 'os'
import path from 'path'

global.win // eslint-disable-line
global.tray // eslint-disable-line

if (process.env.NODE_ENV === 'development') {
  devtools()
}

app.on('before-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('ready', () => {
  protocol.registerFileProtocol('plp', (request, callback) => {
    const url = request.url.substr(6)
    callback({path: path.normalize(url)}) // eslint-disable-line
  }, (err) => {
    if (err) throw err
  })

  global.win = new BrowserWindow({
    show: false,
    width: 920,
    height: 600,
    minWidth: 942,
    minHeight: 130,
    title: 'Platzipics',
    center: true,
    maximizable: false,
    icon: path.join(__dirname, 'assets', 'icons', 'main-icon.png')
  })

  globalShortcut.register('CommandOrControl+Alt+P', () => {
    global.win.show()
    global.win.focus()
  })

  setIpcMainEvents(global.win)
  handleErrors(global.win)

  global.win.once('ready-to-show', () => {
    global.win.show()
  })

  /*win.on('move', () => {
    const position = win.getPosition()
    console.log(`La posición de la ventana es ${position}`)
  })*/

  global.win.on('closed', () => {
    global.win = null
    app.quit()
  })

  let icon 

  if (os.platform === 'win32') {
    icon = path.join(__dirname, 'assets', 'icons', 'tray-icon.ico')
  }
  else {
    icon = path.join(__dirname, 'assets', 'icons', 'tray-icon.png')
  }

  global.tray = new Tray(icon)
  global.tray.setToolTip('Platzipics')
  global.tray.on('click', () => {
    global.win.isVisible() ? global.win.hide() :global.win.show()
  })

  global.win.loadURL(`file://${__dirname}/renderer/index.html`)
})
