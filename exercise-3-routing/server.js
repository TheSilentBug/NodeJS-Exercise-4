const http = require("http");

console.log("Starting server...");

const server = http.createServer((req, res) => {
  const url = req.url;
  const path = url.endsWith("/") && url !== "/" ? url.slice(0, -1) : url;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  if (path === "/home" || path === "/") {
    res.statusCode = 200;
    res.end("به صفحه اصلی خوش آمدید");
  } else if (path === "/profile") {
    res.statusCode = 200;
    res.end("صفحه پروفایل کاربر");
  } else if (path === "/settings") {
    res.statusCode = 200;
    res.end("صفحه تنظیمات");
  } else if (path === "/products") {
    res.statusCode = 200;
    res.end("لیست محصولات");
  } else if (path === "/cart") {
    res.statusCode = 200;
    res.end("سبد خرید");
  } else {
    res.statusCode = 404;
    res.end("404 - صفحه مورد نظر یافت نشد");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
