let usersData = [];

const countriesData = {
  countries: [
    {
      name: "India",
      states: [
        {
          name: "Gujarat",
          cities: ["Surat", "Vapi", "Valsad"],
        },
        {
          name: "Maharashtra",
          cities: ["Mumbai", "Pune"],
        },
      ],
    },
    {
      name: "United States",
      states: [
        {
          name: "California",
          cities: ["Los Angeles", "San Francisco", "San Diego"],
        },
        {
          name: "New York",
          cities: ["New York City", "Buffalo", "Albany"],
        },
      ],
    },
    {
      name: "United Kingdom",
      states: [
        {
          name: "England",
          cities: ["London", "Manchester", "Birmingham"],
        },
        {
          name: "Scotland",
          cities: ["Edinburgh", "Glasgow", "Aberdeen"],
        },
      ],
    },
  ],
};
const countryDropdown = document.getElementById("country");
const stateDropdown = document.getElementById("state");
const cityDropdown = document.getElementById("city");

function updateCountry() {
  countriesData.countries.map((countryname) => {
    const option = document.createElement("option");
    option.value = countryname.name;
    option.textContent = countryname.name;
    countryDropdown.append(option);
  });
}

function updateStates() {
  const selectedCountry = countryDropdown.value;
  cityDropdown.disabled = selectedCountry === "";
  stateDropdown.disabled = selectedCountry === "";

  stateDropdown.innerHTML = '<option value="">---Select State---</option>';
  cityDropdown.innerHTML = '<option value="">---Select City---</option>';

  if (selectedCountry === "") return;
  const countryData = countriesData.countries.find(
    (country) => country.name === selectedCountry
  );

  if (!countryData) return;

  countryData.states.map((state) => {
    const option = document.createElement("option");
    option.value = state.name;
    option.textContent = state.name;
    stateDropdown.append(option);
  });
}

function updateCities() {
  const selectedState = stateDropdown.value;
  cityDropdown.disabled = selectedState === "";
  cityDropdown.innerHTML = '<option value="">---Select City---</option>';

  if (selectedState === "") return;

  const selectedCountry = countryDropdown.value;

  const countryData = countriesData.countries.find(
    (country) => country.name === selectedCountry
  );

  if (!countryData) return;

  const selectedStateData = countryData.states.find(
    (state) => state.name === selectedState
  );

  if (!selectedStateData) return;

  selectedStateData.cities.map((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityDropdown.append(option);
  });
}

function addUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const hobbies = Array.from(
    document.querySelectorAll('input[name="hobbies[]"]:checked')
  ).map((hobby) => hobby.value);
  const gender = document.querySelector('input[name="gender"]:checked');
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;
  var country = document.getElementById("country").value;
  var state = document.getElementById("state").value;
  var city = document.getElementById("city").value;

  if (
    !name ||
    !email ||
    hobbies.length === 0 ||
    !gender ||
    !password ||
    password !== confirm_password
  ) {
    alert("Please fill in all fields correctly.");
    return;
  }

  if (!isPasswordValid(password)) {
    alert(
      "Password must have at least one uppercase letter, one lowercase letter, one number."
    );
    return;
  }

  let id = usersData.length + 1;

  const user = {
    id: id,
    name: name,
    email: email,
    hobbies: hobbies,
    gender: gender.value,
    country: country,
    state: state,
    city: city,
    password: password,
    confirm_password: confirm_password,
  };

  usersData.push(user);
  console.log(usersData);

  // Clear form fields for the next user input
  var country = (countryDropdown.innerHTML =
    '<option value="">---Select City---</option>');
  var state = (stateDropdown.innerHTML =
    '<option value="">---Select City---</option>');
  var city = (cityDropdown.innerHTML =
    '<option value="">---Select City---</option>');
  document.getElementById("userForm").reset();
  updateTable();
  console.log(usersData);
}

function isPasswordValid(password) {
  if (password.length < 6) {
    alert("password must be at least 6 characters long");
    return false;
  }

  let hasUppercase = false;
  let hasLowercase = false;
  let hasNumber = false;

  for (let i = 0; i < password.length; i++) {
    const char = password.charAt(i);
    if (!hasUppercase && char >= "A" && char <= "Z") {
      hasUppercase = true;
    } else if (!hasLowercase && char >= "a" && char <= "z") {
      hasLowercase = true;
    } else if (!hasNumber && char >= "0" && char <= "9") {
      hasNumber = true;
    }

    if (hasUppercase && hasLowercase && hasNumber) {
      return true;
    }
  }

  return false;
}

function updateTable() {
  const tableBody = document
    .getElementById("userTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear the table body

  usersData.forEach((user, index) => {
    const row = tableBody.insertRow();
    const idCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const emailCell = row.insertCell(2);
    const hobbiesCell = row.insertCell(3);
    const genderCell = row.insertCell(4);
    const countryCell = row.insertCell(5);
    const stateCell = row.insertCell(6);
    const cityCell = row.insertCell(7);
    const actionCell = row.insertCell(8);

    idCell.innerHTML = user.id;
    countryCell.innerHTML = user.country;
    stateCell.innerHTML = user.state;
    cityCell.innerHTML = user.city;
    nameCell.innerHTML = user.name;
    emailCell.innerHTML = user.email;
    hobbiesCell.innerHTML = user.hobbies.join(", ");
    genderCell.innerHTML = user.gender;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => deleteUser(index);
    actionCell.appendChild(deleteButton);
  });
}

function deleteUser(index) {
  usersData.splice(index, 1);
  updateTable();
}

// // Declare an object
// let ob = {
//     Company: "GeeksforGeeks",
//     Address: "Noida",
//     contact: +91-999999999,
//     mentor: {
//         HTML: "GFG",
//         CSS: "GFG",
//         JavaScript: "GFG"
//     }
// };

// const flattenObj = (ob) => {

//     let result = {};

//     for (const i in ob) {

//         if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
//             const temp = flattenObj(ob[i]);
//             for (const j in temp) {
//                 result[i + '.' + j] = temp[j];
//             }
//         }
//         else {
//             result[i] = ob[i];
//         }
//     }
//     return result;
// };

// console.log(flattenObj(ob));

// var twoSum = function(nums, target) {
//   debugger;
//   const numIndexMap = new Map(); 
  
//   for (let i = 0; i < nums.length; i++) {
//       const complement = target - nums[i];
//       if (numIndexMap.has(complement)) {
//           return [numIndexMap.get(complement), i];
//       }
//       numIndexMap.set(nums[i], i);
//   }
//   return []; 
// };

// // Example usage:
// const nums = [2, 7, 11, 15];
// const target = 17;
// console.log(twoSum(nums, target));
