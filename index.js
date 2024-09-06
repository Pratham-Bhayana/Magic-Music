document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio();
    const playerContainer = document.querySelector('.music-player');
    const playButton = document.querySelector('.play');
    const pauseButton = document.querySelector('.pause');
    const nextButton = document.querySelector('.next');
    const previousButton = document.querySelector('.previous');
    const shuffleButton = document.querySelector('.shuffle');
    const repeatButton = document.querySelector('.repeat');
    const progressBar = document.querySelector('#progress-bar');
    const currentTimeDisplay = document.querySelector('#current-time');
    const durationDisplay = document.querySelector('#duration');
    const songNameDisplay = document.querySelector('.song-name');
    const artistNameDisplay = document.querySelector('.artist-name');
    const searchBar = document.querySelector('#search-bar');

    let currentTrackIndex = 0;
    let isShuffling = false;
    let isRepeating = false;

    function showPlayer() {
        playerContainer.style.display = 'block'; // Make the player visible
    }

    // Define a playlist with song objects
    const playlist = [
        {
            src: 'songs/01-Bones-(Mr-Jat.in).mp3',
            name: 'Bones',
            artist: 'Imagine Dragons',
            thumbnail: 'img/bones.jpg'
        },
        {
            src: 'songs/02- Death Grips - Get Got.mp3',
            name: 'Get Got',
            artist: 'Death Grips',
            thumbnail: 'img/get got.jpg.jpg'
        },
        {

        src: '/songs/03-Chrome Sparks - All There Is (Feat. Steffaloo).mp3',
            name: 'All There Is',
            artist: 'Chrome Sparks',
            thumbnail: '/img/chrome sparks.jpg.jpg'
        },

        {

            src: '/songs/04-Dads - Shit Twins.mp3',
                name: 'Dads',
                artist: 'Shit twins',
                thumbnail: '/img/dads.jpg'
            },

            {

                src: '/songs/Dads - Shit Twins.mp3',
                    name: 'Dads',
                    artist: 'Shit twins',
                    thumbnail: '/img/dads.jpg'
                },

                {

                    src: '/songs/Dads - Shit Twins.mp3',
                        name: 'Dads',
                        artist: 'Shit twins',
                        thumbnail: '/img/dads.jpg'
                    },

                    {

                        src: '/songs/07-Death Grips - Guillotine.mp3',
                            name: 'Guillotine',
                            artist: 'Death Grips',
                            thumbnail: '/img/Guillotine_DG.jpg'
                        },

                        {

                            src: '/songs/08-Death Grips - No Love.mp3',
                                name: ' No Love',
                                artist: 'Death Grips',
                                thumbnail: '/img/death grip no love.jpg'
                            },

                            {
                                src: '/songs/09-Dillon - Thirteen Thirtyfive.mp3',
                                    name: 'Thirteen Thirtyfive',
                                    artist: 'Dillon',
                                    thumbnail: '/img/dillon.jpg'
                                },

                                {
                                src: '/songs/10-Glowworm - Periphescence.mp3',
                                        name: 'Periphescence',
                                        artist: 'Glowworm',
                                        thumbnail: '/img/glowwarm.jpg'
                                    },

                                {
                                        src: '/songs/11-Graveyard - Endless Night.mp3',
                                            name: 'Endless Night',
                                            artist: 'Graveyard',
                                            thumbnail: '/img/endless night.jpg'
                                     },

                     {
                                            src: '/songs/12-Mac DeMarco - Rock and Roll Night Club.mp3',
                                                name: 'Rock and Roll Night Club',
                                                artist: 'Mac DeMarco',
                                             thumbnail: '/img/rock and roll.jpg'
                     },

                     {
                        src: '/songs/13-Nils Frahm - Fa.mp3',
                            name: 'Fa',
                            artist: 'Nils Frahm',
                            thumbnail: '/img/nils fa.jpg'
                        },

                        {
                            src: '/songs/14-Nils Frahm - Si.mp3',
                                name: 'Si',
                                artist: 'Nils Frahm ',
                                thumbnail: '/img/si.jpg '
                            },

                            {
                                src: '/songs/15-Poets of the Fall - Maybe Tomorrow is a Better Day.mp3',
                                    name: 'Maybe Tomorrow is a Better Day',
                                    artist: 'Poets of the Fall',
                                    thumbnail: '/img/poets of the fall.jpg'
                                },

                                {
                                    src: '/songs/16-TV Girl - Birds Dont Sing.mp3',
                                        name: 'Bird Dont Sing',
                                        artist: 'Tv Girl',
                                        thumbnail: '/img/birds dont sing.jpg'
                                    },
                                    {
                                        src: '/songs/17-Vildhjarta - Traces.mp3',
                                            name: 'Traces',
                                            artist: 'Vildhjarta',
                                            thumbnail: '/img/traces.jpg'
                                        },  
                                        
                                        {
                                            src: '/songs/18-Blue Sky Black Death - Where Do We Go.mp3',
                                                name: 'Where Do We Go',
                                                artist: 'Blue Sky Black Death',
                                                thumbnail: '/img/Blue Sky Black Death.jpg'
                                            },
                                            {
                                                src: '/songs/',
                                                    name: '',
                                                    artist: '',
                                                    thumbnail: ''
                                                },

        // Add other songs with correct paths
    ];

    // Function to load and play a track
    function loadTrack(index) {
        if (index < 0 || index >= playlist.length) return;

        const track = playlist[index];
        audio.src = track.src;
        songNameDisplay.textContent = track.name;
        artistNameDisplay.textContent = track.artist;

        // When the audio metadata is loaded, update the duration display
        audio.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(audio.duration);
            updateProgressBar();
        });

        audio.play().catch(error => console.error('Error playing audio:', error));
    }

    // Function to update progress bar and time displays
    function updateProgressBar() {
        if (audio.duration) {
            progressBar.max = audio.duration;
            progressBar.value = audio.currentTime;

            // Update time display
            currentTimeDisplay.textContent = formatTime(audio.currentTime);

            // Update progress bar on user interaction
            progressBar.addEventListener('input', () => {
                audio.currentTime = progressBar.value;
            });

            // Update progress bar and time display while playing
            audio.addEventListener('timeupdate', () => {
                progressBar.value = audio.currentTime;
                currentTimeDisplay.textContent = formatTime(audio.currentTime);
            });
        }
    }

    // Helper function to format time
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Function to handle song card click
    function handleSongCardClick(event) {
        const card = event.currentTarget;
        const songIndex = Array.from(document.querySelectorAll('.genre-1, .genre-2, .genre-3, .genre-4, .genre-5, .genre-6')).indexOf(card);

        if (songIndex !== -1) {
            currentTrackIndex = songIndex;
            loadTrack(currentTrackIndex);
            showPlayer();
        }
    }

    // Add event listeners to song cards
    const songCards = document.querySelectorAll('.genre-1, .genre-2, .genre-3, .genre-4, .genre-5, .genre-6');
    songCards.forEach(card => {
        card.addEventListener('click', handleSongCardClick);
    });

    // Event listeners for buttons
    playButton.addEventListener('click', () => {
        if (audio.src) {
            audio.play().catch(error => console.error('Error playing audio:', error));
        }
    });

    pauseButton.addEventListener('click', () => {
        audio.pause();
    });

    nextButton.addEventListener('click', () => {
        if (playlist.length > 0) {
            if (isShuffling) {
                currentTrackIndex = Math.floor(Math.random() * playlist.length);
            } else {
                currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            }
            loadTrack(currentTrackIndex);
        }
    });

    previousButton.addEventListener('click', () => {
        if (playlist.length > 0) {
            if (isShuffling) {
                currentTrackIndex = Math.floor(Math.random() * playlist.length);
            } else {
                currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            }
            loadTrack(currentTrackIndex);
        }
    });

    shuffleButton.addEventListener('click', () => {
        isShuffling = !isShuffling;
        shuffleButton.classList.toggle('active', isShuffling);
    });

    repeatButton.addEventListener('click', () => {
        isRepeating = !isRepeating;
        repeatButton.classList.toggle('active', isRepeating);
    });

    // Handle the end of the track
    audio.addEventListener('ended', () => {
        if (isRepeating) {
            loadTrack(currentTrackIndex);
        } else {
            nextButton.click();
        }
    });

    // Function to filter songs based on search query
    function filterSongs(query) {
        const lowerCaseQuery = query.toLowerCase();
        songCards.forEach(card => {
            const songName = card.querySelector('h3').textContent.toLowerCase();
            const artistName = card.querySelector('.artist').textContent.toLowerCase();
            if (songName.includes(lowerCaseQuery) || artistName.includes(lowerCaseQuery)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Event listener for search bar input
    searchBar.addEventListener('input', (event) => {
        filterSongs(event.target.value);
    });
});
 

document.addEventListener("DOMContentLoaded", function () {
    // Ensure ScrollTrigger plugin is registered
    gsap.registerPlugin(ScrollTrigger);

    // Smooth fade-in for the background image
    gsap.from(".bg", {
        opacity: 0,
        duration: 2,
        ease: "power2.out"
    });

    // Cool animation for the h1 inside .content
    gsap.from(".content h1", {
        scale: 0.5,
        rotation: 15,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.75)",
        scrollTrigger: {
            trigger: ".content",
            start: "top 20%",
            end: "top 80%",
            toggleActions: "play none none reverse",
            markers: false // Set to true for debugging
        }
    });

    // Piano-style animation for each letter
    const letters = document.querySelectorAll(".content h1 span");
    gsap.fromTo(
        letters,
        { y: "-100%", opacity: 0 }, // Start position (above the screen, hidden)
        {
            y: "0%",
            opacity: 1,
            duration: 0.4,
            ease: "bounce.out", // Bounce effect for a piano key press feel
            stagger: {
                each: 0.1,
                from: "start", // Start stagger from the first letter
            },
            scrollTrigger: {
                trigger: ".content",
                start: "top 20%",
                end: "top 80%",
                toggleActions: "play none none reverse",
                markers: false, // Set to true for debugging
            }
        }
    );

    // Slide down the header with easing
    gsap.from("header", {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    });

    // Fade-in and slide for the content section
    gsap.from(".content", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".content",
            start: "top 20%",
            end: "top 80%",
            toggleActions: "play none none reverse",
            scrub: 1,
            markers: false // Set to true for debugging
        }
    });

    // Left-side cards slide in with stagger effect
    gsap.from(".left-side .cards > div", {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 1,
        stagger: 0.3
    });

    // Right-side elements slide in
    gsap.from(".right-side .title", {
        x: 200,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 1
    });

    // Category circles scale in smoothly
    gsap.from(".category .cat-cicrle-1", {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        delay: 1.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".cards",
            start: "top 50%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            scrub: 1,
            markers: false // Set to true for debugging
        }
    });

    // Scroll animations using ScrollTrigger
    gsap.from(".genre-1, .genre-2, .genre-3, .genre-4, .genre-5, .genre-6", {
        scrollTrigger: {
            opacity: 0,
            scale: 0,
            trigger: ".cards",
            start: "top 20%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            scrub: 1,
            markers: false // Set to true for debugging
        },
        y: 50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2
    });

    // Footer genres animation
    gsap.from(".ft .genre", {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".ft",
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none reverse",
            markers: false // Set to true for debugging
        }
    });
});

gsap.registerPlugin(ScrollTrigger);

gsap.from("#feat", {
    scale: 0,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.7)",
    delay: 1.5,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".three",
        start: "top 80%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
        scrub: 1,
        markers: false // Set to true for debugging
    }
});
