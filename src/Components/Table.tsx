import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { Row } from "./Row";
import { Response } from "../Types/data";

function Table({Data} : {Data: Response}) {
      
        return(
          <div className="flex flex-col w-fu overflow-hidden">
            <div className="flex border-b border-gray-700 bg-gray-800 text-white sticky top-0">
              <div className="w-1/12 p-2">Type</div>
              <div className="w-1/12 p-2">MAPBLKLOT</div>
              <div className="w-1/12 p-2">BLKLOT</div>
              <div className="w-1/12 p-2">BLOCK_NUM</div>
              <div className="w-1/12 p-2">LOT_NUM</div>
              <div className="w-1/12 p-2">From Street</div>
              <div className="w-1/12 p-2">To Street</div>
              <div className="w-1/12 p-2">Street</div>
              <div className="w-1/12 p-2">Street Type</div>
              <div className="w-1/12 p-2">Odd/Even</div>
              <div className="w-1/12 p-2">Geometry Type</div>
              <div className="w-72 p-2 text-start">Coordinates</div>
            </div>
            <div className="flex-1 overflow-hidden">
              <Virtuoso 
              useWindowScroll
              totalCount={200}
              itemContent={(index) => <Row data = {Data[index]} /> }
              />
            </div>
            
          </div>
        )
  }

export default Table;