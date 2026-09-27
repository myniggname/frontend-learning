fetch("https://todolist.kodingup.com/v1/tasks", {
  method: "POST",
}).then((response) => {
  console.log(response);
});
