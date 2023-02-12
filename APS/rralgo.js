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
let delInput = document.querySelector('#delete');
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
var completed = 0, tq, total_idle_time = 0, length_cycle = 0;

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
            // var cell3 = row.insertCell(3);

            cell0.innerHTML = pno_2;
            cell1.innerHTML = at_s;
            cell2.innerHTML = bt_s;
            //     cell3.innerHTML = ` <td>
            // <button class="btn btn-warning btn-sm edit">Edit</button><td>`;
            // <button class="btn btn-danger btn-sm delete">Delete</button>

            showAlert("Entry Added", "success");

            atInput.value = '';
            btInput.value = '';

            atv = parseInt(at_s);
            btv = parseInt(bt_s);
            qtv = parseInt(qt_s);

            ps[count - 1].at = atv;
            ps[count - 1].pid = count - 1;
            ps[count - 1].bt = btv;
            ps[count - 1].bt_remaining = btv;

            tq = qtv;

            selectedRow = null;

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











// btnAdd.addEventListener('click', function addRow(e) {
//     e.preventDefault();
//     qt_s = qtInput.value;
//     let bt_s = btInput.value;
//     let at_s = atInput.value;
//     let at;
//     let bt;

//     if (qt_s == '' || bt_s == '' || at_s == '') {
//         window.alert("Please enter all the fields!");
//     }
//     else if (qt_s == '0') {
//         window.alert("Quantum time cannot be 0. Please try again");
//     }
//     else if (qt_s < 0) {
//         window.alert("Quantum time cannot be negative Please try again");
//     }
//     else if (bt_s == '0') {
//         window.alert("Burst time cannot be 0. Please try again");
//     }
//     else if (bt_s < 0) {
//         window.alert("Burst time cannot be negative Please try again");
//     }
//     else if (at_s < 0) {
//         window.alert("Arrival time cannot be negative Please try again");
//     }
//     else {
//         count++;
//         visited = new Array(100).fill(false);
//         document.getElementById("qtinput").readOnly = true;
//         let num = count.toString();
//         let pno_2 = pno.concat(num);
//         var table = document.getElementById("rr_table");
//         var row = table.insertRow(count);
//         var cell0 = row.insertCell(0);
//         var cell1 = row.insertCell(1);
//         var cell2 = row.insertCell(2);
//         var cell3 = row.insertCell(3);

//         cell0.innerHTML = pno_2;
//         cell1.innerHTML = at_s;
//         cell2.innerHTML = bt_s;
//         cell3.innerHTML = ` <td>
//         <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
//         <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
//         <td>`;

//         atInput.value = '';
//         btInput.value = '';

//         at = parseInt(at_s);
//         bt = parseInt(bt_s);
//         qt = parseInt(qt_s);

//         ps[count - 1].at = at;
//         ps[count - 1].pid = count - 1;
//         ps[count - 1].bt = bt;
//         ps[count - 1].bt_remaining = ps[count - 1].bt;

//         tq = qt;
//     }
//     n = count;
// });

// delInput.addEventListener('click', function deleteRow(e) {
//     e.preventDefault();
//     if (count == 0) {
//         window.alert("Table is already empty");
//     } else {
//         table.deleteRow(count);
//         count--;
//         burst_times.length = burst_times.length - 1;
//         arr_times.length = arr_times.length - 1;
//     }
// });


exeInput.addEventListener('click', function exeAlgo(e) {
    e.preventDefault();

    // visited = new Array(100).fill(false);
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
    length_cycle = Math.abs(max_completion_time - ps[0].at);
    cpu_utilization = (length_cycle - total_idle_time) / length_cycle;

    let row_num = 0;

    ps.sort((a, b) => a.pid - b.pid);

    for (let i = 0; i < n; i++) {
        row_num++;

        var row = table.getElementsByTagName("tr");
        var row = table.insertRow(row_num);
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




        if (row_num >= count) {
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
        // visited = new Array(100).fill(false);
        document.querySelector("#atimeinput").value = selectedRow.children[1].textContent;
        document.querySelector("#btimeinput").value = selectedRow.children[2].textContent;
    }





});


//Deleting the data
// delInput.addEventListener('click', (e) => {
//     const tb = document.getElementById("rr_table")

//     if (count == 0) {
//         window.alert("Table is already empty");
//     }
//     else {

//         tb.deleteRow(count);
//         // tb2.deleteRow(count);
//         // ps.shift();
//        ps.pop();
//         // visited[count]=false;
//         count--;




//         // t.parentElement.parentElement.remove();
//         showAlert("Entry Deleted", "danger");
//     }

// });

// delInput.addEventListener('click', function deleteRow(e){
//     e.preventDefault();
//     if((count)==0){
//         // count=-1;
//         window.alert("Table is already empty");
//     }else{    
//         const tb=document.getElementById("rr_table")
//         tb.deleteRow(count);
//         // ps=ps.slice(0,n);
//         // visited[count]=false;
//         count--;



//     }
// });



//clearing output table
var delb = document.querySelector("#del");
delb.addEventListener('click', () => {
    const tb2 = document.getElementById("rr_table2")
    var rowCount = tb2.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        tb2.deleteRow(i);
    }
    //    n--;
    //    count=0;



});

// var delb2 = document.querySelector("#del2");
// delb2.addEventListener('click', () => {
//     const tb = document.getElementById("rr_table")
//     var rowCount =tb.rows.length;
//         for (var i = rowCount - 1; i > 0; i--) {
//             tb.deleteRow(i);
//         }
//         count=0;
// });






