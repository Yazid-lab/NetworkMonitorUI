import { useCallback } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const useGeneratePDF = () => {
  const generatePDF = useCallback(
    (
      inputConfigDetails: any,
      inputStatusDetails: any,
      networkDetails: any[],
      programs: any[],
      systemInfo: any
    ) => {
      const doc = new jsPDF();
      doc.setFontSize(12);
      // Add System Name in the center at the top
      const systemName = systemInfo.name;
      doc.setFontSize(16); // Larger font size
      doc.setFont("helvetica", "bold"); // Bold font
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = doc.getTextWidth(systemName);
      doc.text(systemName, (pageWidth - textWidth) / 2, 10); // Centering text
      doc.setFontSize(12); // Reset to normal font size
      // Input Config Details
      doc.text("Input Configuration Details", 14, 20);
      doc.autoTable({
        startY: 30,
        head: [["Field", "Value"]],
        body: [
          ["Input Type", inputConfigDetails.inputType],
          ["Polarization", inputConfigDetails.satPolarization],
          ["Tone 22kHz", inputConfigDetails.tone22kHz ? "On" : "Off"],
          ["Interface", inputConfigDetails.interface],
          ["Mode", inputConfigDetails.mode],
          ["Downlink Frequency", inputConfigDetails.downlinkFrequency],
          ["Oscillator Frequency", inputConfigDetails.oscillatorFrequency],
          ["Search Range", inputConfigDetails.searchRange],
          ["Symbol Rate", inputConfigDetails.symbolRate],
          ["DVB-S2/S2X Gold Code", inputConfigDetails.goldCode],
        ],
      });

      // Input Status Details
      doc.text("Input Status Details", 14, doc.lastAutoTable.finalY + 10);
      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [["Field", "Value"]],
        body: [
          ["SNR", inputStatusDetails.snr],
          ["SNR Margin", inputStatusDetails.snrMargin],
          ["BER", inputStatusDetails.ber],
          ["Power", inputStatusDetails.power],
          ["Frequency", inputStatusDetails.frequency],
          ["Mode", inputStatusDetails.mode],
          ["Modulation", inputStatusDetails.modulation],
          ["Roll Off", inputStatusDetails.rollOff],
          ["FEC", inputStatusDetails.fec],
          ["Pilots", inputStatusDetails.pilots],
        ],
      });

      // Network Config Details
      doc.text(
        "Network Configuration Details",
        14,
        doc.lastAutoTable.finalY + 10
      );
      networkDetails.forEach((network) => {
        doc.autoTable({
          startY: doc.lastAutoTable.finalY + 20,
          head: [["Field", "Value"]],
          body: [
            ["Interface", network.connectionName],
            ["Enabled", network.enabled ? "Yes" : "No"],
            ["DHCP", network.Dhcp ? "Yes" : "No"],
            ["IP Address", network.connectionAddress],
            ["Subnet Mask", network.subnetMask],
          ],
        });
      });
      // System Info
      doc.text("System Information", 14, doc.lastAutoTable.finalY + 10);
      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [["Field", "Value"]],
        body: [
          ["Serial Number", systemInfo.serialNumber],
          ["System Name", systemInfo.name],
          ["System Version", systemInfo.systemVersion],
          ["System Time", systemInfo.systemTime],
          ["Temperature", systemInfo.temperature],
        ],
      });
      // Add a new page for Program Details
      doc.addPage();
      doc.text("Program Details", 14, 10);
      doc.autoTable({
        startY: 20,
        head: [["Program Name", "Type", "Selected"]],
        body: programs.map((program) => [
          program.name,
          program.type,
          program.isSelected ? "Yes" : "No",
        ]),
      });

      // Save the PDF
      doc.save("device-report.pdf");
    },
    []
  );

  return generatePDF;
};

export default useGeneratePDF;
