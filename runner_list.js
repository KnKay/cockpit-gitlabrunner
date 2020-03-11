function list() {
    var proc = cockpit.spawn([ "gitlab-runner", "list"], {superuser:"require", err:"out"});    
    proc.done(extract_info);
    proc.fail(log)
}

function extract_info(data){    
    //Clean up the color stuff
    data = data.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
    //Split the string, remove the first 2 (as they are strange information not used as well as the last)
    data = data.split("\n");    
    data.splice(0,2);
    data.splice(data.length-1,1);
    //Explode on whiteespace and remove them!
    var retval = []
    data.forEach(element => {
        element = element.split(" ");    
        retval.push({name:element[0], token:element[element.length - 2], executor: element[element.length - 3]})        
    })    
    runner_table(retval);
}

function log(data){
    console.log(data);
}

function runner_table(runners){
    headers = ['Name' , 'Executor', 'Token']
    var output = document.getElementById("runners");
    var table = document.getElementById("runnersList");
    
    runners.forEach(runner=>{        
        body = document.createElement("tbody");        
        tr = body.insertRow(-1);
        tr.classList.add("listing-ct-item");
        tr.setAttribute("data-row-id", runner.token.split('=')[1]);
        tr.setAttribute("data", runner);
        var td_name = document.createElement("td");
        var td_executor = document.createElement("td");
        var td_token = document.createElement("td");
        var empty = document.createElement("td");
        td_name.innerHTML = runner.name;
        td_executor.innerHTML = runner.token.split('=')[1];
        td_token.innerHTML = runner.executor.split('=')[1];
        empty.innerHTML="DELETE Link!";
        tr.appendChild(td_name);
        tr.appendChild(td_executor);
        tr.appendChild(td_token);
        tr.appendChild(empty);
        table.appendChild(body);
    })
    
}