import axios from "axios";

export const ipfsBaseURL = "https://fraart.mypinata.cloud/ipfs/";

export const getIpfshash = async (data) => {
  let config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MDQ3M2JmNi0xZmFjLTQ0ZGYtYWVjZC05M2ZhOGI0OWJmNjUiLCJlbWFpbCI6InBldGVyQHR2cmkuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMWEwM2ZjYjAzNzlhM2EwZDEwZDAiLCJzY29wZWRLZXlTZWNyZXQiOiI2NmU3YTNkNDBiN2UzMWZjYzczMmQ1MmE3Yjk1YTViODBiOWY2ZDNmMzM0MjRiZTk3ZDYyNjFiMzE1ZGM1MTlmIiwiaWF0IjoxNjcwMjE2NzcxfQ.F-jRS1SqlvdeLHXwC0YlHBsGtGtEovSu9gmXckLzDCo'
    },
    data : data
  };
  const res = await axios(config);
  return res.data.IpfsHash;
}

export const getIpfsHashFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    var headers = new Headers();
    headers.append("pinata_api_key", "1a03fcb0379a3a0d10d0");
    headers.append("pinata_secret_api_key", "66e7a3d40b7e31fcc732d52a7b95a5b80b9f6d3f33424be97d6261b315dc519f");
    var formdata = new FormData();
    formdata.append("file", file);
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: formdata
    };
    fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", requestOptions)
      .then(r => r.json())
      .then(r => {
        resolve(r.IpfsHash);
      })
      .catch(error => reject(error))
  })
};