export type Data = {
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
  
export type Response = Data[]