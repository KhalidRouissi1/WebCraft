import React, { useState } from 'react';
import Link from "next/link"
import GuardLayout from '../../components/layout';
const Index = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const handleClick = (data) => {
    localStorage.clear()
    localStorage.setItem('gjsProject', JSON.stringify(data));
  };
  return (
    <GuardLayout>
    <div className="h-screen flex flex-col">
      <div className="flex-1 bg-gray-200 flex items-center justify-center">
        <div className="w-3/4 h-3/4 bg-white border border-gray-400 rounded-lg shadow-lg">
          {hoveredImage && (
            <img src={hoveredImage} alt="Hovered image" className="w-full h-full object-contain" />
          )}
          {!hoveredImage && (
            <h1 className="flex justify-center items-center mt-[20%] text-9xl">New Blank Canvas</h1>
          )}
        </div>
      </div>
      <div className="flex justify-center bg-gray-300 py-4">
        <div className="flex space-x-4">
            <Link href="workspace/builder">
         <div
            className="relative w-48 h-64 bg-white rounded-lg"
            onMouseEnter={() => setHoveredImage(null)} 
            onClick={()=>
                handleClick(
                )
            }
          >
            <span className="flex justify-center items-center mt-[20%]">New Blank Canvas</span>

          </div>
            </Link>
            <Link href="workspace/builder">

          <div
              className="relative w-48 h-64 bg-gray-500 rounded-lg"
              onMouseEnter={() =>
                setHoveredImage(`https://cdn.discordapp.com/attachments/1138848747665768499/1204907862074327132/image.png`)
              }
              onClick={
                ()=>{
                 handleClick("")
                }
              }
            >
              <img
                src={`https://cdn.discordapp.com/attachments/1138848747665768499/1204907862074327132/image.png`}
                alt={`Image `}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            </Link>
            <Link href="workspace/builder">
            <div
              className="relative w-48 h-64 bg-gray-500 rounded-lg"
              onMouseEnter={() =>
                setHoveredImage(`https://cdn.discordapp.com/attachments/1138848747665768499/1204905954055954503/Capture_decran_2024-02-07_223658.png?ex=65d66f1d&is=65c3fa1d&hm=d5778ea878f2effc10d3040bfcdd974c1b1b21987919fca9040e17743caa3a9b&`)
              }
              onClick={
                ()=>{
                    handleClick("")
                }
              }
            >
              <img
                src={`https://cdn.discordapp.com/attachments/1138848747665768499/1204905954055954503/Capture_decran_2024-02-07_223658.png?ex=65d66f1d&is=65c3fa1d&hm=d5778ea878f2effc10d3040bfcdd974c1b1b21987919fca9040e17743caa3a9b&`}
                alt={`Image `}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            </Link>

        </div>
      </div>
    </div>
    </GuardLayout>
  );
};

export default Index;