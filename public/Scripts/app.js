//const { event } = require("jquery");
//const { format } = require("morgan");

// IIFE - Immediately Invoked function expression
(function(){

function Start()
{
    console.log("App started...");

    let deleteButtons = document.querySelectorAll('.btn-outline-danger')

    for(button of deleteButtons)
    {
       button.addEventListener('click', (event)=>{
           if(!confirm("Are you sure?")){
               event.preventDefault();
               window.location.assign('/user-list');
           }
       });
    }




    /*
    if(document.title == "Contact Me"){
        console.log("On the Contact page");

        let sendButton = document.getElementById("sendButton");
        let cancelButton = document.getElementById("cancelButton");
        let form = document.forms[0];


        sendButton.addEventListener("click", (event) => {
            event.preventDefault();

            let fullName = document.getElementById("fullName").value;
            let contactNumber = document.getElementById("contactNumber").value;
            let emailAddress = document.getElementById("emailAddress").value;
            let message = document.getElementById("message").value;

            console.info('Full Name: ${fullName} ${contactNumber} ${emailAddress} ${message}');

            format.reset();
        });

        cancelButton.addEventListener("click", (event) => {
            event.preventDefault();
            if(confirm("Are you sure?"))
            {
                location.href = "/home";
            }
        });
        
        
    }
    */
}

window.addEventListener("load", Start);

})();