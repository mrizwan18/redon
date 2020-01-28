let api = 'https://www.reddit.com/r/nsfw/search.json?q=nsfw&sort=top&limit=1'

window.addEventListener('load', () => {
    $('.carousel').carousel({
        interval: 2000,
        pause: 'hover'
    })
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.data.children.forEach(element => {
                console.log(element.data)
            });
        })
})