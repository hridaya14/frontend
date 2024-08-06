import React from 'react';
import { Data } from '../Types/data';

export const Row = React.memo(({ data }: { data: Data }) => {
  return (
    <div className="flex items-start border-b py-2 border-gray-700">
      <div className="w-1/12 p-2">{data.type || 'N/A'}</div>
      <div className="w-1/12 p-2">{data['properties.MAPBLKLOT'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{data['properties.BLKLOT'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{data['properties.BLOCK_NUM'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{data['properties.LOT_NUM'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{data['properties.FROM_ST'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{data['properties.TO_ST'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{data['properties.STREET'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{data['properties.ST_TYPE'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{data['properties.ODD_EVEN'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{data['geometry.type'] || 'N/A'}</div>
      <div className="w-72 p-2">
        {data['geometry.coordinates'] ? (
          data['geometry.coordinates'].map((coordObj, i) => (
            <div key={i} className='flex flex-col gap-6 justify-around'>
              {Object.values(coordObj).map((coordArray, j) => (
                <div key={j} className='bg-gray-600 p-1 rounded-md text-xs'>
                  [{coordArray.join(', ')}]
                </div>
              ))}
            </div>
          ))
        ) : 'N/A'}
      </div>
    </div>
  );
});
