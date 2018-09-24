function validateChangePasswordForm(){
  let changePasswordForm = document.getElementById("changePasswordForm");
  let elements = changePasswordForm.elements;

  if(!elements["password"].value || !elements["cpassword"].value){
    alert("Tiene que llenar todos los campos.");
    return;
  }
  if(elements["password"].value !== elements["cpassword"].value){
    alert("Las constraseñas son diferentes");
    return;
  }
  changePasswordForm.submit();

}

$("document").ready(() => {
  if(changed){
    alert("Contraseña cambiada");
  }
  $("#changePasswordFormButton").on("click", () =>{
    validateChangePasswordForm();
  });
});
