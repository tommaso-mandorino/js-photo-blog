// #region Gallery object
const gallery = {

    // Initialize method
    initialize: function() {
        
        // On DOM content loaded event
        document.addEventListener('DOMContentLoaded', () => {
            
            // Initialize DOM elements properties
            this.captureElements();

            // On gallery close button DOM element click
            this.closeButtonElement.addEventListener('click', () => {

                // Hide gallery
                this.hide();
                
            });

            // On overlay DOM element click
            this.containerElement.addEventListener('click', event => {

                // Get clicked element ID
                const clickedElementID = event.target.id;
                
                if (clickedElementID === 'overlay-top-bar' || clickedElementID === 'overlay-gallery') {

                    // Hide gallery
                    this.hide();

                }
                
            });

            // On overlay DOM element ke
            document.addEventListener('keyup', event => {

                if (event.key === 'Escape') {

                    // Hide gallery
                    this.hide();

                }
                
            });

            // On gallery previous button DOM element click
            this.previousButtonElement.addEventListener('click', () => {

                // Scroll to previous album
                this.previous();
                
            });

            // On gallery previous button DOM element click
            document.addEventListener('keyup', event => {

                // IF arrow left was pressed
                if (event.key === 'ArrowLeft' ) {
                    
                    // IF previous button is NOT disabled
                    if (this.previousButtonElement.disabled === false) {

                        // Scroll to previous album
                        this.previous();

                    }

                }
                
            });
            
            // On gallery next button DOM element click
            this.nextButtonElement.addEventListener('click', () => {
                
                // Scroll to next album
                this.next();
                
            });
            
            // On gallery next button DOM element click
            document.addEventListener('keyup', event => {

                // IF arrow right was pressed
                if (event.key === 'ArrowRight' ) {
                    
                    // IF previous button is NOT disabled
                    if (this.nextButtonElement.disabled === false) {

                        // Scroll to next album
                        this.next();

                    }

                }
                
            });
            
        });
        
    },

    // Capture elements method
    captureElements: function() {

        // #region DOM elements capturing

            // Container
            this.containerElement = document.querySelector('#overlay');

            // Close button
            this.closeButtonElement = document.querySelector('#overlay-close-button');

            // Previous button
            this.previousButtonElement = document.querySelector('#previous-album-button');

            // Album title
            this.albumTitleElement = document.querySelector('#album-title');

            // Album image
            this.albumImageElement = document.querySelector('#album-image');

            // Album date
            this.albumDateElement = document.querySelector('#album-date');

            // Next button
            this.nextButtonElement = document.querySelector('#next-album-button');

        // #endregion DOM elements capturing

    },

    // Show method
    show: function() {

        // Hide body scrollbars
        document.body.style.overflow = 'hidden';

        // Set container DOM element display to flex
        this.containerElement.style.display = 'flex';

        // Request an animation frame to allow transition to be showed
        requestAnimationFrame( () => {
            
            // Set container DOM element opacity to 1
            this.containerElement.style.opacity = '1';

        });

    },

    // Hide method
    hide: function() {

        // Show body scrollbars again
        document.body.style.overflow = 'auto';

        // Set container DOM element opacity to 0
        this.containerElement.style.opacity = '0';

        // Set container DOM element display to none
        this.containerElement.style.display = 'none';

    },

    // Load method
    load: function(albumIndex) {

        // #region Album data extracting

            // Image URL
            const albumImageURL = albumGrid.albums[albumIndex].url;

            // Title
            const albumTitle = albumGrid.albums[albumIndex].title;

            // Date
            const albumDate = albumGrid.albums[albumIndex].date;

        // #endregion Album data extracting

        // #region Album data filling

            // Album title
            this.albumTitleElement.innerText = albumTitle;

            // Album image
            this.albumImageElement.src = albumImageURL;

            // Album date
            this.albumDateElement.innerText = albumDate;

        // #endregion Album data filling

        // Set current album index
        this.currentAlbumIndex = albumIndex;

         // Reset scroll arrows state
        gallery.resetScrollArrows();

        // Check scrolling status to set arrows state
        this.checkScrollArrows();

        // Show gallery
        this.show();

    },

    // Reset scroll arrows status
    resetScrollArrows: function() {

        // Reset previous button element visibility
        this.previousButtonElement.style.visibility = 'visible';

        // Reset next button element visibility
        this.nextButtonElement.style.visibility = 'visible';

        // Enable previous button element
        this.previousButtonElement.disabled = false;

        // Enable next button element
        this.nextButtonElement.disabled = false;

    },

    checkScrollArrows: function() {

        // Get albums objects array lenght
        const albumsNumber = albumGrid.albums.length;

        // IF current album index is the first
        if (this.currentAlbumIndex === 0) {

            // Hide previous button element
            this.previousButtonElement.style.visibility = 'hidden';

            // Disable previous button element
            this.previousButtonElement.disabled = true;

        }
        // ELSE IF current album index is the last
        else if (this.currentAlbumIndex === albumsNumber - 1) {

            // Hide next button element
            this.nextButtonElement.style.visibility = 'hidden';

            // Disable next button element
            this.nextButtonElement.disabled = true;

        }

    },

    // Previous method
    previous: function() {

        // Move gallery image to the right
        this.albumImageElement.style.translate = `100%`;

        // Hide gallery
        this.hide()

        // Excecute this after a defined amount of time
        setTimeout( () => {

            // Load previous album
            this.load(this.currentAlbumIndex - 1);

            // Reset album image original position
            this.albumImageElement.style.translate = `0`;

        }, 300);

    },

    // Next method
    next: function() {

        // Move gallery image to the left
        this.albumImageElement.style.translate = `-100%`;
        
        // Hide gallery
        this.hide()
        
        // Excecute this after a defined amount of time
        setTimeout( () => {
            
            // Load next album
            this.load(this.currentAlbumIndex + 1);
            
            // Reset album image original position
            this.albumImageElement.style.translate = `0`;

        }, 300);

    }

};
// #endregion Gallery object

