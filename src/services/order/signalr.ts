import * as signalR from "@microsoft/signalr";
const URL = "http://localhost:5050/order";

class Connector {
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (method: string, params: any) => void) => void;
    public startCallback: (updateConnectionStatus: (status: string) => void) => void;
    static instance: Connector;
        
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build();
        this.startCallback = (updateConnectionStatus) => {
            this._start(updateConnectionStatus);
            this.connection.onclose(() => {
                updateConnectionStatus(this.connection.state);
            });
        };
        this.events = (onMessageReceived) => {
            this.connection.on("UpdateDriverPosition", (params: any) => {
                onMessageReceived("UpdateDriverPosition", params);
            });
        };
    }

    public finishConnection = () => {
        this.connection.stop();
    }

    private _start = async (updateConnectionStatus: (status: string) => void) => {
        try {
            await this.connection.start();
            updateConnectionStatus(this.connection.state);
        } catch (err) {
            console.log(err);
            updateConnectionStatus(this.connection.state);
        }
    }

    public joinRoom = (roomName: string) => {
        if (this.connection.state !== "Connected") return;
        this.connection.send("joinRoom", roomName).then(x => console.log("User joined room"))
    }
    
    public leaveRoom = (roomName: string) => {
        if (this.connection.state !== "Connected") return;
        this.connection.send("leaveRoom", roomName).then(x => console.log("User left room"))
    }
    
    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}
export default Connector.getInstance;