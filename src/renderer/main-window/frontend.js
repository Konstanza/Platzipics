import { setIpc, openDirectory, saveFile, openPreferences, uploadImage, pasteImage } from './main-window/ipcRendererEvents'
import { addImagesEvents, searchImagesEvent, selectEvent, print } from './main-window/images-ui'
import { filterChangeEvent, restoreFilter, saveFilter } from './main-window/filters'
import createMenu from './main-window/menu'

window.addEventListener('load', () => {
	createMenu()
	setIpc()
	addImagesEvents()
	searchImagesEvent()
	selectEvent()
	filterChangeEvent()
	buttonEvent('open-directory', openDirectory)
	buttonEvent('save-button', saveFile)
	buttonEvent('open-preferences', openPreferences)
	buttonEvent('print-button', print)
	buttonEvent('upload-button', uploadImage)
	buttonEvent('paste-button', pasteImage)
	buttonEvent('restore-filter-button', restoreFilter)
	buttonEvent('save-filter-button', saveFilter)
})

function buttonEvent (id, func) {
	const button = document.getElementById(id)
	button.addEventListener('click', func)
}






