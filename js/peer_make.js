var peer_connection;

// Connect to Cloud
var peer = new Peer();
peer.on('open', function(id) {
    document.getElementById("connection_id").innerHTML = id
    cloud_status("online");

    // Check for connection Url
    var get_par = window.location.search.substr(1)
    if(get_par){
        var remote_id_get_par = get_par.split("=")[1]
        document.getElementById("peer_id").value = remote_id_get_par
        connect_peer()
    }

});

function connect_peer(){
    var peer_id = document.getElementById("peer_id").value
    peer_connection = peer.connect(peer_id);
    peer_connection.on('open', function() {
        status_message("Successfully connected to peer")
        $('.nav-tabs a[href="#message"]').tab('show');
        peer_status("online");
        // Receive messages
        peer_connection.on('data', function(data) {
            //$('.nav-tabs a[href="#message"]').tab('show');
            var msg_data = `<p class="alert alert-success" style="text-align:right;">`+data+`</p>`;
            display_message(msg_data);
        }); 

        peer_connection.on('close',function(){
            // Change the status icon
            status_message("Peer disconnected")
            peer_status("offline");
        })   
    });

    document.getElementById("peer_id").value = ""
}

function send_message(){
    var msg = document.getElementById("msg_text").value;
    if(msg){
        var msg_data = `<p class="alert alert-info" style="text-align:left;">`+msg+`</p>`;
        display_message(msg_data)
        peer_connection.send(msg);
        document.getElementById("msg_text").value = "";
    }
}