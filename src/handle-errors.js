import { app, dialog } from 'electron'

function relaunchApp (win) {
	dialog.showMessageBox(win, {
		type: 'error',
		title: 'Platzipics',
		message: 'Ocurrió un error inesperado, se reiniciará la aplicación'
	}, () => {
		app.relaunch()
		app.exit(0)
	})
}

function setupErrors (win) {
	win.webContents.on('crashed', () => {
		relaunchApp(win)
	})

	win.on('unresponsive', () => {
		dialog.showMessageBox(win, {
			type: 'warning',
			title: 'Platzipics',
			message: 'Un proceso está tardando demasiado, puede esperar o reiniciar la aplicación manualmente'
		})
	})

	process.on('uncaughtException', () => {
		relaunchApp(win)
	})
}

module.exports = setupErrors