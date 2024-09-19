import axios from "axios"
import { useEffect, useState } from "react"

interface SystemInfo{
    serialNumber:string,
    name:string,
    systemVersion:string,
    systemTime:string,
    temperature:string
}

function useGetSystemInfo(id:string){
    const [systemInfo,setSystemInfo] = useState<SystemInfo|null>(null)
    useEffect(
        () =>{
            const fetchData = async () =>{
                try {
                    const ipAddress = `192.168.10.2${id}`
                    const config = {
                        method:"post",
                        maxBodyLength: Infinity,
                        url:"http://localhost:8080/api/snmp/systemInfo",
                        headers: {
                            "Content-type":"text/plain",
                        },
                        data:ipAddress,
                    }
                const response = await axios(config);
                if (response.status !== 200){
                    setSystemInfo(null)
                }else{
                    setSystemInfo(response.data)
                }
                } catch (error) {
                   console.log(error) 
                }
            }
            fetchData()
        },[]
    )
    return systemInfo
}
export default useGetSystemInfo