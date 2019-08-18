
// Status Message Modal
function status_message(msg){
    document.getElementById("status_message").innerHTML = msg;
    $('#status_modal').modal("show");
    setTimeout(function(){
        $('#status_modal').modal("hide");
    },1000);
}

// Setting Cloud Status
function cloud_status(status){
    if(status="online"){
        // Set Cloud Status Icon
        document.getElementById('cloud_status').innerHTML = `
        <i class="material-icons btn-outline-success"  title="cloud connection status">public</i> 
        `;
    }
    else{
        document.getElementById('cloud_status').innerHTML = `
        <i class="material-icons btn-outline-danger"  title="cloud connection status">public</i> 
        `;
    }
}

//Setting Peer Status
function peer_status(status){
    if(status == "online"){
        // Connection Online
        document.getElementById('peer_status').innerHTML = `
        <i class="material-icons btn-outline-success"  title="peer connection status" >check_circle_outline</i> 
        `;
    }
    else{
        // Connection offline
        document.getElementById('peer_status').innerHTML = `
        <i class="material-icons btn-outline-danger"  title="peer connection status" >highlight_off</i> 
        `;
    }
}

//Display message
function display_message(msg_data){
    var prev_data = document.getElementById("msg-field").innerHTML
    document.getElementById("msg-field").innerHTML = msg_data + prev_data;
}

// Copy to Clipboard
function copy_text(data){
    // Create new element
   var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = data;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(el);
   status_message("Link copied to clipboard.")
}


// Create Share Links
function create_share_links(url){
    var buff = `
    <button class="btn btn-outline-primary" onclick="copy_text('`+url+`')">
        <i class="material-icons" >share</i>
    </button>&nbsp;
    <a href="https://api.whatsapp.com/send?text=`+url+`" data-action="share/whatsapp/share" class="btn btn-outline-success">
        <i class="fa fa-whatsapp" style="font-size:20px"></i>
    </a>
    `;
    document.getElementById("share_links").innerHTML = buff;
}