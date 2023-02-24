let movieNameRef = document.getElementById('movie-name');
let searchBtn = document.getElementById('search-btn');
let result = document.getElementById('result');

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  // Caso input esteja vazio
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Pesquisar nome do filme</h3>`;
  }

  // Caso o input não esteja vazio
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //Se o filme existir no banco de dados
        if (data.Response == 'True') {
          result.innerHTML = `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="img/star-icon.svg">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(',').join('</div><div>')}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            `;
        }

        //Caso o filme não exista no banco de dados
        else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      //Se o erro acontecer
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Pesquisa inválida</h3>`;
      });
  }
};

searchBtn.addEventListener('click', getMovie);
window.addEventListener('load', getMovie);
