console.log("Helloworld");

// function getDataFromAPI() {
//   document.getElementById("loader").style.display = "block";

//   fetch("https://gauravgitacc.github.io/postAppData/auctionData.json")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Data", data);
//       let innerHtml = "";
//       data.forEach((item) => {
//         innerHtml += `
//         <div class='myDiv'>
//             <h1>${item.status}</h1>
//             <h3>${item.caseNumber}</h3>
//         </div>
//         `;
//       });
//       document.getElementById("loader").style.display = "none";
//       document.getElementById("container").innerHTML = innerHtml;
//     }).catch((err) => {});
// }
var arr = [];

async function getDataFromAPI() {
  document.getElementById("loader").style.display = "block";
  console.log("Fetching Data...");

  try {
    const response = await fetch(
      "https://gauravgitacc.github.io/postAppData/auctionData.json"
    );
    arr = await response.json();
    sessionStorage.setItem("myArr", JSON.stringify(arr));
    // alert("Added to Session Storage");
    if (arr) {
      console.log("data", arr);
      showData(arr);

      document.getElementById("loader").style.display = "none";
    }
  } catch (e) {
    console.log("Error--", e);
  }
}

if (sessionStorage.getItem("myArr")) {
  // user is coming again in the session
  //   alert("Getting from Session Storage");
  var myArr = JSON.parse(sessionStorage.getItem("myArr"));
  showData(myArr);
  arr = myArr;
} else {
  // user is coming to the session for the very first time
  getDataFromAPI();
}

document.getElementById("search").addEventListener("input", () => {
  var newArr = arr.filter((item) =>
    item.toLocation
      .toLowerCase()
      .includes(document.getElementById("search").value.trim().toLowerCase())
  );
  showData(newArr);
});

function showData(myArr) {
  document.getElementById("container").innerHTML = "";
  let innerHtml = "";
  myArr.forEach((item) => {
    innerHtml += `
                <div class='myDiv'>
                    <div class='flex-info'>
                        <div>
                            <div class='chip ${
                              item.status == "PENDING"
                                ? "yellow"
                                : item.status == "CANCELLED"
                                ? "red"
                                : ""
                            }' >${item.status}</div>
                            <p>${item.caseNumber}</p>
                        </div>
                        <p>${item.date}</p>
                    </div>
                    <hr/>
                    <div>
                            <strong>${item.toLocation}</strong>
                            <p>${
                              item.fromLocation
                            } <span style='float:right;'>${item.fare}</span></p>
                    </div>
                </div>
                `;
  });
  document.getElementById("container").innerHTML = innerHtml;
}

// document.getElementById("btn").addEventListener("click", getDataFromAPI);

// if (condition1) {
//   // dothis1
// } else {
//   if (condition2) {
//     // dothis2
//   } else {
//     // dothis3
//   }
// }

// condition1 ? "dothis1" : condition2 ? "dothis2" : "dothis3";

// The user comes to the website ->
// 1. Is the user coming for the first time in the session -> get the data from thr api and sotr it in the session
// 2. Is the user coming again -> get the data from the storage and not the api.
