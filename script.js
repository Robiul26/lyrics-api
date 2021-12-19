let searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const itemListBox = document.getElementById("lyric-list");
const lyricsBox = document.getElementById("lyrics-box");


// searchInput.addEventListener("keyup", function () {
//     console.log(searchInput.value);
// });
searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    lyricsBox.innerHTML = '';
    const searchValue = searchInput.value.trim();
    if (!searchValue) {
        alert("Nothing to search!");
    } else {

        getSearch(searchValue);

    }


});
// Get Search Function
function getSearch(searchValue) {
    fetch(`https://api.lyrics.ovh/suggest/${searchValue}`)
        .then(res => res.json())
        .then(data => {
            data = data.data.slice(0, 10);
            searchInput.value = "";
            itemListBox.innerHTML = "";
            data.map(lyric => {
                let tname = lyric.artist.name;
                // console.log(lyric.title);
                itemListBox.innerHTML += `
            <div class="item">
            <div class="item-text-body">
                <img src="http://e-cdn-images.dzcdn.net/images/cover/${lyric.md5_image}/500x500-000000-80-0-0.jpg"
                    alt="">
                <div class="item-text">
                    <h2>${lyric.title}</h2>
                    <p>Album: ${lyric.album.title}</p>
                    <p>By: ${lyric.artist.name}</p>
                    <audio controls>
                    <source src="horse.ogg" type="audio/ogg">
                    <source src="${lyric.preview}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                </div>
              
            </div>
            <button class="btn get-lyric-btn" data-title="${lyric.title}" data-artist="${lyric.artist.name}">Get Lyrics</button>
        </div>
            `;
            });
        });
}

// Get Lyrics function
itemListBox.addEventListener("click", function (e) {
    const clickedElement = e.target;
    lyricsBox.innerHTML = '';
    if (clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute("data-artist");
        const title = clickedElement.getAttribute("data-title");
        fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                lyricsBox.innerHTML = `
                <h2>${title}</h2>
                <p>${data.lyrics}</p>
                `;
            })
            .catch(error => alert("please tray again later!"));
    }
});