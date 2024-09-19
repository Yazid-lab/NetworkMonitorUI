import { useState,useEffect } from "react";
import axios from "axios";
import { inputConfig } from "./inputConfig";


function useGetInputConfig(id:string){
    const [inputConfigData,setInputConfigData] = useState<inputConfig | null>(null);
    useEffect(
        () =>{
            const fetchData = async () =>{
                try {
                  const data = `192.168.10.2${id}`;

                  const config = {
                    method: "post",
                    maxBodyLength: Infinity,
                    url: "http://localhost:8080/api/snmp/inputConfig",
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
                  setInputConfigData(response.data);
                } catch (error) {
                    console.log(error.data)
                }
            }
            fetchData();
        },[]
    )
    return inputConfigData;

}
export default useGetInputConfig;