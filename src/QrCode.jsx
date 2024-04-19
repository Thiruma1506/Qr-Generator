import { useState } from "react";

export const QrCode = () => {
    const[currentqr,setCurrentqr]=useState("");    
    const[loading,setLoading]=useState(false);
    const[qrdata,setQrdata]=useState("https://www.youtube.com/");
    const[size,setSize]=useState("150");


    async function qrGen(){
 setLoading(true);
  try{
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent( qrdata)}`;
    setCurrentqr(url);
  } catch(error){
    console.error("Error generating QR code",error);
  } finally{
    setLoading(false);
  }
}

function DownloadQr(){
  fetch(currentqr).then((response)=>response.blob()).then((blob)=>{
    const downloadLink= document.createElement("a");
    downloadLink.href= URL.createObjectURL(blob);
    downloadLink.download="Qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });
}

  return (
    <div className="appcontainer">
        <h1>QR Code Generator</h1>
        {loading && <p>Please Wait....</p>}
        {currentqr && <img className="qrimg" src={currentqr}/>}
        <div>
           
           {/* this is for url input */}
            <label htmlFor="dataInput" className="input-label data">
                Data for QR code:
            </label>        
            <input type="text" value={qrdata} id="dataInput" placeholder="Enter data for QR Code" onChange={(e)=>setQrdata(e.target.value)}/>
            
            {/* this is for image size */}
            <label htmlFor="sizeInput" className="input-label size">
                Image Size (eg = 150 ):
            </label>
            <input type="text" value={size} id="sizeInput" placeholder="Enter image size" onChange={(e)=>setSize(e.target.value)}/>
            
            
            <div className="buttons">
              <button className="button generate"  disabled={loading} onClick={qrGen}>Generate QR Code</button>
              <button className="button download" onClick={DownloadQr} >Download QR Code</button>
            </div>
        </div>
        <p className="footer">Designed by <span className="brand">Thirumavalavan</span> </p>
    </div>
  )
};
