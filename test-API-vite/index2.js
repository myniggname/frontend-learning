fetch("https://todolist.kodingup.com/v1/tasks/2", {
  method: "PATCH",
}).then((response) => {
  console.log(response);
});
