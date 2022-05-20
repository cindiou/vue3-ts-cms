export default {
  telephone: [
    {
      required: true,
      message: "手机号必须输入！",
      trigger: "blur",
    },
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "请输入正确的手机号码！",
      trigger: "blur",
    },
  ],
  authCode: [
    {
      required: true,
      message: "请输入验证码!",
      trigger: "blur",
    },
  ],
};
