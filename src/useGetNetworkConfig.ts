import axios from "axios";
import { useEffect, useState } from "react";

interface NetworkConfig{
    connectionName:string,
    Dhcp:boolean,
    enabled: boolean,
    connectionAddress:string,
    subnetMask:string,

}
function useGetNetworkConfig(id:string){
    const [networkConfig,setNetworkConfig] = useState<NetworkConfig[]|null>(null)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const ipAddress = `192.168.10.2${id}`
                    const config = {
                        method:"post",
                        maxBodyLength: Infinity,
                        url:"http://localhost:8080/api/snmp/network",
                        headers: {
                            "Content-type":"text/plain",
                        },
                        data:ipAddress,
                    }
                    const response = await axios(config);
                    if (response.status !== 200){
                        setNetworkConfig(null)
                    }
                    if (response.data.length ===0 ){
                        setNetworkConfig(null)
                    }else {
                    setNetworkConfig(response.data);
                    }
                }
                catch (error){
                    console.log(error.data)
                }
            }
            fetchData()
        },[]
    )
    return networkConfig
}
export default useGetNetworkConfig