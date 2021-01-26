const ctx = document.getElementById("Radarchart").getContext("2d");
const nompays = document.querySelector(".country .name");
const castotal = document.querySelector(".total-cases .value");
const nvcas = document.querySelector(".total-cases .new-value");
const casretablie = document.querySelector(".recovered .value");
const nvcasretablie = document.querySelector(".recovered .new-value");
const mortss = document.querySelector(".deaths .value");
const nvmortss = document.querySelector(".deaths .new-value");

app_data = [],
listdescas = [],
listdesretablies = [],
listdesmorts = [],
deaths = [],
Dateeee = [];


let user_country;
var requestOptions = {
  method: "GET",
};

// executer le chart
function executchart() {
    datamodif();
    radarchart();
  }

function jibdata(country) {
  user_country = country;

    listdescas = [],
    listdesretablies = [],
    listdesmorts = [],
    dates = [],
    Dateeee = [];

  const api_fetch = async (country) => {
    await fetch("https://api.covid19api.com/total/country/" + country + "/status/confirmed", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          dates.push(entry.Date);
          listdescas.push(entry.Cases);
        });
      });

    await fetch("https://api.covid19api.com/total/country/" + country + "/status/recovered", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          listdesretablies.push(entry.Cases);
        });
      });

    await fetch("https://api.covid19api.com/total/country/" + country + "/status/deaths",requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          listdesmorts.push(entry.Cases);
        });
      });
    executchart();
  };
  api_fetch(country);
}

jibdata(user_country);

function Datee(dateString) {
    let date = new Date(dateString);
    return `${date.getDate()} ${getmois[date.getMonth()]}`;
  }
const getmois = [
  "Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre",
];

// Chartjs
let my_chart;
function radarchart() {
  if (my_chart) {
    my_chart.destroy();
  }
my_chart = new Chart(ctx, {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Cas",
          data: listdescas,
          fill: false,
          borderColor: "#f90001",
          backgroundColor: "#f90001",
          borderWidth: 1,
        },
        {
          label: "Rétablie",
          data: listdesretablies,
          fill: false,
          borderColor: "#6bf901",
          backgroundColor: "#6bf901",
          borderWidth: 1,
        },
        {
          label: "Morts",
          data: listdesmorts,
          fill: false,
          borderColor: "#FFFFFF",
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
        },
      ],
      labels: Dateeee,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

function datamodif() {
    var castotall = listdescas[listdescas.length - 1];
    var nvcascomfirme = castotall - listdescas[listdescas.length - 2];
    var totalretablie = listdesretablies[listdesretablies.length - 1];
    var nvtotalretabliee = totalretablie - listdesretablies[listdesretablies.length - 2];
    var totalmorts = listdesmorts[listdesmorts.length - 1];
    var nvtotalmortss = totalmorts - listdesmorts[listdesmorts.length - 2];
    nompays.innerHTML = user_country;
    castotal.innerHTML = castotall;
    nvcas.innerHTML = `+${nvcascomfirme}`;
    casretablie.innerHTML = totalretablie;
    nvcasretablie.innerHTML = `+${nvtotalretabliee}`;
    mortss.innerHTML = totalmorts;
    nvmortss.innerHTML = `+${nvtotalmortss}`;
  
    // format dates
    dates.forEach((date) => {
      Dateeee.push(Datee(date));
    });
  }