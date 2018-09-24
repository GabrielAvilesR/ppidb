function validateCreateUserForm(){
  let createUserForm = document.getElementById("createUserForm");
  let elements = createUserForm.elements;

  if(!elements["username"].value || !elements["name"].value || !elements["password"].value || !elements["cpassword"].value){
    alert("Tiene que llenar todos los campos.");
    return;
  }
  if(elements["password"].value !== elements["cpassword"].value){
    alert("Las constraseñas son diferentes");
    return;
  }
  createUserForm.submit();

}

$("document").ready(() => {
  if(!validCreation){
    let cm = document.getElementById("createMessage");
    cm.className = "errorMessage";
    cm.innerHTML = "Este usuario ya existe";
  }
  if(created){
    let cm = document.getElementById("createMessage");
    cm.className = "successMessage";
    cm.innerHTML = "Usuario creado";
  }
  $("#createUserFormButton").on("click", () =>{
    validateCreateUserForm();
  });
});
