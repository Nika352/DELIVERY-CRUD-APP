//tracks the row on which edit button was used.
var selectedRow = null;

//list of data objects we have submitted(if we edit certain data it will get updated in the list and its index will stay the same), 
//we need this to easily put full data into JSON format string.
var fullData = [];

//gives us data that we want to update (we use this variable so we can correctly update information inside the list we made).
var previousData = {};

//executes when submit button is clicked.
function onSubmit() {

    event.preventDefault();

    var data = getData();

    if (alreadyUsed(data)) {

        alert("You already used those inputs. You have to change at least one of them to continue.");

    } else {

        if (selectedRow === null) {
            displayData(data);
        } else {
            updateData(data);
        }

        updateFullData(data);
        selectedRow = null;
        resetData();

    }
}

//checks if user already used same inputs in previous entries.
function alreadyUsed(data) {
    if (JSON.stringify(fullData).includes(JSON.stringify(data))) {
        return true;
    } else {
        return false;
    }
}

//updates list of data objects and returns list in JSON string format.
function updateFullData(data) {
    //if edit button was used before submit button we have to replace previous data with new one, in other case we just add it to the list.
    if (Object.keys(previousData).length !== 0) {
        for (var i = 0; i < fullData.length; i++) {
            if (JSON.stringify(fullData[i]) === JSON.stringify(previousData)) {
                fullData.splice(i, 1, data);
                break;
            }
        }
        previousData = {};
    } else {
        fullData.push(data);
    }
    return JSON.stringify(fullData);
}


//gets data from the form input fields.
function getData() {
    var data = {};
    data["fullName"] = document.getElementById("fullName").value;
    data["email"] = document.getElementById("email").value;
    data["phoneNumber"] = document.getElementById("phoneNumber").value;
    data["address"] = document.getElementById("address").value;

    return data;

}


//displays data on screen
function displayData(data) {
    var table = document.getElementById("displayed_info").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.phoneNumber;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.address;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button  onClick= 'onEdit(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>`;
}


//puts displayed data as form inputs so we can change them when edit button is clicked.
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phoneNumber").value = selectedRow.cells[2].innerHTML;
    document.getElementById("address").value = selectedRow.cells[3].innerHTML;

    previousData = getData();

}

//displays updated data after edit.
function updateData(data) {
    selectedRow.cells[0].innerHTML = data.fullName;
    selectedRow.cells[1].innerHTML = data.email;
    selectedRow.cells[2].innerHTML = data.phoneNumber;
    selectedRow.cells[3].innerHTML = data.address;
}

//deletes chosen row of information.
function onDelete(td) {
    row = td.parentElement.parentElement;
    document.getElementById('displayed_info').deleteRow(row.rowIndex);
}


//clears all input fields.
function resetData() {
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('address').value = '';
}
