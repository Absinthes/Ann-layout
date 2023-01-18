import { merge } from "lodash-es";
import { AreaDataType, ComponentData } from "~/types";
import { localCanvasData } from "./state";
import { getComponentGeometricInfo } from "~/shared";

export const isShowArea = ref(false);

export const areaData = ref<AreaDataType>({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  components: [],
});

export function setAreaData(data: Partial<AreaDataType>) {
  areaData.value = merge(areaData.value, data);
  const { left, right, top, bottom } = getComponentGeometricInfo({
    ...areaData.value,
    rotate: 0,
  });

  const components: ComponentData[] = [];
  localCanvasData.value.forEach((component) => {
    const { left: cLeft, top: cTop } = getComponentGeometricInfo(
      component.style
    );
    if (cLeft >= left && cTop >= top && cLeft <= right && cTop <= bottom) {
      components.push(component);
    }
  });

  areaData.value.components = components;
}

export function setIsShowArea(isShow: boolean) {
  isShowArea.value = isShow;
}

export function clearAreaComponents() {
  areaData.value.components = [];
}
