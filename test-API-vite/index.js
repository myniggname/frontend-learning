fetch("https://todolist.kodingup.com/v1/healthcheck", {
  method: "GET",
}).then((response) => {
  console.log(response);
});
