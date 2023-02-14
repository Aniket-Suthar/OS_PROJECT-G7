var selectedRow = null;

//Showing alerts
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 1700);


}


//clearing all fields
function clearFields() {
    document.querySelector("#atimeinput").value = "";
    document.querySelector("#btimeinput").value = "";

}



let btnAdd = document.querySelector('#add_row');
let table = document.querySelector('table');
let qtInput = document.querySelector('#qtinput');
let atInput = document.querySelector('#atimeinput');
let btInput = document.querySelector('#btimeinput');
let delInput = document.querySelector('#del_row');
let exeInput = document.querySelector('#exe');
let count = 0;
let pno = "P";
let qt_s;
let qt;


class ProcessStruct {
    constructor(pid, at, bt, ct, wt, start_time, tat, rt, bt_remaining) {
        this.pid = pid;
        this.at = at;
        this.bt = bt;
        this.ct = ct;
        this.wt = wt;
        this.tat = tat;
        this.rt = rt;
        this.start_time = start_time;
        this.bt_remaining = bt_remaining;
    }
}
let ps = [];
for (let i = 0; i < 100; i++) {
    ps.push(new ProcessStruct());
}


function comparatorAT(a, b) {
    let x = a.at;
    let y = b.at;
    return x < y;
}

function comparatorPID(a, b) {
    let x = a.pid;
    let y = b.pid;
    return x < y;
}

var n, index;
var cpu_utilization;
var q = [];

var is_first_process = true;
var current_time = 0, max_completion_time;
var completed = 0, tq, total_idle_time = 0, length_cycle;

var sum_tat = 0, sum_wt = 0, sum_rt = 0, sum_ct = 0;


btnAdd.addEventListener('click', function addRow(e) {
    e.preventDefault();

    //Getting form values
    const qt_s = document.querySelector("#qtinput").value;
    const at_s = document.querySelector("#atimeinput").value;
    const bt_s = document.querySelector("#btimeinput").value;


    //validating
    if (qt_s == "" || at_s == "" || bt_s == "") {
        showAlert("Please Fill All the Details", "danger");
    }

    else if (qt_s < 0) {
        showAlert("Quantum Time cant't be negative", "danger");
    }
    else if (bt_s == '0') {
        showAlert("Burst time cannot be 0. Please try again", "danger");
    }
    else if (bt_s < 0) {
        showAlert("Burst time cannot be negative Please try again", "danger");
    }
    else if (at_s < 0) {
        showAlert("Arrival time cannot be negative Please try again", "danger");
    }

    else {
        if (selectedRow == null) {
            count++;
            visited = new Array(100).fill(false);

            document.getElementById("qtinput").readOnly = true;
            let num = count.toString();
            let pno_2 = pno.concat(num);

            var table = document.getElementById("rr_table");
            var row = table.insertRow(count);

            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);

            cell0.innerHTML = pno_2;
            cell1.innerHTML = at_s;
            cell2.innerHTML = bt_s;
            cell3.innerHTML = ` <td>
        <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        <td>`;
            selectedRow = null;
            showAlert("Entry Added", "success");

            atInput.value = '';
            btInput.value = '';

            at = parseInt(at_s);
            bt = parseInt(bt_s);
            qt = parseInt(qt_s);

            ps[count - 1].at = at;
            ps[count - 1].pid = count - 1;
            ps[count - 1].bt = bt;
            ps[count - 1].bt_remaining = ps[count - 1].bt;

            tq = qt;
            n = count;
        }


        //Saving the data for editing purpose
        else {

            selectedRow.children[1].textContent = at_s;
            selectedRow.children[2].textContent = bt_s;
            selectedRow = null;
            showAlert("Entry Updated", "info");
        }

        clearFields();
    }

});