// ----------------------------------------------------------------------------------------------------

// #region Album grid object
const albumGrid = {

    // Set album grid DOM element selector
    albumGridSelector: '#album-grid',

    // Albums objects array
    albums: [],

    // Fetch albums method
    fetch: function(endpointURL) {

        // Start fetching albums from endpoint
        fetch(endpointURL)

            // Convert response to JSON
            .then(response => response.json())

            // Process response
            .then(data => {

                // For each album in data objects array
                data.forEach(album => {
                    
                    // Push it into albums objects array
                    this.albums.push(album);

                });

                // Load albums into HTML
                this.load();

            })

            // Catch possible error and log it in the console
            .catch(error => console.error(error));

    },

    // Load albums method
    load: function() {

        // Get album grid DOM element
        const albumGridElement = document.querySelector(this.albumGridSelector);

        // For each album in albums objects array
        this.albums.forEach( album => {

            // Get album ID
            const albumID = album.id;

            // Get album image URL
            const albumImageURL = album.url;

            // Get album title
            const albumTitle = album.title;

            // Get album date
            const albumDate = album.date;

            // Create new HTML code for an album card
            const newCardHTML =
            `
            <!-- #region Album column -->
            <div id="id-${albumID}" class="responsive-column">

                <!-- #region Card -->
                <section class="card">

                    <!-- Pin image -->
                    <img class="pin-image" src="./assets/img/pin.svg" alt="Pin image">

                    <!-- Album image -->
                    <img class="card-image" src="${albumImageURL}" alt="Foto ${albumTitle}">

                    <!-- Album title -->
                    <h2 class="card-title">${albumTitle}</h2>

                    <!-- Album date -->
                    <span class="card-date">${albumDate}</span>

                </section>
                <!-- #endregion Card -->

            </div>
            <!-- #endregion Album column -->
            `;

            // Inject card HTML code into album grid DOM element
            albumGridElement.insertAdjacentHTML('beforeend', newCardHTML);

            // Get new card DOM element
            const newCardElement = document.querySelector(`#id-${albumID}`);

            // Add click event listener to it
            newCardElement.addEventListener('click', () => {

                // Get album index for array scrolling
                // (-1 beacause array starts from 0 while fetched IDs starts from 1)
                const albumIndex = albumID - 1;

                // Set current album index
                gallery.currentAlbumIndex = albumIndex;

                // Reset scroll arrows state
                gallery.resetScrollArrows();

                // Check scrolling status to set arrows state
                gallery.checkScrollArrows();

                // Load album into gallery
                gallery.load(albumIndex);

            });

        });

    }
    
}
// #endregion Album grid object

// ----------------------------------------------------------------------------------------------------

// Initialize gallery
gallery.initialize();

// Fetch album data from endpoint
albumGrid.fetch('https://lanciweb.github.io/demo/api/pictures/');