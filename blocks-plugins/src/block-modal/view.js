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

console.log('Modal Loaded 0.025')



window.addEventListener('load', listener = () => {
    // Roadmap, swap out classes for data. Makes 
    let arrayOfModalOpeners   = document.querySelectorAll('.sttb01mb__modalopener');
    let arrayOfModalBodies    = document.querySelectorAll('.sttb01mb__modalwrap');
    let arrayOfModalOverlays  = document.querySelectorAll('.sttb01mb__overlay');



    clickToggleModal = (element, referenceToModalBody, arrayOfModalBodies, arrayOfModalOverlays) => {
        element.addEventListener("click", (event) => {    
            arrayOfModalBodies[referenceToModalBody].classList.toggle("sttb01mb--show")
            arrayOfModalOverlays[referenceToModalBody].classList.toggle("sttb01mb--show")
        })
    }

    console.log('arrayOfModalBodies')
    console.log(arrayOfModalBodies)

    // Iterate through the Controllers as assocate them.
    arrayOfModalOpeners.forEach((slide, slideIndex) => {
        console.log(slide)
        console.log(slideIndex)

        // Get the dataset from the frontend. 
        referenceToModalBody = slide.dataset.sttb1__modalid;

        console.log("referenceToModalBody")
        console.log(referenceToModalBody)

        if (referenceToModalBody != 'Select an Option') {
            overlay = arrayOfModalOverlays[referenceToModalBody]

            console.log('referenceToModalBody')
            console.log(referenceToModalBody)

            // Set up the clicks.
            // Roadmap, pull this out. 
            clickToggleModal(slide, referenceToModalBody, arrayOfModalBodies, arrayOfModalOverlays)
            clickToggleModal(overlay, referenceToModalBody, arrayOfModalBodies, arrayOfModalOverlays)
        }
    })
})