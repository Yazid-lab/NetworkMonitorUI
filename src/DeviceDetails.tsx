import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetInputConfig from "./useGetInputConfig";
import useGetInputStatus from "./useGetInputStatus";
import { Box, Tabs, Tab, Checkbox, Alert, Button } from "@mui/material";
import useGetNetworkConfig from "./useGetNetworkConfig";
import useGetPrograms from "./useGetPrograms";
import radiologo from "./assets/radio.png";
import tvlogo from "./assets/tv.png";
import usePeriodicImage from "./useThumbnail";
import axios from "axios";
import useGetSystemInfo from "./useGetSystemInfo";
import {
  inputConfigData,
  inputStatusData,
  networkData,
  programData,
  SystemData,
} from "./data";
import SNRMarginGraph from "./snrGraph";
import Navbar from "./Navbar";
import useGeneratePDF from "./useGeneratePdfReport";
const DeviceDetails: React.FC = () => {
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState("0");
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { id } = useParams<{ id: string }>();
  // const inputConfigDetails = useGetInputConfig(id!);
  const inputConfigDetails = inputConfigData;
  // const inputStatusDetails = useGetInputStatus(id!);
  const inputStatusDetails = inputStatusData;
  // const networkDetails = useGetNetworkConfig(id!);
  const networkDetails = networkData;
  // const programs= useGetPrograms(id!);
  const programs = programData;
  // const systemInfo = useGetSystemInfo(id!);
  const systemInfo = SystemData;

  const imageUrl = "http://localhost:8080/api/video/programFrame"; // Your image URL
  const thumbnail = usePeriodicImage(imageUrl, 1500); // Fetch image every 3 seconds

  const generatePDF = useGeneratePDF(); // Use the custom hook

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  async function handleReboot(): Promise<void> {
    try {
      const ipAddress = `192.168.10.2${id}`;
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/snmp/reboot",
        headers: {
          "Content-type": "text/plain",
        },
        data: ipAddress,
      };
      await axios(config);
    } catch (error) {
      console.error("Error fetching SNR margin:", error);
    }
  }

  return (
    <>
      <Navbar deviceName={systemInfo?.name}></Navbar>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleTabChange}>
            <Tab label="Input Configuration" />
            <Tab label="Input Status" />
            <Tab label="Network Configuration" />
            <Tab label="TS descriptor" />
            <Tab label="System information" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {inputConfigDetails ? (
            <>
              <p>
                <b>Input Type:</b> {inputConfigDetails.inputType}
              </p>
              <p>
                <b>Polarization:</b> {inputConfigDetails.satPolarization}
              </p>
              <p>
                <b>Tone 22kHz:</b> {inputConfigDetails.tone22kHz ? "On" : "Off"}
              </p>
              <p>
                <b>Interface :</b> {inputConfigDetails.interface}
              </p>
              <p>
                <b>Mode :</b> {inputConfigDetails.mode}
              </p>
              <p>
                <b>Downlink Frequency:</b>{" "}
                {inputConfigDetails.downlinkFrequency}
              </p>
              <p>
                <b>Local Oscilator Frequency:</b>{" "}
                {inputConfigDetails.oscillatorFrequency}
              </p>
              <p>
                <b>Search Range (Mhz):</b> {inputConfigDetails.searchRange}{" "}
              </p>
              <p>
                <b>Symbol Rate:</b> {inputConfigDetails.symbolRate}
              </p>
              <p>
                <b>DVB-S2/S2X Gold Code:</b> {inputConfigDetails.goldCode}
              </p>
            </>
          ) : (
            <Alert severity="error">
              Something went wrong. Host is unreachable{" "}
            </Alert>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {inputStatusDetails ? (
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "80px" }}>
                <p>
                  <b>SNR :</b> {inputStatusDetails.snr}
                </p>
                <p>
                  <b>SNR margin :</b> {inputStatusDetails.snrMargin}
                </p>
                <p>
                  <b>BER :</b> {inputStatusDetails.ber}
                </p>
                <p>
                  <b>Power :</b> {inputStatusDetails.power}
                </p>
                <p>
                  <b>Frequency :</b> {inputStatusDetails.frequency}
                </p>
                <p>
                  <b>Mode :</b> {inputStatusDetails.mode}
                </p>
                <p>
                  <b>Modulation :</b> {inputStatusDetails.modulation}
                </p>
                <p>
                  <b>Roll Off:</b> {inputStatusDetails.rollOff}
                </p>
                <p>
                  <b>FEC :</b> {inputStatusDetails.fec}
                </p>
                <p>
                  <b>Pilots :</b> {inputStatusDetails.pilots}
                </p>
              </div>
              <SNRMarginGraph />
            </div>
          ) : (
            <Alert severity="error">
              Something went wrong. Host is unreachable{" "}
            </Alert>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {networkDetails ? (
            networkDetails.map((networkconfig) => (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h2 key={networkconfig.connectionAddress}>
                    Interface : {networkconfig.connectionName}
                  </h2>{" "}
                  <Checkbox checked={networkconfig.enabled} disabled={true} />
                </div>
                <div>
                  <div>
                    <input
                      type="radio"
                      id={networkconfig.connectionName}
                      name={networkconfig.connectionName}
                      value="dhcp"
                      checked={networkconfig.Dhcp}
                      disabled
                    />
                    <label htmlFor="dhcp">DHCP Configuration</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id={networkconfig.connectionName}
                      name={networkconfig.connectionName}
                      value="static"
                      checked={!networkconfig.Dhcp}
                      disabled
                    />
                    <label htmlFor="static">STATIC Configuration</label>
                  </div>
                  <br />
                </div>
                <span style={{ fontWeight: "bold" }}>IP: </span>{" "}
                <span>{networkconfig.connectionAddress}</span> <br />
                <span style={{ fontWeight: "bold" }}>Mask:</span>
                <span> {networkconfig.subnetMask}</span>
                <br />
                <span style={{ fontWeight: "bold" }}>Mask:</span>
                <span> {networkconfig.subnetMask}</span>
                <br />
              </>
            ))
          ) : (
            <Alert severity="error">
              Something went wrong. Host is unreachable{" "}
            </Alert>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {programs ? null : (
            <Alert severity="error">
              Something went wrong. Host is unreachable{" "}
            </Alert>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div>
              {programs ? (
                <img
                  src={thumbnail}
                  alt="Video Thumbnail"
                  style={{
                    width: "500px",
                    height: "auto",
                    marginRight: "16px",
                  }}
                />
              ) : null}
            </div>
            <div>
              {programs
                ? programs.map((program) => (
                    <p
                      style={{
                        fontWeight:
                          program.number === selected ? "bold" : "normal",
                      }}
                      key={program.name}
                    >
                      {program.type.includes("television") && (
                        <img
                          src={tvlogo}
                          alt="TV Icon"
                          style={{ marginRight: "8px" }}
                        />
                      )}
                      {program.type.includes("radio") && (
                        <img
                          src={radiologo}
                          alt="Radio Icon"
                          style={{ marginRight: "8px" }}
                        />
                      )}
                      <span
                        onClick={async () => {
                          await axios.post(
                            `http://localhost:8080/api/snmp/primaryService?id=${program.number}`,
                            `192.168.10.2${id}`
                          );
                          setSelected(program.number);
                        }}
                      >
                        {program.name}
                      </span>
                    </p>
                  ))
                : null}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          {systemInfo ? (
            <div>
              <p>
                <b>Serial number: </b>
                {systemInfo.serialNumber}
              </p>
              <p>
                <b>System name: </b>
                {systemInfo.name}
              </p>
              <p>
                <b>System version: </b>
                {systemInfo.systemVersion}
              </p>
              <p>
                <b>System time: </b>
                {systemInfo.systemTime}
              </p>
              <p>
                <b>Temperature: </b>
                {systemInfo.temperature}
              </p>
              <Button variant="contained" onClick={handleReboot}>
                Reboot
              </Button>
              <Button
                sx={{ ml: 5 }}
                variant="contained"
                onClick={() =>
                  generatePDF(
                    inputConfigDetails,
                    inputStatusDetails,
                    networkDetails,
                    programs,
                    systemInfo
                  )
                }
              >
                Generate PDF Report
              </Button>
            </div>
          ) : (
            <div>
              <Alert severity="error">
                Something went wrong. Host is unreachable{" "}
              </Alert>
            </div>
          )}
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default DeviceDetails;
