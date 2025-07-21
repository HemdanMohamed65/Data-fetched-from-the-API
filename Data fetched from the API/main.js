var users = [];

function fetchUsers() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      users = data.map(function(user) {
        user.avatar = "https://i.pravatar.cc/100?img=" + user.id;
        return user;
      });
      saveToCookies(users);
      renderUsers(users);
    }
  };
  xhr.send();
}

function renderUsers(data) {
  var tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "";
  data.forEach(function(user) {
    var row = document.createElement("tr");
    row.innerHTML = "<td>" + user.id + "</td>" +
                    "<td>" + user.name + "</td>" +
                    "<td>" + user.email + "</td>" +
                    "<td>" + user.username + "</td>" +
                    "<td>" + user.address.city + "</td>" +
                    "<td>" + user.website + "</td>" +
                    "<td><img src='" + user.avatar + "' width='50'/></td>" +
                    "<td>" +
                    "<button onclick='viewUser(" + user.id + ")'>عرض</button> " +
                    "<button onclick='deleteUser(" + user.id + ")'>حذف</button>" +
                    "</td>";
    tbody.appendChild(row);
  });
}

function viewUser(id) {
  var user = users.find(function(u) { return u.id === id; });
  if (user) {
    localStorage.setItem("selectedUser", JSON.stringify(user));
    window.location.href = "user.html";
  }
}

function deleteUser(id) {
  users = users.filter(function(u) { return u.id !== id; });
  saveToCookies(users);
  renderUsers(users);
}

function saveToCookies(data) {
  document.cookie = "users=" + JSON.stringify(data) + "; path=/";
}

function searchUser() {
  var searchValue = document.getElementById("searchInput").value.toLowerCase();
  var searchBy = document.getElementById("searchBy").value;
  var filtered = users.filter(function(user) {
    return searchBy === "name"
      ? user.name.toLowerCase().includes(searchValue)
      : user.id.toString() === searchValue;
  });
  renderUsers(filtered);
}
