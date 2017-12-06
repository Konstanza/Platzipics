import { remote } from 'electron'
import { openDirectory, saveFile, openPreferences, uploadImage, pasteImage } from './ipcRendererEvents'
import { applyCustomFilter } from './filters'
import { print } from './images-ui'

function createMenu () {
	const template = [
		{
			label: 'Archivo',
			submenu: [
				{
					label: 'Abrir ubicación',
					accelerator: 'CmdOrCtrl+O',
					click () {
						openDirectory()
					}
				},
				{
					label: 'Guardar',
					accelerator: 'CmdOrCtrl+G',
					click () {
						saveFile()
					}
				},
				{
					label: 'Preferencias',
					accelerator: 'CmdOrCtrl+,',
					click () {
						openPreferences()
					}
				},
				{
					label: 'Cerrar',
					role: 'quit'
				}
			]
		},
		{
			label: 'Edición',
			submenu: [
				{
					label: 'Imprimir',
					accelerator: 'CmdOrCtrl+P',
					click () {
						print()
					}
				},
				{
					label: 'Subir a Cloudup',
					accelerator: 'CmdOrCtrl+U',
					click () {
						uploadImage()
					}
				},
				{
					label: 'Pegar imagen',
					accelerator: 'CmdOrCtrl+V',
					click () {
						pasteImage()
					}
				}
			]
		},
		{
			label: 'Ver',
			submenu: [
				{
					label: 'Herramientas',
					accelerator: 'CmdOrCtrl+F',
					click () {
						var tools = document.getElementById('tools')
						tools.classList.toggle('hidden')

						if (!tools.classList.contains('hidden')) {
							document.getElementById('filters').value = 'custom'
							applyCustomFilter(document.getElementById('image-displayed'))
						}
					}
				}
			]
		}
	]

	const menu = remote.Menu.buildFromTemplate(template)
	remote.Menu.setApplicationMenu(menu)
}

module.exports = createMenu