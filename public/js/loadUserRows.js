function loadRows(){
  let tableRows = document.getElementById("listRows");
  let newRow, col1, col2, col3;
  users.forEach((user) =>{
    newRow = document.createElement("tr");
    newRow.id = user["user"];
    col1 = document.createElement("td");
    col1.innerHTML = user["user"];
    col2 = document.createElement("td");
    col2.innerHTML = user["name"];
    col3 = document.createElement("td");
    switch(user["role"]){
      case 0:
        col3.innerHTML = "superadmin";
        break;
      case 1:
        col3.innerHTML = "Administrador General";
        break;
      case 2:
        col3.innerHTML = "Supervisor";
        break;
      case 3:
        col3.innerHTML = "Compras";
        break;
      case 4:
        col3.innerHTML = "Control de Inventario";
        break;
      case 50:
        col3.innerHTML = "Maestro";
    }
    newRow.appendChild(col1);
    newRow.appendChild(col2);
    newRow.appendChild(col3);
    tableRows.appendChild(newRow);
    if(user["role"] !== 0 && user["role"] !== 50){
      $("#" + newRow.id).on("click", () => {
        document.getElementById("modalUsername").innerHTML = user["user"];
        document.getElementById("userIdentifier").value = user["user"];
        document.getElementById("userIdDelete").value = user["user"];
        $("#modal").modal("show");
      });
    }
  });
}

$("document").ready(() => {
  loadRows();
});
