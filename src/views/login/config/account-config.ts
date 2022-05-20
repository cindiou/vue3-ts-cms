export default {
  name: [
    {
      required: true,
      message: "用户名必须存在!",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z0-9]{1,20}$/,
      message: "用户名必须满足由大小写字母或数字组合",
      trigger: "blur",
    },
    {
      min: 1,
      max: 20,
      message: "长度必须在1-20之间",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码必须存在!",
      trigger: "blur",
    },
    {
      min: 6,
      max: 18,
      message: "密码长度在6-18位之间",
      trigger: "blur",
    },
    {
      //pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,18}$/,
      //message: "必须同时包含至少一个大写、小写、数字、特殊字符!",
      pattern: /^\w{6,18}$/,
      message: "必须是大小字母或数字、下划线!",
      trigger: "blur",
    },
  ],
};
