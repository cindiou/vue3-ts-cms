let BASE_URL = "";
const TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
  // BASE_URL = "http://152.136.185.210:7878/api/m5";
  BASE_URL = "/backend";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "/backend"; // 由于运行时需要通过vercel代理，仍要是"/backend"
}

export { BASE_URL, TIME_OUT };