exeInput.addEventListener('click', function exeAlgo(e) {
    e.preventDefault();

    var table = document.getElementById("rr_table2");

    ps.sort(function (a, b) { return a.at - b.at });
    q.push(0);
    visited[0] = true;

    while (completed != n) {
        index = q[0];
        q.shift();
        if (ps[index].bt_remaining == ps[index].bt) {
            ps[index].start_time = Math.max(current_time, ps[index].at);
            total_idle_time += (is_first_process == true) ? 0 : ps[index].start_time - current_time;
            current_time = ps[index].start_time;
            is_first_process = false;
        }

        if (ps[index].bt_remaining - tq > 0) {
            ps[index].bt_remaining -= tq;
            current_time += tq;
        }

        else {
            current_time += ps[index].bt_remaining;
            ps[index].bt_remaining = 0;
            completed++;
            ps[index].ct = current_time;
            ps[index].tat = ps[index].ct - ps[index].at;
            ps[index].wt = ps[index].tat - ps[index].bt;
            ps[index].rt = ps[index].start_time - ps[index].at;
            sum_tat += ps[index].tat;
            sum_wt += ps[index].wt;
            sum_rt += ps[index].rt;

            sum_ct += ps[index].ct;
        }

        for (var i = 1; i < n; i++) {
            if (ps[i].bt_remaining > 0 && ps[i].at <= current_time && visited[i] == false) {
                q.push(i);
                visited[i] = true;
            }
        }
        if (ps[index].bt_remaining > 0) {
            q.push(index);
        }

        if (q.length === 0) {
            for (let i = 1; i < n; i++) {
                if (ps[i].bt_remaining > 0) {
                    q.push(i);
                    visited[i] = true;
                    break;
                }
            }
        }
    }
    max_completion_time = -1;
    length_cycle = max_completion_time - ps[0].at;
    cpu_utilization = (length_cycle - total_idle_time) / length_cycle;

    let row_num = 0;

    ps.sort((a, b) => a.pid - b.pid);

    for (let i = 0; i < count; i++) {

        var row = table.getElementsByTagName("tr");
        var row = table.insertRow(i+1);

        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);

        cell0.innerHTML = `P${i + 1}`;
        cell1.innerHTML = `${ps[i].ct}`;
        cell2.innerHTML = `${ps[i].tat}`;
        cell3.innerHTML = `${ps[i].wt}`;
        cell4.innerHTML = `${ps[i].rt}`;




        if (row_num > count) {
            break;
        }

    }
    var avg_ct = document.getElementById("avg_ct");
    avg_ct.value = `${sum_ct / n}`;

    var avg_tat = document.getElementById("avg_tat");
    avg_tat.value = `${sum_tat / n}`;

    var avg_rt = document.getElementById("avg_rt");
    avg_rt.value = `${sum_rt / n}`;

    var avg_wt = document.getElementById("avg_wt");
    avg_wt.value = `${sum_wt / n}`;

    var avg_wt = document.getElementById("thrpt");
    avg_wt.value = `${n / length_cycle}`;

    var avg_wt = document.getElementById("cpu");
    avg_wt.value = `${cpu_utilization * 100}%`;
}


);


//Editing Data
document.querySelector("#rr_table").addEventListener("click", (e) => {
    t = e.target;
    if (t.classList.contains("edit")) {
        selectedRow = t.parentElement.parentElement;
        visited = new Array(100).fill(false);
        document.querySelector("#atimeinput").value = selectedRow.children[1].textContent;
        document.querySelector("#btimeinput").value = selectedRow.children[2].textContent;
    }

});


//Deleting the data
document.querySelector("#rr_table").addEventListener('click', (e) => {
    count--;
    var target = e.target;
    if (target.classList.contains("delete")) {
        col = target.parentElement;
        row = col.parentElement;
        rX = row.rowIndex;
        cX = col.cellIndex;
        target.parentElement.parentElement.remove();
        ps.splice(rX-1, 1);
        console.log(ps);
    }
});


//clearing output table
const delb = document.querySelector("#del");
delb.addEventListener('click', () => {
    var bodyRef = document.getElementById('rr_table2').getElementsByTagName('tbody')[0];
    bodyRef.innerHTML = '';
});




