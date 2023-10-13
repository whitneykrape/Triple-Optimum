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

console.log('Tabbed Loaded 0.026')

// Global status of all Tabs accessible later .
let allTabbedNavigators = {}



horizontalTabMovement = (tabbedNavId) => {
    // Variables, defines scope and allows testing.
    let tabbedArray, clickValue, newIndex, newIndexTranslate

    // From the "parent" tabbedNavId get all the content with that Id.
    tabbedArray = document.querySelectorAll('[data-sttb1__tabbedlink="' + tabbedNavId + '"]')

    // Get the (recently updated) index.
    clickValue = allTabbedNavigators[tabbedNavId]['currentIndex']

    // Set the new properties for each content tab.
    tabbedArray.forEach((content, contentIndex) => {
        // Calculate the new index and and how far to move for each content piece.
        newIndex          = contentIndex - clickValue
        newIndexTranslate = 100 * (newIndex)
        newIndex          = (newIndex).toString()

        // Reset and then set className and style.
        content.className = content.className.replace(/transform([\-0-9]*)/, '')
        content.classList.add("transform" + newIndex)
        content.style.transform = `translateX(${newIndexTranslate}%)`
    })
}



tabbedNavigationClick = (tabbedNavId) => {
    // Variables, defines scope and allows testing.
    let navigationMarkers, clickValue

    // Starting from the tabbedNavId get the parent then children for that tabbed group.
    navigationMarkers = document.querySelectorAll('[data-sttb1__tabbednavid="' + tabbedNavId + '"] .tabbedNavigationMarker')

    // Iterate through what was just chosen above.
    navigationMarkers.forEach((clickElement) => {
        // Clear out the events incase this is a reload or other restart.
        clickElement.removeEventListener("click", (event) => {})

        // Set out the new events
        clickElement.addEventListener("click", (event) => {
            console.log('eventTabbedStart')
            console.log(event)

            // Get what was clicked on and set the global object.
            // ROADMAP move the click data to a data prop (need to set those first.)
            clickValue = clickElement.dataset.markerindex
            allTabbedNavigators[tabbedNavId]['currentIndex'] = clickValue
            // ISSUE!
            // If the event doesn't finish running properly, we've set an unconfirmed Global index.
            // Need a callback and error handling. 

            // Run the movement event.
            horizontalTabMovement(tabbedNavId)

            console.log('eventTabbedEnd')
        })
    })
}


        
layoutNavigationMarkers = (tab) => {
    // Variables, defines scope and allows testing.
    let tabbedNavId, tabMarkersList

    // Since we are starting from the tab content, need to get the tabbedNavId instead of it passing in.
    tabbedNavId = tab.dataset.sttb1__tabbednavid 

    // Get all the content with this tabs id (self selecting.)
    tabMarkersList = document.querySelectorAll('[data-sttb1__tabbedlink="' + tabbedNavId + '"]')

    // Get all the navigation items with this tabs id (self selecting.)
    tabSubMarkersList = document.querySelector('[data-sttb1__tabbednavid="' + tabbedNavId + '"]').querySelectorAll('img,li')

    // Loop through the content and update the navigation accordingly.
    tabMarkersList.forEach((element, elementIndex) => {
        // Get the id set on the back-end.
        id = element.dataset.sttb1__tabbedlinksubelement
        id = id.split('#')
        id = id[1]

        // Update the display based on settings.
        // tabSubMarkersList[id].innerHTML

        // Add individual ids, overall content id, and the starter class to link to content.
        tabSubMarkersList[id].dataset.markerindex = id
        tabSubMarkersList[id].dataset.sttb1__tabbednavid = tabbedNavId
        tabSubMarkersList[id].classList.add('tabbedNavigationMarker')
    })
}



/*
layoutWrapAround = (tab) => {
}
*/



/*
layoutLeftRightButtons = (tab) => {
}
*/



window.addEventListener('load', listener = () => {
    // First, look through all the Navigation blocks. Without those, no need to do anything.
    const tabbedNavigatorElements = document.querySelectorAll(".sttb1__tabbedNavigator")

    // Getting into each tabbed "scene" get the overall ID to use throughout. 
    tabbedNavigatorElements.forEach((element, elementIndex) => {
        // Variables, defines scope and allows testing.
        let tabbedNavId, clickValue

        // Get the overall Id and set the first tab value.
        // tabbedNavId runs the show, we just keep looking back that Id.
        tabbedNavId = element.dataset.sttb1__tabbednavid
        // ROADMAP Need to add min, max slides.
        clickValue  = 0 // Turns into a setting later.

        // Global settings.
        allTabbedNavigators[tabbedNavId]                  = {}
        allTabbedNavigators[tabbedNavId]['currentIndex']  = 0
        allTabbedNavigators[tabbedNavId]['markerDisplay'] = "&middot;"
        
        // Lay out all the navigation markers starting from the Navigation element (in case we want more or to edit the element.)
        layoutNavigationMarkers(element)

        // Add wrap around so there is a preview to the left and right of cycling tabs (event edit also?)
        // layoutWrapAround(element)

        // Add left and right buttons.
        // layoutLeftRightButtons(element)
        
        // Set the scene for this tab based on tabbedNavId and starting tab setting.
        horizontalTabMovement(tabbedNavId, clickValue)

        // Set up all the click events for the navigation.
        tabbedNavigationClick(tabbedNavId)
    })
})