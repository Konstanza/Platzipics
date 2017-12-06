import url from 'url'
import path from 'path'
import { applyFilter, applyCustomFilter } from './filters'
import fs from 'fs-extra'

function saveImage (fileName, callback) {
	let fileSrc = document.getElementById('image-displayed').src
	
	if (fileSrc.indexOf(';base64,') !== -1){
		fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, '')
		fs.writeFile(fileName, fileSrc, 'base64', callback)
	}
	else {
		fileSrc = fileSrc.replace('plp://', '')
		fs.copy(fileSrc, fileName, callback)
	}
}

function clearImages () {
	const oldImages = document.querySelectorAll('li.list-group-item')
	
	for (let i = 0; i < oldImages.length; i++) {
		oldImages[i].parentNode.removeChild(oldImages[i])
	}
}

function loadImages (images) {
	const imagesList = document.querySelector('ul.list-group')
	for (let i = 0; i < images.length; i++) {
		const node = `<li class="list-group-item">
				    <img class="media-object pull-left" src="${images[i].src}" height="32">
				    <div class="media-body">
				      <strong>${images[i].filename}</strong>
				      <p>${images[i].size}</p>
				    </div>
				  </li>`
		imagesList.insertAdjacentHTML('beforeend', node)
	}
}

function addImagesEvents () {
	const thumbs = document.querySelectorAll('li.list-group-item')

	for (let i = 0, length1 = thumbs.length; i < length1; i++) {
		thumbs[i].addEventListener('click', function () {
			changeImage(this)
		})
	}
}

function changeImage (node) {
	if (node != null) {
		const selected = document.querySelector('li.selected')
		if (selected) {
			selected.classList.remove('selected')
		}
		node.classList.add('selected')
		const image = document.getElementById('image-displayed')
		image.src = node.querySelector('img').src
		image.dataset.original = image.src
		document.getElementById('filters').value = 'normal' 
		document.getElementById("tools").classList.add('hidden')
	}
	else {
		document.getElementById('image-displayed').src = ''
	}
}

function selectFirstImage () {
	const image = document.querySelector('li.list-group-item:not(.hidden)')
	changeImage(image)
}

function searchImagesEvent () {
	const searchBox = document.getElementById("search-box")

	searchBox.addEventListener('keyup', function () {

		const regex = new RegExp(this.value.toLowerCase(), 'gi')
		const thumbs = document.querySelectorAll('li.list-group-item img')

		if (this.value.length > 0){
			for (let i = 0, length1 = thumbs.length; i < length1; i++) {
				const fileUrl = url.parse(thumbs[i].src)
				const fileName = path.basename(fileUrl.pathname)
				if (fileName.match(regex)){
					thumbs[i].parentNode.classList.remove('hidden')
				}
				else {
					thumbs[i].parentNode.classList.add('hidden')
				}
			}
			selectFirstImage()
		}
		else {
			const hidden = document.querySelectorAll('li.hidden')
			for (let i = 0, length1 = hidden.length; i < length1; i++) {
				hidden[i].classList.remove('hidden')
			}
		}
	})
}

function selectEvent () {
	const select = document.getElementById('filters')

	select.addEventListener('change', function () {
		if (this.value != "custom"){
			document.getElementById("tools").classList.add('hidden')

			applyFilter(this.value, document.getElementById('image-displayed'))
		}
		else {
			document.getElementById("tools").classList.remove('hidden')
			
			applyCustomFilter(document.getElementById('image-displayed'))
		}
	})
}

function print () {
	window.print()
}

module.exports = {
	clearImages: clearImages,
	loadImages: loadImages,
	addImagesEvents: addImagesEvents,
	changeImage: changeImage,
	selectFirstImage: selectFirstImage,
	searchImagesEvent: searchImagesEvent,
	selectEvent: selectEvent,
	saveImage: saveImage,
	print: print
}