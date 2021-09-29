const rp = require("request-promise");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const getMovieAndActor = async () => {
  let page = localStorage.getItem("page") || 1;
  const requestOptionsMovie = {
    method: "GET",
    uri: `${process.env.API_URL}/4/discover/movie?sort_by=popularity.desc&page=${page}`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    json: true,
    gzip: true,
  };

  localStorage.setItem("page", parseInt(page, 10) + 1);

  const movie = await rp(requestOptionsMovie)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("API call error:", err.message);
      return err.message;
    });
  const pathPoster = `https://image.tmdb.org/t/p/w500/${movie.results[0].poster_path}`;

  const requestOptionsActor = {
    method: "GET",
    uri: `${process.env.API_URL}/3/movie/${movie.results[0].id}/credits`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    json: true,
    gzip: true,
  };
  const actor = await rp(requestOptionsActor)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("API call error:", err.message);
      return err.message;
    });
  const maxPopularity = Math.max.apply(
    Math,
    actor.cast.map(function (o) {
      return o.popularity;
    })
  );
  const actorMaxPopularity = actor.cast.find(function (o) {
    return o.popularity == maxPopularity;
  });
  const actorImage =
    `https://image.tmdb.org/t/p/w500/${actorMaxPopularity.profile_path}` || "";

  let pageActor = localStorage.getItem("pageActor") || 1;
  const requestOptionsRandomActor = {
    method: "GET",
    uri: `${process.env.API_URL}/3/person/popular?page=${pageActor}`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    json: true,
    gzip: true,
  };
  localStorage.setItem("pageActor", parseInt(page, 10) + 1);
  const actorRandom = await rp(requestOptionsRandomActor)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("API call error:", err.message);
      return err.message;
    });
  const actors = [
    {
      name: actorMaxPopularity.name,
      photo: actorImage,
      id: actorMaxPopularity.id,
    },
    {
      name: actorRandom.results[0].name,
      photo:
        `https://image.tmdb.org/t/p/w500/${actorRandom.results[0].profile_path}` ||
        "",
      id: actorRandom.results[0].id,
    },
    {
      name: actorRandom.results[1].name,
      photo:
        `https://image.tmdb.org/t/p/w500/${actorRandom.results[1].profile_path}` ||
        "",
      id: actorRandom.results[1].id,
    },
    {
      name: actorRandom.results[2].name,
      photo:
        `https://image.tmdb.org/t/p/w500/${actorRandom.results[2].profile_path}` ||
        "",
      id: actorRandom.results[2].id,
    },
  ];
  const moviePlay = [
    { id: movie.results[0].id },
    { name: movie.results[0].original_title },
    { photo: pathPoster },
  ];
  console.log(actors[0]);
  const numberRandom = Math.floor(Math.random() * 4);
  return [moviePlay, actors[numberRandom]];
};

const checkMovieAndActor = async (id_film, id_actor) => {
  let answer = false;
  const requestOptionsCareerActor = {
    method: "GET",
    uri: `${process.env.API_URL}/3/person/${id_actor}/movie_credits`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    json: true,
    gzip: true,
  };
  const actorCredits = await rp(requestOptionsCareerActor)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("API call error:", err.message);
      return err.message;
    });
  await actorCredits.cast.forEach(element => {
    if (element.id == id_film) {
      answer = true;
    }
  });
  return answer;
};

module.exports = {
  getMovieAndActor,
  checkMovieAndActor,
};
