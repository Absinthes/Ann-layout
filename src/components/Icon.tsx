import { defineComponent } from "vue";

export const Icon = defineComponent({
  props: {
    modelValue: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    return () => {
      if (props.modelValue?.startsWith("el-")) {
        const Icon = props.modelValue.split("-")[1];
        if (!Icon) throw new Error("请输入正确Icon名称");
        return <Icon />;
      }
      if (props.modelValue?.startsWith("icon-")) {
        return <i class={"iconfont " + props.modelValue}></i>;
      }
    };
  },
});
