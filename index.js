const input = document.querySelector("#input");
const button = document.querySelector("#button");
const list = document.querySelector("#list");

button.addEventListener("click", async () => {
  console.log("Test");

  const geocoding = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=50a7aa80fa492fa92e874d23ad061374`
  );
  const geocodingResponse = await geocoding.json();

  const forecast = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${geocodingResponse[0].lat}&lon=${geocodingResponse[0].lon}&units=metric&appid=50a7aa80fa492fa92e874d23ad061374`
  );
  const forecastResponse = await forecast.json();
  const forecastList = forecastResponse.list;

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let index = 1;
  for (const fc of forecastList) {
    // Jika index 1 atau index dibagi 8 yaitu 24/8
    if (index === 1 || index % 8 === 0) {
      // Mengubah menjadi element li atau menjadi ●
      let node = document.createElement("li");
      // Mengubah menjadi Hari, Tanggal: main.temperatur
      let textnode = document.createTextNode(
        `${new Date(fc.dt_txt).toLocaleDateString("id", options)}: ${
          fc.main.temp
        }°C`
      );

      node.appendChild(textnode);
      list.appendChild(node);
    }

    // Biar jadi 1 hari 1 ke 5 hari kedepan
    index++;
  }
});
