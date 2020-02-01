let subreddits = ['dankmemes', 'memes']

window.addEventListener('load', () => {
    const input = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    const expand = () => {
        searchBtn.classList.toggle("close");
        input.classList.toggle("square");
    };

    searchBtn.addEventListener("click", expand);

    $('.carousel').carousel({
        interval: 2000,
        pause: 'hover'
    })
    let i = 0
    subreddits.forEach(subreddit => {
        let api = 'https://www.reddit.com/r/' + subreddit + '/top.json?limit=5'
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                for (const element of data.data.children) {
                    addSlides(element, i)
                    i++
                }
                addToCarousel();
            });

    })
});


function getPosts() {
    event.preventDefault();
    document.getElementById('carousel-inner').innerHTML = " ";
    document.getElementById('carousel-indicators').innerHTML = " ";
    let i = 0
    let subreddit = document.getElementById("search-input").value;
    console.log(subreddit)
    let api = 'https://www.reddit.com/r/' + subreddit + '/top.json?limit=5'
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (const element of data.data.children) {
                addSlides(element, i)
                i++
            }
            addToCarousel();
        });
}

function addSlides(element, i) {
    let share = "https://www.reddit.com" + element.data.permalink;
    $('<div class="carousel-item"><div class="post" id="post' + i + '"><div class="overlay"><div class= "items"></div><div class="items head"><p>' + element.data.title + '</p></div><div class="items details"><p>By: <span id="posted-by">' + element.data.author + '</span></p><p>In: <span id="posted-in">' + element.data.subreddit + '</span></p> <p class="upvotes"><i class="fas fa-arrow-alt-circle-up"></i><span>' + element.data.ups + '</span></p></div><div class="items share"><a href="' + share + '"><i class="fas fa-share"></i></a></div></div ></div >  </div>').appendTo('.carousel-inner');
    $('<li data-target="#post-carousel" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators')
    $('#post' + i).css('backgroundImage', 'url(' + element.data.url + ')');
}
function addToCarousel() {
    $('.carousel-item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');
    $('#post-carousel').carousel();
}