import { useEffect, useState, useRef, useCallback } from 'react';
import { VariableSizeList as Variable } from 'react-window';
import './App.css';
import { useWindowResize } from './useWindowResize';

type Data = {
  type?: string,
  "properties.MAPBLKLOT"?: string,
  "properties.BLKLOT"?: string,
  "properties.BLOCK_NUM"?: string,
  "properties.LOT_NUM"?: string,
  "properties.FROM_ST"?: string,
  "properties.TO_ST"?: string,
  "properties.STREET"?: string,
  "properties.ST_TYPE"?: string,
  "properties.ODD_EVEN"?: string,
  "geometry.type"?: string,
  "geometry.coordinates"?: Array<Record<string, [number, number, number]>>
}

type Response = Data[]

const fetchData = async (): Promise<Response> => {
  try {
    const response = await fetch("http://localhost:3000/data");
    const parsed = await response.json();
    return parsed;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const Row = (({ index, data, setSize, windowWidth }: { index: number, data: Response, setSize: any, windowWidth: number }) => {
  const item = data[index];
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rowRef.current) {
      setSize(index, rowRef.current.getBoundingClientRect().height);
    }
  }, [setSize, index, windowWidth]);

  return (
    <div ref={rowRef} className="flex items-start border-b py-2 border-gray-700">
      <div className="w-1/12 p-2">{item.type || 'N/A'}</div>
      <div className="w-1/12 p-2">{item['properties.MAPBLKLOT'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{item['properties.BLKLOT'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{item['properties.BLOCK_NUM'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{item['properties.LOT_NUM'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{item['properties.FROM_ST'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{item['properties.TO_ST'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{item['properties.STREET'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{item['properties.ST_TYPE'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{item['properties.ODD_EVEN'] || 'N/A'}</div>
      <div className="w-1/12 p-2">{item['geometry.type'] || 'N/A'}</div>
      <div className="w-72 p-2">
        {item['geometry.coordinates'] ? (
          item['geometry.coordinates'].map((coordObj, i) => (
            <div key={i} className='flex flex-col gap-6 justify-around '>
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

function App() {
  const listRef = useRef<Variable>(null);
  const [data, setData] = useState<Response>([]);
  const [loading, setLoading] = useState(true);
  const sizeMap = useRef<Record<number, number>>({});
  const setSize = useCallback((index: number, size: number) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    if (listRef.current) {
      listRef.current.resetAfterIndex(index);
    }
  }, []);
  const [windowWidth] = useWindowResize();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setData(data);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-900 p-4 overflow-hidden">
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <div className="flex flex-col overflow-hidden ">
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
            <Variable
              height={window.innerHeight - 64}
              itemCount={data.length}
              width={"100%"}
              itemData={data}
              itemSize={(index) => sizeMap.current[index] || 50}
              ref={listRef}
            >
              {({ data, index, style }) => (
                <div style={style}>
                  <Row
                    data={data}
                    index={index}
                    setSize={setSize}
                    windowWidth={windowWidth}
                  />
                </div>
              )}
            </Variable>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
