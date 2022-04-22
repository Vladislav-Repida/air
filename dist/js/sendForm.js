const btnSend = form.querySelector(".send-form-btn");

btnSend.addEventListener("click", (e)=>{
    e.preventDefault();
    let formData = new FormData(form);
    console.log(Array.from(formData));
});