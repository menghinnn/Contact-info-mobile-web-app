function initialize(){
    let status = "* Offline *";
    if(navigator.onLine){
        status = "* Online *";
        retrieveContacts();
    }
    else{
        const localStorge = window.localStorage;
        if(localStorge){
            const contacts = localStorge.getItem("contacts");
            if(contact){
                displayContacts(JSON.parse(contacts));
            }
        }
    }

    document.getElementById("status").innerHTML = status;

    document.body.addEventListener(
        "online",
        function(){
            document.getElementById("status").innerHTML = "Online";
        },
        false
        );


    document.body.addEventListener(
        "offline",
        function(){
            document.getElementById("status").innerHTML = "Offline";

        },
        false
    );




}

function retrieveContacts(){
    const xhr = new XMLHttpRequest();
    const url = "contacts.json";

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            var contacts = JSON.parse(xhr.response).contacts;
            displayContacts(contacts);

            const localStorage= window.localStorage;
            if(localStorage){
                localStorage.setItem("contacts", JSON.stringify(contacts));
            }
        }
    }

    xhr.open("get", url);
    xhr.send();



}

function displayContacts(){
    contacts.forEach(addRow);
}

function addRow(contacts){
    var tcontent = document.getElementsById("tcontent");
    var row = tcontent.insertRow();
    var nameCell = row.insertCell();

    nameCell.setAttribute('data-label', Name);
    nameCell.innerHTML = contacts.name;

    var addressCell = row.insertCell();
    addressCell.setAttribute('data-label', "Address");
    addressCell.innerHTML = contacts.address;

    var mobileCell = row.insertCell();
    mobileCell.setAttribute('data-label', "Mobile");
    mobileCell.innerHTML = contacts.mobile;




}
