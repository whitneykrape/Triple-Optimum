/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log('Hello World! (from create-block-gutenpride block)');
/* eslint-enable no-console */

layoutSliders = (sliders) => { 
    let slidersStatus = {}

    if (sliders.length) {
        // loop through sliders...
        sliders.forEach((slider, sliderIndex) => {
        slidersStatus[sliderIndex] = {}; // console.log(sliders[0].children[0])
        // console.log(sliderIndex)
    
        if (sliders[sliderIndex].classList.contains('block__gallery-onewide') && Array.from(sliders[sliderIndex].children[0].children).length === 1) {
            sliders[sliderIndex].querySelector(".block_gallery-button-next").style.display = "none";
            sliders[sliderIndex].querySelector(".block_gallery-button-previous").style.display = "none";
        } else if (sliders[sliderIndex].classList.contains('block__gallery-onewide')) {
            slidersStatus[sliderIndex]['maxSlide'] = Array.from(sliders[sliderIndex].children[0].children).length - 1;
            slidersStatus[sliderIndex]['minSlide'] = 0; // Control Markers
    
            controlMarkersList = Array.from(sliders[sliderIndex].children[0].children); // console.log(controlMarkersList)
    
            addControlMarkers = '<ul class="controlMarkers">';
            controlMarkersList.forEach((marker, markerIndex) => {
            addControlMarkers += '<li class="block_gallery-button-setslide">' + markerIndex + '</li>';
            });
            addControlMarkers += '</ul>';
            sliders[sliderIndex].querySelector(".wp-block-gallery").insertAdjacentHTML('afterend', addControlMarkers);
        } else if (sliders[sliderIndex].classList.contains('block__gallery-multiplescroll') && Array.from(sliders[sliderIndex].children[0].children).length < 4) {
            if (sliders[sliderIndex].querySelector(".block_gallery-button-next")) sliders[sliderIndex].querySelector(".block_gallery-button-next").style.display = "none";
            if (sliders[sliderIndex].querySelector(".block_gallery-button-previous")) sliders[sliderIndex].querySelector(".block_gallery-button-previous").style.display = "none";
            sliders[sliderIndex].classList.add('verticalformobile');
            slidersStatus[sliderIndex]['maxSlide'] = 2;
            slidersStatus[sliderIndex]['minSlide'] = 0;
        } else if (sliders[sliderIndex].classList.contains('block__gallery-multiplescroll')) {
            if (window.innerWidth < 992) {
            slidersStatus[sliderIndex]['maxSlide'] = Array.from(sliders[sliderIndex].children[0].children).length;
            } else {
            slidersStatus[sliderIndex]['maxSlide'] = Array.from(sliders[sliderIndex].children[0].children).length - 2;
            }
    
            var firstSlide = sliders[sliderIndex].children[0].children[0];
            var lastSlide = sliders[sliderIndex].children[0].children[Array.from(sliders[sliderIndex].children[0].children).length - 1];
            firstSlideClone = firstSlide.cloneNode(true);
            lastSlideClone = lastSlide.cloneNode(true);
            lastSlide.after(firstSlideClone);
            firstSlide.before(lastSlideClone);
            slidersStatus[sliderIndex]['minSlide'] = 1; // Dupe the last to first?
            // Dupe first to last?
        } // IF WINDOW SIZE CHANGES
    
    
        slidersStatus[sliderIndex]['curSlide'] = slidersStatus[sliderIndex]['minSlide']; // For each slider, move all slides left according to their sliderIndex
        // Doesn't need to be local? 
        // listOfChildren = Array.from(sliders[sliderIndex].children[0].children)
    
        Array.from(sliders[sliderIndex].children[0].children).forEach((slide, index) => {
            // slide.style.transform = `translateX(${index * 100}%)`
            if (slide.className.includes('experience')) {
            // console.log('includes experience')
            slide.classList.add("experience");
            slide.classList.add("type-experience");
            } // console.log('slide.className 0')
            // console.log(slide.className)
    
    
            slide.classList.add("wp-container-69");
            slide.classList.add("wp-block-column");
            slide.classList.add("transform" + (index - slidersStatus[sliderIndex]['curSlide']).toString());
        });
    
        if (sliders[sliderIndex].classList.contains('block__gallery-multiplescroll')) {
            Array.from(sliders[sliderIndex].children[0].children).forEach((slide, index) => {
            if (slide.className.includes('experience')) {
                // console.log('includes experience')
                slide.classList.add("experience");
                slide.classList.add("type-experience");
            } // console.log('slide.className 0')
            // console.log(slide.className)
    
    
            slide.classList.add("wp-container-69");
            slide.classList.add("wp-block-column");
            slide.classList.add("transform" + (index - slidersStatus[sliderIndex]['curSlide']).toString()); // slide.style.transform = `translateX(${100 * (index - slidersStatus[sliderIndex]['curSlide'])}%)`
            });
        }
    
        setSlide = sliders[sliderIndex].querySelectorAll(".block_gallery-button-setslide"); // console.log('setSlide')
        // console.log(setSlide)
    
        setSlide.forEach((slideButton, index) => {
            if (index === 0) slideButton.classList.add('currentSlide'); // console.log('slideButton')
            // console.log(slideButton)
    
            slideButton.addEventListener("click", function (e) {
            // console.log('setSlide')
            // console.log(setSlide)
            setSlide = sliders[sliderIndex].querySelectorAll(".block_gallery-button-setslide");
            setSlide.forEach((slideButton, index) => {
                slideButton.classList.remove('currentSlide'); // console.log('slideButton.classList')
                // console.log(slideButton.classList)
            });
            slideButton.classList.add('currentSlide');
            slideButtonNumber = slideButton.innerHTML; // console.log('sliderIndex')
            // console.log(sliderIndex)
            // console.log('slidersStatus')
            // console.log(slidersStatus)
            // console.log('listOfChildren')
            // console.log(listOfChildren)
            // check if current slide is the last and reset current slide
            // console.log('slidersStatus[sliderIndex]')
            // console.log(slidersStatus[sliderIndex])
    
            slidersStatus[sliderIndex]['curSlide'] = parseInt(slideButtonNumber); //   move slide by -100%
    
            Array.from(sliders[sliderIndex].children[0].children).forEach((slide, index) => {
                // console.log('slide.className 1')
                // console.log(slide.className)
                slide.className = "wp-container-69 wp-block-column";
                slide.classList.add("transform" + (index - slideButtonNumber).toString()); // slide.style.transform = `translateX(${100 * (index - slidersStatus[sliderIndex]['curSlide'])}%)`
            }); // console.log('slidersStatus')
            // console.log(slidersStatus)
            });
        }); // select next slide button
        // make this local to each slider
    
        nextSlide = sliders[sliderIndex].querySelector(".block_gallery-button-next");
        prevSlide = sliders[sliderIndex].querySelector(".block_gallery-button-previous"); // current slide counter
        // maximum number of slider
        // Temporarily subtract a few...
        // console.log('slidersStatus')
        // console.log(slidersStatus)
        // add event listener and navigation functionality
        // make this local to each slider
    
        if (nextSlide) nextSlide.addEventListener("click", function () {
            // nextSlideEvent(sliderIndex);
        }); // select next slide button
        // make this local to each slider
        // add event listener and navigation functionality
        // make this local to each slider
    
        if (prevSlide) prevSlide.addEventListener("click", function () {
            // previousSlideEvent(sliderIndex);
        });
        
        });
    } // If sliders
}

window.addEventListener('load', listener = () => {
    const sliders = document.querySelectorAll(".sttb-tabbed-content");

    console.log('sliders')
    console.log(sliders)

    layoutSliders(sliders)
})

console.log('Tabbed Loaded 0.001')