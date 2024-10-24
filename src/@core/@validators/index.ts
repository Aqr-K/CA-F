// 必输校验
export const requiredValidator = (value: any) => !!value || "此项为必填项";

// 数字校验
export const numberValidator = (value: any) => !isNaN(value) || "请输入数字";
