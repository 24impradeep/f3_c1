const api1Url = "https://dummyjson.com/posts";
const api2Url = "https://dummyjson.com/products";
const api3Url = "https://dummyjson.com/todos";

function fetchDataFromApi1(apiUrl, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.posts);
          resolve(data.posts);
        })
        .catch((error) => {
          reject(error);
        });
    }, delay);
  });
}

function fetchDataFromApi2(apiUrl, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.products);
          resolve(data.products);
        })
        .catch((error) => {
          reject(error);
        });
    }, delay);
  });
}

function fetchDataFromApi3(apiUrl, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.todos);
          resolve(data.todos);
        })
        .catch((error) => {
          reject(error);
        });
    }, delay);
  });
}

function fetchApiData() {
  const tableBody = document.querySelector("#data-table tbody");
  const PromiseAPI1 = fetchDataFromApi1(api1Url, 1000);
  const PromiseAPI2 = PromiseAPI1.then(() => fetchDataFromApi2(api2Url, 2000));
  const PromiseAPI3 = PromiseAPI2.then(() => fetchDataFromApi3(api3Url, 3000));

  PromiseAPI1.then((api1Data) => {
    api1Data.forEach((item) => {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.innerText = item.title;
      row.appendChild(cell);
      tableBody.appendChild(row);
    });

    return true;
  })
    .then((api1Resolved) => {
      if (api1Resolved) {
        return PromiseAPI2;
      }
    })
    .then((api2Data) => {
      api2Data.forEach((item) => {
        const row = document.querySelector(`#data-table tbody tr:nth-child(${item.id})`);
        const cell = document.createElement("td");
        cell.innerText = item.title;
        row.appendChild(cell);
      });

      return true;
    })
    .then((api2Resolved) => {
      if (api2Resolved) {
        return PromiseAPI3;
      }
    })
    .then((api3Data) => {
      api3Data.forEach((item) => {
        const row = document.querySelector(`#data-table tbody tr:nth-child(${item.id})`);
        const cell = document.createElement("td");
        cell.innerText = item.todo;
        row.appendChild(cell);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

const fetchDataButton = document.querySelector("#fetchDataButton");
fetchDataButton.addEventListener("click", fetchApiData);
