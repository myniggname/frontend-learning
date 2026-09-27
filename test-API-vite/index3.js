fetch("https://todolist.kodingup.com/v1/tasks/3", {
  method: "DELETE",
}).then((response) => {
  console.log(response);
});
