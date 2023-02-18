//total processes
const totalProcesses =  3;
let counter = 0;

//total resources alloted for each resource
const total_arr = [5, 5, 5];

//allocated resources to each process at the beginning
const allocation_arr_A = [1, 2, 2];
const allocation_arr_B = [2, 0, 2];
const allocation_arr_C = [1, 1, 1];

//resources required for execution 
const remaining_arr_A = [];
const remaining_arr_B = [];
const remaining_arr_C = [];

//maximum resources needed for execution of a process
const maxNeed_A = [2, 2, 3];
const maxNeed_B = [2, 1, 4];
const maxNeed_C = [4, 3, 1];

//total resources of each resource at the beginning
let totalall_A = 0;
let totalall_B = 0;
let totalall_C = 0;

//sequence of safe execution of processes
const sequence = [];

//avaliable resources 
const availaible = [];

//to check number of processes which have not been executed
let remaining = totalProcesses;

//to check for deadlock
let checked = 0;
let deadlock = false;

const completed = [];
for(let i = 0; i<totalProcesses; i++){
    completed[i] = 0;
}

//calculating total resources allocated to each resource and calculating remaining resource for each process
for(let i = 0; i<totalProcesses; i++){
    totalall_A += allocation_arr_A[i];
    totalall_B += allocation_arr_B[i];
    totalall_C += allocation_arr_C[i];
    
    remaining_arr_A.push(maxNeed_A[i] - allocation_arr_A[i]);
    remaining_arr_B.push(maxNeed_B[i] - allocation_arr_B[i]);
    remaining_arr_C.push(maxNeed_C[i] - allocation_arr_C[i]);
}

//resources allocated to processes cant be more than available resources
if(totalall_A > total_arr[0] || totalall_B > total_arr[1] || totalall_C > total_arr[2]){
   
}else{
    console.log("Valid");
    // console.log(remaining_arr_C);
    //calculating initial remaining resources
    availaible.push(total_arr[0] - totalall_A);
    availaible.push(total_arr[1] - totalall_B);
    availaible.push(total_arr[2] - totalall_C);
    while(remaining != 0){
        if(checked == remaining){
            deadlock = true;
            console.log("Entered deadlock block");
            break;
        }
        //if avalaible resources are greater than or equal to remaining/required resources
        if(availaible[0]>=remaining_arr_A[counter] && availaible[1]>=remaining_arr_B[counter] && availaible[2]>=remaining_arr_C[counter] && completed[counter] == 0){
            sequence.push(counter);
            //adding the freed resources of the executed process to the availaible resources
            availaible[0] += allocation_arr_A[counter];
            availaible[1] += allocation_arr_B[counter];
            availaible[2] += allocation_arr_C[counter];
            //changing completed bit to 1 to indicate process has been executed
            completed[counter] = 1;
            //iterating between 0 to totalprocess-1
            counter = (counter+1)%totalProcesses;
            remaining--;
            checked = 0;
        }else if(completed[counter] == 1){
            counter = (counter+1)%totalProcesses;
        }else{
            if(counter == totalProcesses - 1){
                checked = 0;
            }else{
                checked++;
            }
            counter = (counter+1)%totalProcesses;
        }
    }
}

if(deadlock == true){
    console.log("Deadlock encountered!");
}else{
    console.log("The safe Sequence is:")
    console.log(sequence);
} 