/**
 * 物体移动距离的对象
 */
export interface objectLocation {
  x: number;
  y: number;
}

export interface boxItem {
  id: number | string,
  food: string,
}

export type boxType = boxItem[]

