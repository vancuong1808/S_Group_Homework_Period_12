let Contacts = [
    {
        name:  "Vo Van Cuong",
        number: "000000000",
        email: "Hd6kR@example.com"
    }, 
    {
        name: "Huynh Nhu Bao Nhan",
        number: "1234556677",
        email: "Nhan@gmail.com"
    }
]

if ( localStorage.getItem("Contacts") ) {
    Contacts = JSON.parse( localStorage.getItem("Contacts") );
}

let Cardcontainer = document.querySelector(".cards");
let CreateContacts = document.querySelector("#CreateArticle");
let popupContainers = document.querySelector(".popup-container");
let popup = document.querySelector(".popup-main");
let popupContainersEdit = document.querySelector(".popup-container-Edit");
let popupEdit = document.querySelector(".popup-main-Edit");
let edit = document.getElementById("Edit");
let del = document.getElementById("Delete");
let Edit = document.getElementById("Edit");
let ContactIndex = {
    index : 1
};


let newName = document.querySelector("#field-name");
let newNumber = document.querySelector("#field-number");
let newEmail = document.querySelector("#field-email");
let Gmail = "@gmail.com"

let checkName = false;
let checkNumber = false;
let checkEmail = false;

checkName = newName.addEventListener("input", ()=>{
    if( newName.checkValidity() && newName.value != "" ) {
        checkName = true
    } else {
        checkName = false
    }
    return checkName
})
checkNumber = newNumber.addEventListener("input", ()=>{
    if( newNumber.checkValidity() ) {
        checkNumber = true
    } else {
        checkNumber = false
    }
    return checkNumber
})
checkEmail = newEmail.addEventListener("input", ()=>{
    if( !newEmail.checkValidity() && newEmail.value.includes( Gmail ) && newEmail.value != "" && newEmail.value.split('').findIndex(( char ) => { return char === "." }) !== 0 ) {
        checkEmail = true
    } else {
        checkEmail = false
    }
    return checkEmail
})

function CheckInput() {
    if( checkName == true && checkNumber == true && checkEmail == true ) {
        return true
    } else {
        return false
    }
}

let newNameEdit = document.querySelector("#field-name-Edit");
let newNumberEdit = document.querySelector("#field-number-Edit");
let newEmailEdit = document.querySelector("#field-email-Edit");

let checkNameEdit = false;
let checkNumberEdit = false;
let checkEmailEdit = false;

checkNameEdit = newNameEdit.addEventListener("input", ()=>{
    if( newNameEdit.checkValidity() &&newNameEdit != "" ) {
        checkNameEdit = true
    } else {
        checkNameEdit = false
    }
    return checkNameEdit
})
checkNumberEdit = newNumberEdit.addEventListener("input", ()=>{
    if( newNumberEdit.checkValidity() ) {
        checkNumberEdit = true
    } else {
        checkNumberEdit = false
    }
    return checkNumberEdit
})
checkEmailEdit = newEmailEdit.addEventListener("input", ()=>{
    if( !newEmailEdit.checkValidity() && newEmailEdit.value.includes( Gmail ) && newEmailEdit.value != "" && newEmailEdit.value.split('').findIndex(( char ) => { return char === "." }) !== 0 ) {
        checkEmailEdit = true
    } else {
        checkEmailEdit = false
    }
    return checkEmailEdit
})

function CheckInputEdit() {
    if( checkNameEdit == true && checkNumberEdit == true && checkEmailEdit == true ) {
        return true
    } else {
        return false
    }
}

function Render() {
    let elements = Contacts.map( (items, index)=> {
        return `<div class="article">
        <div class="name">
           <img class="icon" src="../img/icon/name.svg" alt="">
           <span id="name"> ${items.name} </span>
        </div>
        <div class="numberCall">
            <img class="icon" src="../img/icon/phone.svg" alt="">
            <span  id="number"> ${items.number} </span>
        </div>
        <div class="Email">
            <img class="icon" src="../img/icon/email.svg" alt="">
            <span  id="email"> ${items.email} </span>
        </div>
        <div class="footer">
            <img id="Edit" onclick="EditArticle( ${index} )" src="../img/icon/pencil.svg" alt="">
            <img id="Delete" onclick="DeleteArticle(this, ${index})" src="../img/icon/bin.svg" alt="">
        </div>
    </div>`
    })
    Cardcontainer.innerHTML = elements.join("");
}

CreateContacts.addEventListener("click", ()=>{
    popupContainers.classList.toggle('active');
})
popupContainers.addEventListener("click", ()=>{
    popupContainers.querySelector("#field-name").value = ""
    popupContainers.querySelector("#field-number").value = ""
    popupContainers.querySelector("#field-email").value = "" 
    popupContainers.classList.toggle('active')
})
popup.addEventListener("click", ()=>{
    // lam cho popup khong dong vi khi select vao ptu con se select ptu nhung event nay se select vao ptu co event nay thoi
    event.stopPropagation();
})



function NewContacts() {
    let newName = document.querySelector("#field-name");
    let newNumber = document.querySelector("#field-number");
    let newEmail = document.querySelector("#field-email");
    console.log( checkName, checkNumber, checkEmail )
    if( CheckInput() ) {
        alert("okay")
        console.log( newName.value, newNumber.value, newEmail.value )
        Contacts.push({
        name: newName.value,
        number: newNumber.value,
        email: newEmail.value
        })
    localStorage.setItem("Contacts", JSON.stringify( Contacts ) );
    popupContainers.classList.toggle('active')
    Render()
    } else {
        if ( checkName == false ) {
            alert("Name is not valid")
        } else if ( checkNumber == false ) {
            alert("Number is not valid")
        } else if ( checkEmail == false ) {
            alert("Email is not valid")
        } else {
            alert("Somethings is not valid please try again")
        }
        }
}

function DeleteArticle( items, index ) {
    Contacts.splice( index, 1)
    localStorage.setItem("Contacts", JSON.stringify( Contacts ) );
    Render()
}


popupContainersEdit.addEventListener("click", ()=>{
    popupContainersEdit.classList.toggle('active')
})
popupEdit.addEventListener("click", ()=>{
    // lam cho popup khong dong vi khi select vao ptu con se select ptu nhung event nay se select vao ptu co event nay thoi
    event.stopPropagation();
})

function EditArticle( index ) {
    popupEdit.querySelector("#field-name-Edit").value = Contacts[index].name;
    popupEdit.querySelector("#field-number-Edit").value = Contacts[index].number;
    popupEdit.querySelector("#field-email-Edit").value = Contacts[index].email;
    popupContainersEdit.classList.toggle('active')
    ContactIndex.index = index
}
function Change() {
    let changeOldName = document.querySelector("#field-name-Edit").value;
    let changeOldNumber = document.querySelector("#field-number-Edit").value;
    let changeOldEmail = document.querySelector("#field-email-Edit").value;
    console.log( checkNameEdit, checkNumberEdit, checkEmailEdit )
    console.log( ContactIndex.index )
        if( CheckInputEdit() ) {
            Contacts[ContactIndex.index] = {
                name: changeOldName,
                number: changeOldNumber,
                email: changeOldEmail
            }
            localStorage.setItem("Contacts", JSON.stringify( Contacts ) );
            popupContainersEdit.classList.toggle('active')
            Render()
        } else {
            if ( checkNameEdit == false ) {
                alert("Name is not valid")
            } else if ( checkNumberEdit == false ) {
                alert("Number is not valid")
            } else if ( checkEmailEdit == false ) {
                alert("Email is not valid")
            } else {
                alert("Somethings is not valid please try again")
            }
        }
}
Render()


