let reviewsObj = {};

const name = document.getElementById("name");
const grade = document.getElementById("grade");
const description = document.getElementById("description");
const addReview = document.getElementById("add-review");
const reviews = document.getElementById("reviews");

const getReviews = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let arr = JSON.parse(this.responseText);
      console.log(arr);
      let div = `<div>				
				 </div>`;

      for (let r of arr) {
        div += `<div class="global-review"> 
		  <p><span>Name</span>: ${r.name} </p>
		  <p><span>Desciption</span>: ${r.description}</p>
		  <p><span>Grade</span>: ${r.grade}</p>   
		  </div>`;
      }

      reviews.innerHTML = div;
    }
  };
  xhttp.open(
    "GET",
    "https://63bbd733cf99234bfa65ae9f.mockapi.io/reviews2",
    true
  );
  xhttp.send();
};

const postReviews = () => {
  let post = JSON.stringify(reviewsObj);
  const url = "https://63bbd733cf99234bfa65ae9f.mockapi.io/reviews2";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(post);
  xhr.onload = function () {
    if (xhr.status === 201) {
      console.log("Post successfully created!");
    }
  };
};

const createReviews = () => {
  console.log(1);
  if (name.value === "" || grade.value === "" || description.value === "") {
    return null;
  }

  reviewsObj = {
    name: name.value,
    grade: grade.value,
    description: description.value,
  };

  postReviews();
  getReviews();

  reviewsObj = {};
};

addReview.addEventListener("click", createReviews);
getReviews();
