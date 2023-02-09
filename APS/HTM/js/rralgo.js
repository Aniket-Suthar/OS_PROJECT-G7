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
let burst_times = [];
let arr_times = [];

btnAdd.addEventListener('click', function addRow(e){
    e.preventDefault();
    qt_s = qtInput.value;
    let bt_s = btInput.value;
    let at_s = atInput.value;
    let at;
    let bt;
    
    if(qt_s == '' || bt_s == '' || at_s == ''){
        window.alert("Please enter all the fields!");
    }
    else if(qt_s == '0'){
        window.alert("Quantum time cannot be 0. Please try again");
    }else if(bt_s == '0'){
        window.alert("Burst time cannot be 0. Please try again");
    }
    else{     
        count++;
        document.getElementById("qtinput").readOnly = true;
        let num = count.toString();
        let pno_2 = pno.concat(num); 
        var table = document.getElementById("rr_table");
        var row = table.insertRow(count);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);      
        cell0.innerHTML = pno_2;
        cell1.innerHTML = at_s;
        cell2.innerHTML = bt_s;
        atInput.value = '';
        btInput.value = '';
        at = parseInt(at_s);
        bt = parseInt(bt_s);
        qt = parseInt(qt_s);
        if(bt == 0){
            zero_present = true;
        }
        burst_times.push(bt);
        arr_times.push(at);
    }
});

delInput.addEventListener('click', function deleteRow(e){
    e.preventDefault();
    if(count==0){
        window.alert("Table is already empty");
    }else{    
        table.deleteRow(count);
        count--;
        burst_times.length = burst_times.length - 1;
        arr_times.length = arr_times.length - 1;
    }
});


exeInput.addEventListener('click', function exeAlgo(e){
    e.preventDefault();
    
    let  cnt,j, n, ct, remain, flag=0, tq;
    let row_num = 1;
    let t_wt = 0, t_tat=0, t_ct=0, t_rt =0;
    let tat, wt;
    tq = qt;
    let resp_time = [];
    let at = arr_times;
    let rt = burst_times.slice(0);
    n = count;
    let visited = new Array(n+1).join('0').split('').map(parseFloat);
    remain = n;
    var table = document.getElementById("rr_table"); 
    for(ct =0, cnt = 0; remain!=0;){
        //if process has burst time less than equal to quantum time and has not been fully executed yet
        if(rt[cnt]<=tq && rt[cnt]>0){
            if(visited[cnt] == 0){
                resp_time.push(ct-at[cnt]);
                visited[cnt] = 1;
            }
            ct = ct + rt[cnt];
            rt[cnt] = 0;
            flag = 1;     
        //process has burst time greater than quantum time and has not been fully executed yet
        }else if(rt[cnt] > 0){
            if(visited[cnt] == 0){
                visited[cnt] = 1;
                resp_time.push(ct-at[cnt]);
            }
            rt[cnt] = rt[cnt] - tq;
            ct = ct + rt[cnt]+qt;  
        }
        //if process has been fully executed. 
        if(rt[cnt] == 0 && flag == 1){
            //no of processes remaining
            tat = ct-at[cnt];
            wt = tat- burst_times[cnt];
            t_wt = t_wt + wt;
            t_ct = t_ct + ct;
            t_tat = t_tat + tat;
            
            remain--;
            var row = table.getElementsByTagName("tr")[row_num];
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            var cell5 = row.insertCell(5);
            cell3.innerHTML = ct;
            cell4.innerHTML = ct - at[cnt];
            cell5.innerHTML = ct - at[cnt] - burst_times[cnt];    
            if(row_num <= count){
                row_num++;
            }
            //set to 0 for next process
            flag = 0;
        }
        //last element has been executed once. so we will check from the beginning if any process has been 
        //left to be fully executed
        if(cnt == n-1){
            cnt = 0;
        //if next process had arrival time less than or equal to time elapsed
        }else if(at[cnt+1]<=ct){
            cnt++;
        }else{
            cnt = 0;
        }
    }
    for(i = 0; i<n; i++){
        var table = document.getElementById("rr_table"); 
        var row = table.getElementsByTagName("tr")[i+1];
        var cell6 = row.insertCell(6);
        cell6.innerHTML = resp_time[i];
        t_rt = t_rt + resp_time[i];
    }
    var avg_ct = document.getElementById("avg_ct");
    avg_ct.value = t_ct/n;
    var avg_tat = document.getElementById("avg_tat");
    avg_tat.value = t_tat/n;
    var avg_rt = document.getElementById("avg_rt");
    avg_rt.value = t_rt/n;
    var avg_wt = document.getElementById("avg_wt");
    avg_wt.value = t_wt/n;
}); 
