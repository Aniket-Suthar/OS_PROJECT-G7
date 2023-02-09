const queueUpdation = (queue, timer, arrival, n, maxProccessIndex) => {
    let zeroIndex;
    for (let i = 0; i < n; i++) {
        if (queue[i] == 0) {
            zeroIndex = i;
            break;
        }
    }
    queue[zeroIndex] = maxProccessIndex + 1;
}

const queueMaintainence = (queue, n) => {
    for (let i = 0; (i < n - 1) && (queue[i + 1] != 0); i++) {
        let temp = queue[i];
        queue[i] = queue[i + 1];
        queue[i + 1] = temp;
    }
}

const checkNewArrival = (timer, arrival, n, maxProccessIndex, queue) => {
    if (timer <= arrival[n - 1]) {
        let newArrival = false;
        for (let j = (maxProccessIndex + 1); j < n; j++) {
            if (arrival[j] <= timer) {
                if (maxProccessIndex < j) {
                    maxProccessIndex = j;
                    newArrival = true;
                }
            }
        }
        if (newArrival)
            queueUpdation(queue, timer, arrival, n, maxProccessIndex);
    }
}

let n = 4;
let tq = 2;
let timer = 0;
let maxProccessIndex = 0;
let avgWait = 0;
let avgTT = 0;
const wait = [];
const turn = [];
const queue = [];
const temp_burst = [];
const complete = [];
const response = [];
const arrival = [0, 1, 2, 3];
const burst = [5, 4, 2, 1];

for (let i = 0; i < n; i++) {
    temp_burst[i] = burst[i];
}

for (let i = 0; i < n; i++) {
    complete[i] = false;
    queue[i] = 0;
}
while (timer < arrival[0])
    timer++;
queue[0] = 1;

while (true) {
    let flag = true;
    for (let i = 0; i < n; i++) {
        if (temp_burst[i] != 0) {
            flag = false;
            break;
        }
    }
    if (flag)
        break;

    for (let i = 0; (i < n) && (queue[i] != 0); i++) {
        let ctr = 0;
        while ((ctr < tq) && (temp_burst[queue[0] - 1] > 0)) {
            temp_burst[queue[0] - 1] -= 1;
            timer += 1;
            ctr++;

            checkNewArrival(timer, arrival, n, maxProccessIndex, queue);
        }
        if ((temp_burst[queue[0] - 1] == 0) && (complete[queue[0] - 1] == false)) {
            turn[queue[0] - 1] = timer;
            complete[queue[0] - 1] = true;
        }

        let idle = true;
        if (queue[n - 1] == 0) {
            for (let i = 0; i < n && queue[i] != 0; i++) {
                if (complete[queue[i] - 1] == false) {
                    idle = false;
                }
            }
        }
        else
            idle = false;

        if (idle) {
            timer++;
            checkNewArrival(timer, arrival, n, maxProccessIndex, queue);
        }

        queueMaintainence(queue, n);
    }
}

for (let i = 0; i < n; i++) {
    turn[i] = turn[i] - arrival[i];
    wait[i] = turn[i] - burst[i];
}

let sum = 0;

for (let i = 0; i < n; i++) {
    
    sum = burst[i];

    response[i]= burst[i] - arrival[i];
}

//staring is 0 so first response is zero after brust-arrival i tried but not prper logic come 

console.log(`Time Quanta : ${tq}`);
console.log(`Number of Processes : ${n}`);
console.log(`Arrival Time of Processes : ${arrival}`);
console.log(`Burst Time of Processes : ${burst}`);

console.log("\nProgram No.\tArrival Time\tBurst Time\tWait Time\tTurnAround Time\tResponse Time\n");

for (let i = 0; i < n; i++) {
    console.log(`${i + 1}\t\t\t ${arrival[i]}\t\t\t ${burst[i]}\t\t\t\t ${wait[i]} \t\t\t\t ${turn[i]} \t\t\t\t ${response[i]}\n`);
}

for (let i = 0; i < n; i++) {
    avgWait += wait[i];
    avgTT += turn[i];
}

console.log(`\nAverage wait time : ${avgWait / n}`);
console.log(`\nAverage Turn Around Time : ${avgTT / n}`);