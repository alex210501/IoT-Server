# IoT-Server

## Starting with the server

### Connection to 'thethingsnetwork'

- To try the server you'll need to connect to the following page : [Site](https://www.thethingsnetwork.org/)
- Then go to 'Appilcations' and select 'room-quality'
- Click on 'End devices' and then click on 'device-1'
- Click on 'Messaging', here you are. You'll now be able to simulate an uplink to the server.
- But you'll need to start the server first ( before clicking on 'simulate uplink' ).

### Launching the server

- Go the the following folder : [Folder](/IoT-Server/).
- Open a terminal ( take car that the current folder you're into on the terminal is 'IoT-Server' because it'll not work otherwise).
- You can now start the server with the command : 'npm start'
- As you can see the server is reachable on the port 8080
- You'll now be able to simulate uplink from the previous site and get the informations on the API ( go the the previous site and click now on 'simulate uplink')
- To reach the API open a new tab on your browser and enter this link : "YourIPAddress:8080" for example : "192.168.0.3:8080"
