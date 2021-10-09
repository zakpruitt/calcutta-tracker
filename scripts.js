var total = 0;


document.getElementById("addPersonButton").onclick = function () {
    ShowAddNotification(document.getElementById("nameInput").value);
    AddRow();
}

function AddRow() {
    var name = document.getElementById("nameInput").value;
    var amount = document.getElementById("amountInput").value;
    total += parseFloat(amount);

    if (name == "" || amount == "") {
        alert("Please enter a name and an amount.");
        return;
    }
    else if (isNaN(amount)) {
        alert("Please make sure amount is a number.");
        return;
    }

    amount = ParseToDollars(amount);

    var table = document.getElementById("table");
    var row = table.insertRow(table.rows.length - 1);
    var idCell = row.insertCell(0);
    var nameCell = row.insertCell(1);
    var amountCell = row.insertCell(2);
    var paidCell = row.insertCell(3);
    var removeCell = row.insertCell(4);

    document.getElementById("totalRowId").innerHTML = table.rows.length - 1;
    var newTotalAmount = ParseToDollars(total);
    document.getElementById("totalRowAmountId").innerHTML = newTotalAmount;

    idCell.innerHTML = table.rows.length - 2;
    nameCell.innerHTML = name;
    amountCell.innerHTML = amount;
    paidCell.innerHTML = '<input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="...">';
    removeCell.innerHTML = '<button class="btn btn-outline-danger" onclick="RemoveRow(this)" type="button">Remove</button>';
}

function ShowAddNotification(text) {
    var myAlert = document.getElementById('toast');
    document.getElementById('toastText').innerHTML = text + " has been added to the Calcutta at " + GetDateAndTime() + "!";
    var bsAlert = new bootstrap.Toast(myAlert);
    bsAlert.show();
}

function ShowRemoveNotification(text) {
    var myAlert = document.getElementById('toast');
    document.getElementById('toastText').innerHTML = text + " has been removed from the Calcutta at " + GetDateAndTime() + ".";
    var bsAlert = new bootstrap.Toast(myAlert);
    bsAlert.show();
}

function GetDateAndTime() {
    var today = new Date();
    var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
    var time = ((today.getHours() + 11) % 12 + 1) + ":" + today.getMinutes() + ":" + today.getSeconds();
    var suffix = (today.getHours() >= 12) ? 'PM' : 'AM';
    return "on " + date + " at " + time + " " + suffix;
}

function ParseToDollars(amount) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(amount);
}

function RemoveRow(element) {
    var row = element.closest("tr");
    ShowRemoveNotification(row.cells[1].innerHTML);
    row.remove();

    var table = document.getElementById("table");
    for (let i = 1; i < table.rows.length + 1; i++) {
        table.rows[i].cells[0].innerHTML = i;
    }
}