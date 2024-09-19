import axios from "axios";
import { useEffect, useState } from "react"

interface Program {
    name:string,
    type:string,
    isSelected:boolean,
    number:string
}
function useGetPrograms(id:string){
    const [programs,setPrograms] = useState<Program[]|null>(null)
    useEffect(
        () =>{
            const fetchData = async () =>{
                try {
                  const data = `192.168.10.2${id}`;

                  const config = {
                    method: "post",
                    maxBodyLength: Infinity,
                    url: "http://localhost:8080/api/snmp/programs",
                    headers: {
                      "Content-Type": "text/plain",
                    },
                    data: data,
                  };
                  const response = await axios(config);
                  if (response.status !== 200) {
                    throw new Error(
                      "Request failed with status " + response.status
                    );
                  }
                  if (response.data.length ===0){
                    setPrograms(null)
                  }else { setPrograms(response.data)}
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
        },[]
    )
    return programs
}
export default useGetPrograms