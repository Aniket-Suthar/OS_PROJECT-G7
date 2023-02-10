// struct process_struct
// {
//   int pid;
//   int at;
//   int bt;
//   int ct, wt, tat, rt, start_time;
//   int bt_remaining;
// } ps[100];


// program to implement queue data structure

class Queue {
  constructor() {
      this.items = [];
  }
  
  // add element to the queue
  enqueue(element) {
      return this.items.push(element);
  }
  
  // remove element from the queue
  dequeue() {
      if(this.items.length > 0) {
          return this.items.shift();
      }
  }
  
  // view the last element
  peek() {
      return this.items[this.items.length - 1];
  }
  
  // check if the queue is empty
  isEmpty(){
     return this.items.length == 0;
  }
 
  // the size of the queue
  size(){
      return this.items.length;
  }

  // empty the queue
  clear(){
      this.items = [];
  }
}

class process_struct {
  constructor(pid, at, bt, ct, wt, tat, rt, start_time, bt_remaining) {
    this.pid = pid;
    this.at = at;
    this.bt=bt;
    this.ct = ct;
    this.wt = wt;
    this.tat = tat;
    this.rt = rt;
    this.start_time = start_time;
    this.bt_remaining = bt_remaining;
  }
}

const ps=new process_struct();

// bool comparatorAT(struct process_struct a,struct process_struct b)
// {
//    int x =a.at;
//    int y =b.at;
//    return x < y;
// //    if(x > y)
// //      return false;  // Apply sorting
// //    return true;   // no sorting
// }



// bool comparatorPID(struct process_struct a,struct process_struct b)
// {
//    int x =a.pid;
//    int y =b.pid;
//    return x < y;
// }


function comparatorAT (obj,obj){
    let x=obj.at;
    let y=obj.bt;
    return x<y;

}


function comparatorAT (obj,obj){
  let x=obj.pid;
  let y=obj.pid;
  return x<y;

}

// int n,index;
// int cpu_utilization;
// queue<int> q;
// bool visited[100]={false},is_first_process=true;
// int current_time = 0,max_completion_time;
// int completed = 0,tq, total_idle_time=0,length_cycle;
// cout<<"Enter total number of processes: ";
// cin>>n;    
// float sum_tat=0,sum_wt=0,sum_rt=0;

let index;
let cpu_utilization;
let q= new Queue();
const visited=[false];
var is_first_process=true;
let current_time=0,max_completion_time;
let completed=0,tq,total_idle_time=0,length_cycle;

let n = prompt("Enter the number of processes");
n=Number.parseInt(n);
var sum_tat=0,sum_wt=0,sum_rt=0;


// cout << fixed << setprecision(2);

// for(int i=0;i<n;i++)
// {
//     cout<<"\nEnter Process " <<i<< " Arrival Time: ";
//     cin >> ps[i].at;
//     ps[i].pid=i;
// }

// for(int i=0;i<n;i++)
// {
//     cout<<"\nEnter Process " <<i<< " Burst Time: ";
//     cin >> ps[i].bt;
//     ps[i].bt_remaining= ps[i].bt;
// }

// cout<<"\nEnter time quanta: ";
// cin>>tq;

for (let i = 0; i <n; i++) {
  // let a=
  // a=Number.parseInt(a);
  ps[i].at=prompt(`\n Enter the process ${i} Arrival time`)
   ps[i].pid=i;
}

for (let i = 0; i <n; i++) {
  // let b
  // b=Number.parseInt(b);
  ps[i].bt=prompt(`\n Enter the process ${i} Arrival time`);

  ps[i].bt_remaining= ps[i].bt;
 
}

 tq=prompt("\nEnter the time quanta");
 tq=Number.parseInt(tq);


//  sort(ps,ps+n,comparatorAT);
    
//  q.push(0);  
//  visited[0] = true;

//  while(completed != n) 
//  {
//    index = q.front();      
//    q.pop();
   
//    if(ps[index].bt_remaining == ps[index].bt)
//    {
//          ps[index].start_time = max(current_time,ps[index].at);
//          total_idle_time += (is_first_process == true) ? 0 : ps[index].start_time - current_time;
//          current_time =  ps[index].start_time;
//          is_first_process = false;
          
//    }


if(ps[index].bt_remaining-tq > 0)
{    
      ps[index].bt_remaining -= tq;
      current_time += tq;
}
else 
{
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


   sort(ps,ps+n,comparatorAT);

q.enqueue(0)
   visited[0]=true;

   while(completed!=0){
    index=q.peek();
    q.dequeue();

    if(ps[index].bt_remaining==ps[index].bt){
      ps[index].start_time = max(current_time,ps[index].at);
         total_idle_time += (is_first_process == true) ? 0 : ps[index].start_time - current_time;
         current_time =  ps[index].start_time;
         is_first_process = false;
    }

    if(ps[index].bt_remaining-tq > 0)
    {    
          ps[index].bt_remaining -= tq;
          current_time += tq;
    }
    else 
    {
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


      //check which new Processes needs to be pushed to Ready Queue from Input list
      for(vari = 1; i < n; i++) 
      {
          if(ps[i].bt_remaining > 0 && ps[i].at <= current_time && visited[i] == false) 
          {
            q.push(i);
            visited[i] = true;
          }
      }
      //check if Process on CPU needs to be pushed to Ready Queue
      if( ps[index].bt_remaining> 0) 
          q.push(index);
            
      //if queue is empty, just add one process from list, whose remaining burst time > 0
      if(q.empty())
      {
          for(var i = 1; i < n; i++)
          {
            if(ps[i].bt_remaining > 0)
            {
              q.push(i);
              visited[i] = true;
              break;
            }
          }
      }
    
   }  //end of while
   
   //Calculate Length of Process completion cycle
  max_completion_time = INT_MIN;
  
  for(var i=0;i<n;i++)
        max_completion_time = max(max_completion_time,ps[i].ct);
      
  length_cycle = max_completion_time - ps[0].at;  //ps[0].start_time; 
    
  cpu_utilization = (float)(length_cycle - total_idle_time)/ length_cycle;

  //sort so that process ID in output comes in Original order (just for interactivity- Not needed otherwise)  
  sort(ps, ps+n , comparatorPID);

  //Output
  console.log("\nProcess No.\tAT\tCPU Burst Time\tStart Time\tCT\tTAT\tWT\tRT\n");
  for(var i=0;i<n;i++)
  console.log(`${i} \t\t ps[i].at\t ps[i].bt\t\tps[i].start_time\t\tps[i].ct \tps[i].tat \tps[i].wt\tps[i].rt \n`);


  console.log(`\nAverage Turn Around time=  ${sum_tat/n}`);
  console.log(`\nAverage Waiting Time= $(sum_wt/n}`);
  console.log(`\nAverage Response Time= ${sum_rt/n}`);    
 console.log(`\nThroughput ${length_cycle}`);
  console.log(`\nCPU Utilization(Percentage)= ${cpu_utilization*100}`);