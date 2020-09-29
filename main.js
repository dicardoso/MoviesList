const api = 'https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&page='
const imgpath = "https://image.tmdb.org/t/p/w1280";
const searchpath = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const imgdefault = 'https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-retro-cinema-camera-icon-flat-style-png-image_1811779.jpg'

const buttons = Array.from(document.querySelectorAll('button'))

const main = document.querySelector('main')
const footer = document.querySelector('footer')
const page = document.querySelector('.page')

const logo = document.getElementById('logo')
const form = document.getElementById('form')
const search = document.getElementById('search')


async function getMovies(url) {
    console.log(url)
    const resp = await fetch(url)
    const { results } = await resp.json()

    console.log(results)
    showMovies(results)
}

function getClassByRate(rate) {
    if (rate >= 8) return 'green'
    else if (rate >= 5) return 'orange'
    else return 'red'
}

function getImage(poster_path) {
    if (poster_path) {
        return imgpath + poster_path
    }
    return imgdefault
}

function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach(movie => {
        if(movie.vote_count > 10){
            main.insertAdjacentHTML('beforeend', `
            <div class="movie">
                <img src="${getImage(movie.poster_path)}" alt="${movie.title}">   
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class="${getClassByRate(movie.vote_average+1)}">${movie.vote_average}</span>
                </div>  
            </div>
            `)
        }
    })
    //footer.setAttribute('style', 'visibility:visible;')
}

buttons.forEach(btn => {
    btn.addEventListener('click', (evt) => {
        var target = evt.target.innerHTML
        var pageNumber = parseInt(page.innerHTML)
        if (target == '&gt;') {
            pageNumber += 1
        } 
        else if (pageNumber > 1) {
            pageNumber -= 1
        }
        page.innerHTML = pageNumber
        window.scrollTo(0, 0);
        getMovies(api+page.innerHTML)   
    })
})

form.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const searchTerm = search.value
    
    if(searchTerm){
        getMovies(searchpath + searchTerm)
        footer.setAttribute('style', 'visibility:hidden;')
        search.value = ''
    }
})

logo.addEventListener('click', () => location.reload())

search.addEventListener('keyup', (e) => {
    var searchTerm = search.value
    if(searchTerm){
        getMovies(searchpath + searchTerm)
        footer.setAttribute('style', 'visibility:hidden;')
    }
})

getMovies(api+page.innerHTML)