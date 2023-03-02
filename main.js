
const fetchData = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => innerData(data.slice(0,4)))
}


const innerData = (data) => {
    const row  = document.getElementById("row");
    row.innerHTML = '';
    data.forEach(element => {
        // console.log(element);
        const div = document.createElement("div");
        div.innerHTML = `
                    
        <div class="col">
        <div class="card">
          <img src="${element.flags.png}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${element.name.common}</h5>
            <p class="card-text">Capital : ${element.capital ? element.capital[0]:"there is no capital name"}</p>
            <p class="card-text">population : ${element.population}</p>
            <button class="btn btn-primary" onclick="modalOpen('${element.name.common}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
          </div>
        </div>
      </div>

        `
        row.appendChild(div)
    });
}

const modalOpen = (data) => {
    const url = `https://restcountries.com/v3.1/name/${data}`;
    fetch(url)
    .then(res => res.json())
    .then(data => modalData(data))
}


const modalData = (data) => {
    console.log(data[0].name.common)
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
    <img src="${data[0].flags.png}" class="w-100" style="height:200px;" alt="">
    <h3>Name: ${data[0].name.common}</h3>
    <p>Capital: ${data[0].capital ? data[0].capital[0]:"there is no capital name"}</p>
    <p>population: ${data[0].population}</p>
    `
    console.log(data)
}

const loadMore = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => innerData(data))
}

fetchData();