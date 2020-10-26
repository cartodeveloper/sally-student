//app to search parks from the NAtional Parks API...
//function that takes in 3 parameter... the API KEY, the state and the max limit of results!
const getParks = (apiKey, state, max) => {
  fetch(
    `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${max}&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((responseJson) => showParks(responseJson))
    .catch((error) => alert(error));
};

const showParks = (responseJson) => {
  $(".parks").html("");
  let templateResults = "";
  // loping though the json object(API call) to retrieve the 1. Name 2.Images 3. Description 4. Address.
  responseJson.data.forEach((park) => {
    let plus = park.addresses[0];
    templateResults += `<h2 class="fullname">${park.fullName}</h2>
        <img src="${park.images[0].url}" alt="loading park image">
        <p class="description">${park.description}</p>
        <p class="addresses">Address:
        ${plus.line2}  ${plus.city} ${plus.stateCode} ${plus.postalCode}</p>
        <p><a href="${park.url}">Learn More</a></p>`;
  });
  $(".parks").append(templateResults);
};

// event listener after the user submit the num of searches.
const onClick = () => {
  $("main").on("submit", (e) => {
    e.preventDefault();
    let maxList = $("#max").val();
    let state = $("#state").val();
    console.log(maxList, state);
    getParks(apiKey(), state, maxList);
  });
};

const apiKey = () => {
  return "cWNqpmZjlkZosKzrZVEAwYUjDGzXADhaUO8F4eoz";
};

const main = () => {
  onClick();
};

$(main);
