// #region Constants declaration section

    // Endpoint URL
    const ENDPOINT_URL = 'https://lanciweb.github.io/demo/api/pictures/';

    // #region DOM elements capturing

        // Album DOM element
        const albumElement = document.getElementById('album');

        // #region Overlay DOM elements

            // Overlay DOM element
            const overlayElement = document.getElementById('overlay');

            // Overlay close button DOM element
            const overlayCloseButtonElement = document.getElementById('overlay-close-button');

            // Overlay image DOM element
            const overlayImageElement = document.getElementById('overlay-image');

        // #region Overlay DOM elements

    // #endregion DOM elements capturing

// #region Constants declaration section



// #region Event listener adding section

    // Album click event listener adding
    albumElement.addEventListener('click', event => {

        // Get clicked element
        const clickedElement = event.target;

        // IF clicked element is a card image
        if (clickedElement.classList.contains('card-image')) {

            // Show clicked picture
            overlayImageElement.src = clickedElement.src;

            // Show clicked picture
            overlayImageElement.alt = `${clickedElement.alt} ingrandita`;

            // Hide scrollbars
            document.body.style.overflow = 'hidden';

            // Set display to block
            overlayElement.style.display = 'block';

            // Force overlay element reflow
            void overlayElement.offsetHeight;

            // Set opacity to 1
            overlayElement.style.opacity = '1';

        }

    },this);

    // Overlay close button click event listener adding
    overlayCloseButtonElement.addEventListener('click', event => {

        // Show scrollbars again
        document.body.style.overflow = 'auto';

        // Set opacity to 0
        overlayElement.style.opacity = '0';

        // Set display to none
        overlayElement.style.display = 'none';

    });

// #endregion Event listener adding section



// #region Script logic

    // Empty picture objects array declaration
    let pictureObjectsArray = [];

    // Fetch pictures from endpoint url,
    // place them into picture objects array
    // and then invoke callback function for loading cards
    fetchPictureData(ENDPOINT_URL, pictureObjectsArray, loadCards);

// #region Script logic



// #region Function declaration section

    /**
     * Fetch pictures data
     * @param {string} endpointURL Endpoint URL from which to fetch pictures data
     * @param {Array} targetObjectsArray Array to which to assign fetched results
     * @callback callbackFunction Callback function to invoke after fetching all data
     */
    function fetchPictureData(endpointURL, targetObjectsArray, callbackFunction) {

        // Start fetching cards from endpoint
        fetch(endpointURL)

            // Convert response to JSON
            .then(response => response.json())

            // Process response
            .then(data => {

                // Assign fetched data to card array
                targetObjectsArray = data;

                // Invoke callback function
                callbackFunction(targetObjectsArray);

            })

            // Catch possible error and log it in the console
            .catch(error => console.error(error));

    }



    /**
     * Load cards
     * @param {Array} cardsArray Cards array to parse
     */
    function loadCards(cardsArray) {

        // Album DOM element
        const albumElement = document.getElementById('album');

        // Empty album HTML code initialization
        let albumHTML = '';

        // For each card in card array
        cardsArray.forEach(album => {

            // Album image URL
            const albumImageURL = album.url;

            // Album title
            const albumTitle = album.title;

            // Album date
            const albumDate = album.date;

            // Add new card to album HTML
            albumHTML +=
                `
                <!-- #region Album column -->
                <div class="responsive-column">

                    <!-- #region Card -->
                    <section class="card">

                        <!-- Pin image -->
                        <img class="pin-image" src="./assets/img/pin.svg" alt="Pin image">

                        <!-- Card image -->
                        <img class="card-image" src="${albumImageURL}" alt="Foto ${albumTitle}">

                        <!-- Card title -->
                        <h2 class="card-title">${albumTitle}</h2>

                        <!-- Card date -->
                        <span class="card-date">${albumDate}</span>

                    </section>
                    <!-- #endregion Card -->

                </div>
                <!-- #endregion Album column -->
                `;

        });

        // Inject album HTML code into album element
        albumElement.innerHTML = albumHTML;

    }

// #endregion Function declaration section