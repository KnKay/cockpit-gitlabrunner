function on(){
    document.getElementById("overlay").style.display = "block";
}

function off(){
    document.getElementById("overlay").style.display = "none";
}

function shell_selected(){
    console.log("Shell");
    var inpu = document.getElementById("imageRow")
    inpu.style.display = 'none'
    var inpu = document.getElementById("imageRow2")
    inpu.style.display = 'none'
}

function docker_selected()
{
    console.log("dockjer");
    var inpu = document.getElementById("imageRow")
    inpu.style.display = 'inline'
    var inpu = document.getElementById("imageRow2")
    inpu.style.display = 'inline'
}

function register(){
    console.log("submitted!")
}

function registered(){
    list()
}