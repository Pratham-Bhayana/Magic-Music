document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio();
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

    // Define a playlist with song objects
    const playlist = [
        {
            src: 'D:\new\Magic Music\songs\Bones-(Mr-Jat.in).mp3',
            name: 'Bones',
            artist: 'Imagine Dragons',
            thumbnail: 'D:/new/Magic Music/img/bones.jpg'
        },
        {
            src: 'path/to/song2.mp3',
            name: 'Falling',
            artist: 'Trevor Danial',
            thumbnail: 'D:/new/Magic Music/img/falling.jpg'
        },
        {
            src: 'path/to/song3.mp3',
            name: 'Let me down slowly',
            artist: 'Alec Benjamin',
            thumbnail: 'D:/new/Magic Music/img/let me down.jpg'
        },
        {
            src: 'path/to/song4.mp3',
            name: 'Safari',
            artist: 'Sarena',
            thumbnail: 'D:/new/Magic Music/img/safari.jpg'
        },
        {
            src: 'path/to/song5.mp3',
            name: 'Believer',
            artist: 'Imagine Dragons',
            thumbnail: 'D:/new/Magic Music/img/beliver.jpg'
        },
        {
            src: 'path/to/song6.mp3',
            name: 'Cheap Thrills',
            artist: 'Sia',
            thumbnail: 'D:/new/Magic Music/img/cheap.png'
        }
    ];

    // Function to load and play a track
    function loadTrack(index) {
        if (index < 0 || index >= playlist.length) return;

        const track = playlist[index];
        audio.src = track.src;
        songNameDisplay.textContent = track.name;
        artistNameDisplay.textContent = track.artist;
        audio.load();
        audio.play().catch(error => console.error('Error playing audio:', error));
        updateProgressBar();
    }

    // Function to update progress bar
    function updateProgressBar() {
        if (audio.duration) {
            progressBar.max = audio.duration;
            progressBar.value = audio.currentTime;

            const formatTime = (seconds) => {
                const minutes = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
            };

            currentTimeDisplay.textContent = formatTime(audio.currentTime);
            durationDisplay.textContent = formatTime(audio.duration);

            progressBar.addEventListener('input', () => {
                audio.currentTime = progressBar.value;
            });

            audio.addEventListener('timeupdate', () => {
                progressBar.value = audio.currentTime;
                currentTimeDisplay.textContent = formatTime(audio.currentTime);
            });
        }
    }

    // Function to handle song card click
    function handleSongCardClick(event) {
        const card = event.currentTarget;
        const songIndex = Array.from(document.querySelectorAll('.genre-1, .genre-2, .genre-3, .genre-4, .genre-5, .genre-6')).indexOf(card);

        if (songIndex !== -1) {
            currentTrackIndex = songIndex;
            loadTrack(currentTrackIndex);
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
    // Smooth fade-in for the background image
    gsap.from(".bg", {
        opacity: 0,
        duration: 2,
        ease: "power2.out", // Smooth easing
    })
        // Cool animation for the h1 inside .content
        gsap.from(".content h1", {
            scale: 0.5,          // Start from half the size
            rotation: 15,        // Slight rotation
            opacity: 0,          // Start fully transparent
            duration: 1.5,       // Animation duration
            ease: "elastic.out(1, 0.75)", // Elastic bounce effect
            scrollTrigger: {
                trigger: ".content",
                start: "top 80%", // Animation starts when .content reaches 80% of the viewport
                toggleActions: "play none none none",
                markers: false,   // Set to true to see scroll markers for debugging
            }
        
    });
    

    // Slide down the header with easing
    gsap.from("header", {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out", // Smooth easing
    });

    // Fade-in and slide for the content section
    gsap.from(".content", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".content",
            start: "top 80%", // Adjusts when the animation starts (when top of .content reaches 80% of the viewport)
            end: "top 50%", // Ends the animation when .content reaches 50% of the viewport
            toggleActions: "play none none none", // Play animation on enter
            scrub: 1, // Smooth scrolling effect
        },
});

    // Left-side cards slide in with stagger effect
    gsap.from(".left-side .cards > div", {
        
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 1, // Adjusted delay
        stagger: 0.3, // More time between animations
    });

    // Right-side elements slide in
    gsap.from(".right-side .title", {
        x: 200,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 1, // Matches timing with left-side
    });

    // Category circles scale in smoothly
    gsap.from(".category .cat-cicrle-1", {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        delay: 1.5, // Matches timing with other elements
        stagger: 0.2, // Stagger time adjusted for smooth flow
        
        scrollTrigger: {
            trigger: ".cards",
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
            markers: false, // Use markers for debugging (optional)
            scrub: 1, // Smooth scrolling effect
        },
    });
});

// Scroll animations using ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

gsap.from(".genre-1, .genre-2, .genre-3, .genre-4, .genre-5, .genre-6", {
    scrollTrigger: {
        trigger: ".cards",
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none none",
        markers: false, // Use markers for debugging (optional)
        scrub: 1, // Smooth scrolling effect
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out", // Smooth easing
    stagger: 0.2, // Stagger time adjusted
});

gsap.from(".ft .genre", {
opacity :0,
});