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
/* eslint-enable no-console */

console.log('Tabbed Loaded 0.003')

/*
layoutSlidersOld = (sliders) => { 
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



    // setSlide.forEach((slideButton, index) => {
    //     if (index === 0) slideButton.classList.add('currentSlide'); // console.log('slideButton')
// 
    //     // Universal event that says...
    //     // Don't think this is quite universal yet.
    //     // I get a single item (so if it's a list this is applied in a map)
    //     // And add a listener to that item
    //     // So, if these have accurate data- added to them, the event can pull in the object
    //     // And the current slide which is 0 and held by the main tab list (so it's absolute)
    //     // All it does is tell how that current should be modified
    //     // If it's next or prev it gets plus or minus
    //     // If it's a number it's absolute
    //     // The helpers around it resets then moves things
    //     // Most of this is true already, just needs some cleanup (better naming, clearer code)
    //     slideButton.addEventListener("click", function (e) {
    //         // Get the larger sliders HTML. 
    //         setSlide = sliders[sliderIndex].querySelectorAll(".block_gallery-button-setslide");
    //         // Clear out "currentSlide" just in case.
    //         setSlide.forEach((slideButton, index) => {
    //             slideButton.classList.remove('currentSlide'); // console.log('slideButton.classList')
    //         });
    //         // Set the current one now...
    //         slideButton.classList.add('currentSlide');
    //         // This gets a number for what the slide should be, change to a data number
    //         slideButtonNumber = slideButton.innerHTML // console.log('sliderIndex')
    //         // Make sure the number is, ya know, a number
    //         slidersStatus[sliderIndex]['curSlide'] = parseInt(slideButtonNumber); //   move slide by -100%
// 
// 
    //         Array.from(sliders[sliderIndex].children[0].children).forEach((slide, index) => {
    //             slide.className = "wp-container-69 wp-block-column";
    //             slide.classList.add("transform" + (index - slideButtonNumber).toString()); // slide.style.transform = `translateX(${100 * (index - slidersStatus[sliderIndex]['curSlide'])}%)`
    //         });
    //     })
    // })
*/

tabbedNavigationClick = (clickElement, tabbedArray) => {
    clickElement.addEventListener("click", function (e) {
        console.log('e')
        console.log(e)
        // Get the larger sliders HTML. 
        identifierEvent = clickElement.dataset.tabnavigationidentifier
        document.querySelectorAll('.wp-block-stitchedblocks-block-tabbed-content').map().classList.remove('currentSlide')
        // Clear out "currentSlide" just in case.
        
        // Most of the below is useful? Try out in raw.
        Array.from(tabbedArray).forEach((slide, index) => {
                slide.classList.add("transform" + (index - slideButtonNumber).toString());
                slide.style.transform = `translateX(${100 * (index - slidersStatus[sliderIndex]['curSlide'])}%)`
        })

        // identifierEvents.forEach((slideButton, index) => {
        //     slideButton.classList.remove('currentSlide'); // console.log('slideButton.classList')
        // });
        // // Set the current one now...
        // slideButton.classList.add('currentSlide');
        // // This gets a number for what the slide should be, change to a data number
        // slideButtonNumber = slideButton.innerHTML // console.log('sliderIndex')
        // // Make sure the number is, ya know, a number
        // slidersStatus[sliderIndex]['curSlide'] = parseInt(slideButtonNumber); //   move slide by -100%
        // //
        // Array.from(sliders[sliderIndex].children[0].children).forEach((slide, index) => {
        //         slide.className = "wp-container-69 wp-block-column";
        //         slide.classList.add("transform" + (index - slideButtonNumber).toString()); // slide.style.transform = `translateX(${100 * (index - slidersStatus[sliderIndex]['curSlide'])}%)`
        // });
    })
}


        
layoutSlidersNavigation = (slider) => {
    console.log('slider')
    console.log(slider)

    console.log('slider')
    console.log(slider.dataset.tabnavigationidentifier)

    tabsHolder = document.querySelector('[data-tabnavigationidentifier="' + slider.dataset.tabnavigationidentifier + '"]')
    controlMarkersList = document.querySelectorAll('[data-tabnavigationidentifiercontroller="' + slider.dataset.tabnavigationidentifier + '"]')

    console.log('controlMarkersList')
    console.log(controlMarkersList)

    // Pull into function that builds
    // It is okay to have many a function
    addControlMarkers = '<ul class="controlMarkers">'
    controlMarkersList.forEach((marker, markerIndex) => {
        console.log('markerIndex')
        console.log(markerIndex)

        addControlMarkers += '<li class="block_gallery-button-setslide">' + markerIndex + '</li>'
    });
    addControlMarkers += '</ul>'

    console.log('addControlMarkers')
    console.log(addControlMarkers)

    return addControlMarkers
}

window.addEventListener('load', listener = () => {
    document.querySelectorAll('.wp-block-stitchedblocks-block-tabbed-content').forEach(all => all.classList.remove('currentSlide'))

    // Overarching navigation element, should be unique, get from data
    // Starting slide
    // Make an object to contain everything
    // Set up each and every slider
    // IN WORDPRESS, HAVE AN AUTOMATIC NAMING SCHEME
    
    // THESE NEED THE NAMES THEY ARE ASSOCIATED TO
    // So do I iterate over content or navigation?
    // Over the content, then you go back to? The main nav item? 
    // Over the navigation, build up the object, then get the nav items iterated as needed
    const tabbedElements = document.querySelectorAll(".sttb-tabbed-content")
    const tabNavigationElements = document.querySelectorAll(".tabNavProperties")
    let   allTabbed = {}
    let   clickableNavigationElements

    console.log('tabbedElements')
    console.log(tabbedElements)

    tabNavigationElements.forEach((element, elementIndex) => {
        tabbedId = element.dataset.tabnavigationidentifier
        
        console.log('tabbedId')
        console.log(tabbedId)

        allTabbed[tabbedId] = {}

        controlMarkers = layoutSlidersNavigation(element)
        document.querySelector('[data-tabnavigationidentifier="' + tabbedId + '"]').insertAdjacentHTML('afterend', controlMarkers)

        controlMarkers = document.querySelectorAll(".block_gallery-button-setslide")
        clickableNavigationElements = document.querySelectorAll(".block_gallery-button-setslide")
        console.log('clickableNavigationElements')
        console.log(clickableNavigationElements)
        clickableNavigationElements.forEach((element) => {
            tabbedNavigationClick(element, controlMarkers)
        })

        // layoutLeftRightButtons
        // eventAddClickable


        // if enabled
        //   layoutLeftRightButtons

        // if enabled




    })
    



    console.log('allTabbed')
    console.log(allTabbed)

    // Create Prev, Next

    // Add events to each.
})