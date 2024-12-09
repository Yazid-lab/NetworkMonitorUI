export const programData = [
    {
        "name": "Tunisia Nat 1",
        "type": "Digital television",
        "isSelected": true
    },
    {
        "name": "Tunisia Nat 2",
        "type": "Digital television",
        "isSelected": false
    },
    {
        "name": "Carthage +",
        "type": "Digital television",
        "isSelected": false
    },
    {
        "name": "Nessma Ejdida",
        "type": "Digital television",
        "isSelected": false
    },
    {
        "name": "Jawhara FM-TV",
        "type": "Digital television",
        "isSelected": false
    },
    {
        "name": "Tunisia Educ1",
        "type": "Digital television",
        "isSelected": false
    },
    {
        "name": "Tunisna",
        "type": "Digital television",
        "isSelected": false
    },
    {
        "name": "Telvza TV",
        "type": "Digital television",
        "isSelected": false
    },
    {
        "name": "Radio visuel NAT TN",
        "type": "Digital television",
        "isSelected": false
    },
    {
        "name": "Attessia TV",
        "type": "Digital television",
        "isSelected": false
    },
    {
        "name": "Radio JEUNE",
        "type": "Digital radio sound",
        "isSelected": false
    },
    {
        "name": "R- Tunisie Internationale",
        "type": "Digital radio sound",
        "isSelected": false
    },
    {
        "name": "R- Tunisie Culture",
        "type": "Digital radio sound",
        "isSelected": false
    },
    {
        "name": "R- Tunisie Nationale",
        "type": "Digital radio sound",
        "isSelected": false
    },
    {
        "name": "Tunisia 1 HD",
        "type": "H.264/AVC HD digital television",
        "isSelected": false
    },
    {
        "name": "Tunisia 2 HD",
        "type": "H.264/AVC HD digital television",
        "isSelected": false
    },
    {
        "name": "R- Panorama",
        "type": "Digital radio sound",
        "isSelected": false
    }
]
  export const networkData =[
    {
        "connectionName": "Management",
        "enabled": true,
        "subnetMask": "ff:ff:ff:00",
        "connectionAddress": "c0:a8:0a:15",
        "dhcp": false
    },
    {
        "connectionName": "Stream 1",
        "enabled": true,
        "subnetMask": "ff:ff:ff:00",
        "connectionAddress": "0a:67:04:02",
        "dhcp": false
    },
    {
        "connectionName": "Stream 2",
        "enabled": false,
        "subnetMask": "00:00:00:00",
        "connectionAddress": "00:00:00:00",
        "dhcp": false
    }
]

export const inputStatusData =

{
    "ber": "0",
    "rollOff": "0.35",
    "fec": "5/6",
    "power": "-32",
    "mode": "DVB-S",
    "snr": "12.2",
    "pilots": "OFF",
    "modulation": "QPSK",
    "frequency": "2043.0",
    "snrMargin": "4.3"
}

  export const inputConfigData = {
    "isMultiStreamEnabled": false,
    "inputStreamIdentifier": "0",
    "downlinkFrequency": "11660.0",
    "oscillatorFrequency": "9750.0",
    "mode": "Automatic",
    "inputType": "DVB-S/S2/S2X",
    "lnbisPowered": true,
    "goldCode": "0",
    "interface": "RF1",
    "satPolarization": "Vertical",
    "tone22kHz": false,
    "searchRange": "5",
    "symbolRate": "27.5"
}
export const SystemData ={
    'serialNumber':"2345-13129",
    'name':'TVRO 4',
    'systemVersion':'2.5.6.0 ',
    'systemTime':new Date().toLocaleTimeString(),
    'temperature':'50°C'
}