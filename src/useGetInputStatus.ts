import { useEffect, useState } from "react";
import { InputStatus } from "./inputStatus";
import axios from "axios";

function useGetInputStatus(id:string){
    const [inputStatus,setInputStatus] = useState<InputStatus|null>(null);
    useEffect(
        () =>{
            const fetchData = async ()=>{
                try {
                  const data = `192.168.10.2${id}`;

                  const config = {
                    method: "post",
                    maxBodyLength: Infinity,
                    url: "http://localhost:8080/api/snmp/inputStatus",
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
                  setInputStatus(response.data);
                } catch (error) {
                    console.log(error.data)
                }

            }
            fetchData()
        },[]
    )
    return inputStatus
}
export default useGetInputStatus