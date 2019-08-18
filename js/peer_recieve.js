var peer_connection;
var connection_url;


// Connect to Cloud
var peer = new Peer();
peer.on('open', function(id) {
    document.getElementById("connection_id").innerHTML = id
    cloud_status("online")
   // update connection url
   connection_url = window.location.protocol+'//' + window.location.hostname+(window.location.port ? ':' + window.location.port: '')+"/nanocalling/make_call.html?remote_id="+id;
   //console.log(connection_url);
   create_share_links(connection_url);
   //$('.nav-tabs a[href="#message"]').tab('show');
});

// Recieve External Connection
peer.on('connection', (conn2) => {
    conn2.on('open', () => {
        peer_status("online");
        peer_connection = conn2;
        $('.nav-tabs a[href="#message"]').tab('show');
        // Recieving Data from Connected Peer
        conn2.on('data', function(data) {
            //$('.nav-tabs a[href="#message"]').tab('show');
            //console.log('Received', data);
            var msg_data = `<p class="alert alert-success" style="text-align:right;">`+data+`</p>`;
            display_message(msg_data)
        });

        // Connection Closed 
        conn2.on('close',function(){
          peer_status("offline");
          status_message("Peer diconnected")
        })  
    });
});

// Send Message to Connected Peer
function send_message(){
    var msg = document.getElementById("msg_text").value;
    if(msg){
        var msg_data = `<p class="alert alert-info" style="text-align:left;">`+msg+`</p>`;
        display_message(msg_data)
        peer_connection.send(msg);
        document.getElementById("msg_text").value = "";
    }
}