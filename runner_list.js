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
    var table = document.getElementById("runnersList");
    var all = document.getElementsByClassName("runner");    
    if (all.length > 0){
        let arry = Array.from(all)
        arry.forEach(element => {            
            element.remove();
        })        
    }
    runners.forEach(runner=>{        
        body = document.createElement("tbody");        
        body.classList.add("runner");
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
        empty.innerHTML="<button class=\"btn btn-danger btn-delete pficon pficon-delete\" onclick=\"ask('"+runner.name+"')\"></button>";
        tr.appendChild(td_name);
        tr.appendChild(td_executor);
        tr.appendChild(td_token);
        tr.appendChild(empty);
        table.appendChild(body);
    })
}

function ask(name, token, host)
{
    var r = confirm("Löschen von "+name);
    if (r == true) {
        unregister(name, token, host);
    } else {
      
    }
}
//ToDo: Wie macht man das?
//We need to run the purge! 
function unregister(name, token, host){
    console.log(name);
    var proc = cockpit.spawn([ "gitlab-runner", "unregister","--name", name], {superuser:"require", err:"out"});
}

function unregistered(data)
{
    log(data);
    list();
}

