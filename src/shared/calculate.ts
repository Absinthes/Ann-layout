import { BasePostionType, ComponentStyle, PointType } from "~/types";

type PointInfoData = {
  curPoint: BasePostionType;
  symmetricPoint: BasePostionType;
  center: BasePostionType;
  newCenter: BasePostionType;
};

type CalculateFuncReturn = Pick<
  ComponentStyle,
  "left" | "top" | "width" | "height"
>;

type CalculateFunc = {
  [k in PointType]: (
    style: ComponentStyle,
    curPostion: BasePostionType,
    pointInfoData: PointInfoData
  ) => CalculateFuncReturn;
};

export function angleToRadian(rotate: number) {
  return (rotate * Math.PI) / 180;
}

export function getCenterPoint(
  curPoint: BasePostionType,
  symmetricPoint: BasePostionType
): BasePostionType {
  return {
    x: curPoint.x + (symmetricPoint.x - curPoint.x) / 2,
    y: curPoint.y + (symmetricPoint.y - curPoint.y) / 2,
  };
}

/**
 * 计算根据圆心旋转后的点的坐标
 * @param   {BasePostionType}  point  旋转前的点坐标
 * @param   {BasePostionType}  center 旋转中心
 * @param   {Number}  rotate 旋转的角度
 * @return  {BasePostionType}         旋转后的坐标
 * https://www.zhihu.com/question/67425734/answer/252724399 旋转矩阵公式
 */
export function calculateRotatedPointCoordinate(
  point: BasePostionType,
  center: BasePostionType,
  rotate: number
): BasePostionType {
  /**
   * 旋转公式：
   *  点a(x, y)
   *  旋转中心c(x, y)
   *  旋转后点n(x, y)
   *  旋转角度θ                tan ??
   * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
   * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
   */
  const r = angleToRadian(rotate);
  return {
    x:
      (point.x - center.x) * Math.cos(r) -
      (point.y - center.y) * Math.sin(r) +
      center.x,
    y:
      (point.x - center.x) * Math.sin(r) +
      (point.y - center.y) * Math.cos(r) +
      center.y,
  };
}

function calculateLeftTopPoint(
  style: ComponentStyle,
  curPostion: BasePostionType,
  pointInfoData: PointInfoData
): CalculateFuncReturn {
  const { symmetricPoint, newCenter } = pointInfoData;
  const newTopLeftPoint = calculateRotatedPointCoordinate(
    curPostion,
    newCenter,
    -style.rotate
  );
  const newBottomRightPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenter,
    -style.rotate
  );

  const newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
  const newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
  if (newWidth <= 0 || newHeight <= 0) return style;
  return {
    left: Math.round(newTopLeftPoint.x),
    top: Math.round(newTopLeftPoint.y),
    width: Math.round(newWidth),
    height: Math.round(newHeight),
  };
}

function calculateLeftBottomPoint(
  style: ComponentStyle,
  curPostion: BasePostionType,
  pointInfoData: PointInfoData
): CalculateFuncReturn {
  const { symmetricPoint, newCenter } = pointInfoData;
  const newLeftBottomPoint = calculateRotatedPointCoordinate(
    curPostion,
    newCenter,
    -style.rotate
  );
  const newRightTopPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenter,
    -style.rotate
  );

  const newWidth = newRightTopPoint.x - newLeftBottomPoint.x;
  const newHeight = newLeftBottomPoint.y - newRightTopPoint.y;
  if (newWidth <= 0 || newHeight <= 0) return style;
  return {
    left: Math.round(newLeftBottomPoint.x),
    top: Math.round(newRightTopPoint.y),
    width: Math.round(newWidth),
    height: Math.round(newHeight),
  };
}

function calculateRightTopPoint(
  style: ComponentStyle,
  curPostion: BasePostionType,
  pointInfoData: PointInfoData
): CalculateFuncReturn {
  const { symmetricPoint, newCenter } = pointInfoData;
  const newRightTopPoint = calculateRotatedPointCoordinate(
    curPostion,
    newCenter,
    -style.rotate
  );
  const newLeftBottomPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenter,
    -style.rotate
  );

  const newWidth = newRightTopPoint.x - newLeftBottomPoint.x;
  const newHeight = newLeftBottomPoint.y - newRightTopPoint.y;
  if (newWidth <= 0 || newHeight <= 0) return style;
  return {
    left: Math.round(newLeftBottomPoint.x),
    top: Math.round(newRightTopPoint.y),
    width: Math.round(newWidth),
    height: Math.round(newHeight),
  };
}

function calculateRightBottomPoint(
  style: ComponentStyle,
  curPostion: BasePostionType,
  pointInfoData: PointInfoData
): CalculateFuncReturn {
  const { symmetricPoint, newCenter } = pointInfoData;
  const newRightBottomPoint = calculateRotatedPointCoordinate(
    curPostion,
    newCenter,
    -style.rotate
  );
  const newLeftTopPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenter,
    -style.rotate
  );

  const newWidth = newRightBottomPoint.x - newLeftTopPoint.x;
  const newHeight = newRightBottomPoint.y - newLeftTopPoint.y;
  if (newWidth <= 0 || newHeight <= 0) return style;
  return {
    left: Math.round(newLeftTopPoint.x),
    top: Math.round(newLeftTopPoint.y),
    width: Math.round(newWidth),
    height: Math.round(newHeight),
  };
}

function calculateTopPoint(
  style: ComponentStyle,
  curPostion: BasePostionType,
  pointInfoData: PointInfoData
): CalculateFuncReturn {
  const { symmetricPoint, curPoint } = pointInfoData;
  const rotatedCurrentPosition = calculateRotatedPointCoordinate(
    curPostion,
    curPoint,
    -style.rotate
  );

  const rotatedTopMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedCurrentPosition.y,
    },
    curPoint,
    style.rotate
  );

  const newHeight = Math.sqrt(
    (rotatedTopMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedTopMiddlePoint.y - symmetricPoint.y) ** 2
  );
  
  const newCenter = {
    x:
      rotatedTopMiddlePoint.x -
      (rotatedTopMiddlePoint.x - symmetricPoint.x) / 2,
    y:
      rotatedTopMiddlePoint.y +
      (symmetricPoint.y - rotatedTopMiddlePoint.y) / 2,
  };

  console.log(newCenter);

  return {
    left: newCenter.x - style.width / 2,
    top: newCenter.y - newHeight / 2,
    width: style.width,
    height: newHeight,
  };
}

const calculateFunc: CalculateFunc = {
  lt: calculateLeftTopPoint,
  lb: calculateLeftBottomPoint,
  rt: calculateRightTopPoint,
  rb: calculateRightBottomPoint,
  t: calculateTopPoint,
};

export function calculateComponentGeometricInfo(
  point: PointType,
  style: ComponentStyle,
  curPostion: BasePostionType,
  pointInfoData: PointInfoData
) {
  return calculateFunc[point](style, curPostion, pointInfoData);
}
