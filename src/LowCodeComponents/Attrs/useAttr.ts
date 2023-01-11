import { storeToRefs } from "pinia";
import { useLowCodeStore } from "~/store";
import { watch, onMounted } from "vue";

export const useAttr = () => {
  const lowCodeStore = useLowCodeStore();
  let { currentComponent } = storeToRefs(lowCodeStore);

  const unWatch = watch(
    () => lowCodeStore.currentComponent,
    () => {
      const { currentComponent: c } = storeToRefs(lowCodeStore);
      currentComponent = c;
    }
  );

  onMounted(() => {
    unWatch();
  });

  function handlerChange(key: string, value: any) {
    if(!key) return
    lowCodeStore.setCurComponentStyle({
      [key]: value,
    });
  }

  return {
    currentComponent,
    handlerChange,
  };
};
