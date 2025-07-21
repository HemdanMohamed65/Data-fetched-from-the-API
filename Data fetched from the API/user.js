window.onload = function () {
  var user = JSON.parse(localStorage.getItem("selectedUser"));
  if (user) {
    var container = document.getElementById("userDetails");
    container.innerHTML = "<h1>" + user.name + "</h1>" +
                          "<img src='" + user.avatar + "' width='100'/>" +
                          "<p><strong>ID:</strong> " + user.id + "</p>" +
                          "<p><strong>Email:</strong> " + user.email + "</p>" +
                          "<p><strong>Username:</strong> " + user.username + "</p>" +
                          "<p><strong>City:</strong> " + user.address.city + "</p>" +
                          "<p><strong>Website:</strong> " + user.website + "</p>";
  }
};