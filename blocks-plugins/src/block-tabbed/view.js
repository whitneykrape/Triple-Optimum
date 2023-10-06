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
 * 
 * Leaving the starter text and extensive noting for folks to learn from (and potentially fork)
 */

/* eslint-disable no-console */
/* eslint-enable no-console */

console.log('Tabbed Loaded 0.014')

// Global status of all Tabs accessible later 
let allTabbedNavigators = {}



horizontalTabMovement = (tabbedNavId) => {
    // Variables, defines scope and allows testing
    let tabbedArray, clickValue, newIndex, newIndexTranslate

    // From the "parent" tabbedNavId get all the content with that Id
    tabbedArray = document.querySelectorAll('[data-sttb1__tabbedlink="' + tabbedNavId + '"]')

    // Get the (recently updated) index 
    clickValue = allTabbedNavigators[tabbedNavId]['currentIndex']

    // Set the new properties for each content tab
    tabbedArray.forEach((content, contentIndex) => {
        // Calculate the new index and and how far to move for each content piece
        newIndex          = contentIndex - clickValue
        newIndexTranslate = 100 * (newIndex)
        newIndex          = (newIndex).toString()

        // Reset and then set className and style
        content.className = content.className.replace(/transform([\-0-9]*)/, '')
        content.classList.add("transform" + newIndex)
        content.style.transform = `translateX(${newIndexTranslate}%)`
    })
}



tabbedNavigationClick = (tabbedNavId) => {
    // Variables, defines scope and allows testing
    let navigationMarkers, clickValue

    // Starting from the tabbedNavId get the parent then children for that tabbed group
    navigationMarkers = document.querySelectorAll('[data-sttb1__tabbednavid="' + tabbedNavId + '"] .tabbedNavigationMarker')

    // Iterate through what was just chosen above
    navigationMarkers.forEach((clickElement) => {
        // Clear out the events incase this is a reload or other restart
        clickElement.removeEventListener("click", (event) => {})

        // Set out the new events
        clickElement.addEventListener("click", (event) => {
            console.log('eventStart')
            console.log(event)

            // Get what was clicked on and set the global object
            clickValue = clickElement.innerHTML
            allTabbedNavigators[tabbedNavId]['currentIndex'] = clickValue
            // ISSUE
            // If the event doesn't finish running properly, we've set an unconfirmed index
            // Might need error handling 

            // Run the movement event
            horizontalTabMovement(tabbedNavId)

            console.log('eventEnd')
        })
    })
}


        
layoutNavigationMarkers = (tab) => {
    // Variables, defines scope and allows testing
    let tabMarkersList, addTabMarkersHTML
    let addTabMarkers = []

    // Get all the content with this tabs id (self selecting)
    tabMarkersList = document.querySelectorAll('[data-sttb1__tabbedlink="' + tab.dataset.sttb1__tabbednavid + '"]')

    // Iterate and cleanly set up HTML for later output
    tabMarkersList.forEach((marker, markerIndex) => {
        addTabMarkers.push('<li class="tabbedNavigationMarker" >' + markerIndex + '</li>')
    });

    // Wrap all the HTML output together, quick map trick
    addTabMarkersHTML = '<ul class="controlMarkers">'
    addTabMarkersHTML += addTabMarkers.map((e) => e).join('')
    addTabMarkersHTML += '</ul>'

    // Removing return and altering the DOM right here.
    tab.innerHTML = addTabMarkersHTML
}



/*
layoutLeftRightButtons = (tab) => {
}
*/



window.addEventListener('load', listener = () => {
    // First, look through all the Navigation blocks. Without those, no need to do anything.
    const tabbedNavigatorElements = document.querySelectorAll(".sttb1__tabbedNavigator")

    // Getting into each tabbed "scene" get the overall ID to use throughout 
    tabbedNavigatorElements.forEach((element, elementIndex) => {
        // Variables, defines scope and allows testing
        let tabbedNavId, clickValue

        // Get the overall Id and set the first tab value
        // tabbedNavId runs the show, we just keep looking back that Id 
        tabbedNavId = element.dataset.sttb1__tabbednavid
        // ROADMAP Need to add min, max slides
        clickValue  = 0 // Turns into a setting later

        // Global settings
        allTabbedNavigators[tabbedNavId]                 = {}
        allTabbedNavigators[tabbedNavId]['currentIndex'] = 0
        
        // Lay out all the navigation markers starting from the Navigation element
        layoutNavigationMarkers(element)

        // Add left and right buttons 
        // layoutLeftRightButtons(element)
        
        // Set the scene for this tab based on tabbedNavId and starting tab setting
        horizontalTabMovement(tabbedNavId, clickValue)

        // Set up all the click events for the navigation
        tabbedNavigationClick(tabbedNavId)
    })
})