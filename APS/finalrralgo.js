



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
var visited = new Array(100).fill(false);
var is_first_process = true;
var current_time = 0, max_completion_time;
var completed = 0, tq, total_idle_time = 0, length_cycle;
console.log("Enter total number of processes: ");
n = parseInt(prompt());

var sum_tat = 0, sum_wt = 0, sum_rt = 0;
for (var i = 0; i < n; i++) {
    console.log("\nEnter Process " + i + " Arrival Time: ");
    ps[i].at = parseInt(prompt());
    ps[i].pid = i;
}

for (var i = 0; i < n; i++) {
    console.log("\nEnter Process " + i + " Burst Time: ");
    ps[i].bt = parseInt(prompt());
    ps[i].bt_remaining = ps[i].bt;
}
console.log("\nEnter time quanta: ");
tq = parseInt(prompt());

// for (let i = 0; i < n; i++) {
//     console.log(ps[i].bt_remaining);
//     typeof(ps[i].bt_remaining);

// }


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

ps.sort((a, b) => a.pid - b.pid);

console.log("ProcessNo.\tAT\tCPUBurstTime\tStartTime\t\tCT\t\t\tTAT\t\t\tWT\t\t\tRT");
for (let i = 0; i < n; i++) {
    console.log(`${i}\t\t \t${ps[i].at}\t\t ${ps[i].bt}\t\t  \t ${ps[i].start_time}\t\t \t\t${ps[i].ct}\t\t\t${ps[i].tat}\t\t\t${ps[i].wt}\t\t\t${ps[i].rt}`);
}

console.log(`\n Average Turn Around time= ${sum_tat / n}`);
console.log(`\n Average Waiting Time= ${sum_wt / n}`);
console.log(`\n Average Response Time= ${sum_rt / n}`);
console.log(`\n Throughput= ${n / length_cycle}`);
console.log(`\n CPU Utilization(Percentage)=${cpu_utilization * 100}`)