import settings from 'electron-settings'

function applyFilter (filter, currentImage) {

	let imgObj = new Image(); // eslint-disable-lint
	imgObj.src = currentImage.dataset.original;
	 
	filterous.importImage(imgObj, {}) // eslint-disable-lint
	  .applyInstaFilter(filter)
	  .renderHtml(currentImage);
}

function applyCustomFilter (currentImage) {

	let imgObj = new Image(); // eslint-disable-lint
	imgObj.src = currentImage.dataset.original;
	
	let f = filterous.importImage(imgObj, {}) // eslint-disable-lint
		f.applyFilter("sepia", parseFloat(document.querySelector("input[name=sepia]").value))
		f.applyFilter("brightness", parseFloat(document.querySelector("input[name=brightness]").value))
		f.applyFilter("contrast", parseFloat(document.querySelector("input[name=contrast]").value))
		f.applyFilter("saturation", parseFloat(document.querySelector("input[name=saturation]").value))
		f.applyFilter("colorFilter", [parseInt(document.querySelector("input[name=colorFilter-r]").value), parseInt(document.querySelector("input[name=colorFilter-g]").value), parseInt(document.querySelector("input[name=colorFilter-b]").value), parseFloat(document.querySelector("input[name=colorFilter-adj]").value)])
		if (document.getElementById('rgbAdjust-apply').checked) f.applyFilter("rgbAdjust", [parseInt(document.querySelector("input[name=rgbAdjust-r]").value), parseInt(document.querySelector("input[name=rgbAdjust-g]").value), parseInt(document.querySelector("input[name=rgbAdjust-b]").value)])
		if (document.getElementById('grayscale-apply').checked) f.applyFilter("grayscale")
		if (document.getElementById('invert-apply').checked) f.applyFilter("invert")
		f.renderHtml(currentImage)
}

function filterChangeEvent () {

	const sliders = document.querySelectorAll('input[type=range]')
	const numbers = document.querySelectorAll('input[type=number]')

	for (var i = 0; i < sliders.length; i++) {
		sliders[i].addEventListener('change', function () {
			let number = document.querySelector(`input[type=number][name=${this.name}]`)
			number.value = this.value
			applyCustomFilter(document.getElementById('image-displayed'))
		})
		numbers[i].addEventListener('change', function () {
			let slider = document.querySelector(`input[type=range][name=${this.name}]`)
			slider.value = this.value
			applyCustomFilter(document.getElementById('image-displayed'))
		})
	}

	const checkboxes = document.querySelectorAll('input[type=checkbox]') 

	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].addEventListener('change', function () {
			applyCustomFilter(document.getElementById('image-displayed'))
		})
	}

	const colorFilter = document.getElementById('colorFilter-label')
	colorFilter.addEventListener('click', function () {
		let colorFilterControls = document.getElementById('colorFilter-controls')
		if (colorFilterControls.classList.contains('hidden')) {
			colorFilterControls.classList.remove('hidden')
			document.getElementById('colorFilter-icon').classList.remove('icon-down-open')
			document.getElementById('colorFilter-icon').classList.add('icon-up-open')
		}
		else {
			colorFilterControls.classList.add('hidden')
			document.getElementById('colorFilter-icon').classList.remove('icon-up-open')
			document.getElementById('colorFilter-icon').classList.add('icon-down-open')
		}
	})

	const rgbAdjust = document.getElementById('rgbAdjust-label')
	rgbAdjust.addEventListener('click', function () {
		let rgbAdjustControls = document.getElementById('rgbAdjust-controls')
		if (rgbAdjustControls.classList.contains('hidden')) {
			rgbAdjustControls.classList.remove('hidden')
			document.getElementById('rgbAdjust-icon').classList.remove('icon-down-open')
			document.getElementById('rgbAdjust-icon').classList.add('icon-up-open')
		}
		else {
			rgbAdjustControls.classList.add('hidden')
			document.getElementById('rgbAdjust-icon').classList.remove('icon-up-open')
			document.getElementById('rgbAdjust-icon').classList.add('icon-down-open')
		}
	})
}

function restoreFilter () {
	const sliders = document.querySelectorAll('input[type=range]')
	const numbers = document.querySelectorAll('input[type=number]')

	for (var i = 0; i < sliders.length; i++) {
		sliders[i].value = 0
		numbers[i].value = 0
	}

	const checkboxes = document.querySelectorAll('input[type=checkbox]') 

	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false
	}

	applyFilter('normal', document.getElementById('image-displayed'))
}

function saveFilter () {
	let filters = settings.get('filters')
	console.log(filters)
}

function loadFilters () {
	let filters

	if (settings.has('filters')) {
		 filters = settings.get('filters')

		 let parent = document.getElementById('filters')

		 for (key in filters) {
		 	
		 }
		 var node = document.createElement('option');
    	 node.value = i;
	}
	else {
		settings.set('filters', {})
	}

	console.log(filters)
}

module.exports = {
	applyFilter: applyFilter,
	applyCustomFilter: applyCustomFilter,
	filterChangeEvent: filterChangeEvent,
	restoreFilter: restoreFilter,
	saveFilter: saveFilter
}
