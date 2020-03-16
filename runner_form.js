function on(){
    document.getElementById("overlay").style.display = "block";
}

function off(){
    document.getElementById("overlay").style.display = "none";
}

function shell_selected(){    
    var inpu = document.getElementById("imageRow")
    inpu.style.display = 'none'
    var inpu = document.getElementById("imageRow2")
    inpu.style.display = 'none'
}

function docker_selected()
{    
    var inpu = document.getElementById("imageRow")
    inpu.style.display = 'inline'
    var inpu = document.getElementById("imageRow2")
    inpu.style.display = 'inline'
}

function register(){    
    var formElement = document.forms["runnerForm"];    
    console.log(formElement["type"].value)
    
    var args = [
        "gitlab-runner", "register",
        "--non-interactive",        
        '--url '+formElement["server"].value, 
        '--registration-token'+formElement["token"].value,
        '--description '+formElement["name"].value,        
        '--executor '+ formElement["type"].value,
        '--locked="false"',
    ]
    /*, 
        '--url "'+formElement["server"].value+'"',        
        '--description="'+formElement["name"].value+'"',
        '--registration-token "'+formElement["token"].value+'"',
        '--executor "'+ formElement["type"].value +'"'   
        "--run-untagged=\"false\"",
        "--locked=\"false\"",
        "--access-level=\"not_protected\" ",
        "--template-config /etc/gitlab-runner/config_templ.toml" 
    ]
    */
        console.log (args)
    //If we have a docker executor we add the image
    if(formElement["type"].value === "docker")
    {
        args.append("--docker-image \""+ formElement["image"].value +"\" ",)
    }

    var proc = cockpit.spawn(args, {superuser:"require"}
    );
        
    proc.done(registered);
    proc.fail(log);

}

function registered(data){
    console.log(data)
}

function no_reg(data)
{
    console.log(data)
}