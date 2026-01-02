const http = require("http");
const { URL } = require("url");

function parseNumbers(searchParams) {
  const aRaw = searchParams.get("a");
  const bRaw = searchParams.get("b");

  if (aRaw === null || bRaw === null) {
    return { error: "Please provide query params: a and b" };
  }

  const a = Number(aRaw);
  const b = Number(bRaw);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return { error: "a and b must be valid numbers" };
  }

  return { a, b };
}

const server = http.createServer((req, res) => {
  const fullUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = fullUrl.pathname;
  const { a, b, error } = parseNumbers(fullUrl.searchParams);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  if (error) {
    res.statusCode = 400;
    return res.end(error);
  }

  if (path === "/add") {
    const result = b + a;
    res.statusCode = 200;
    return res.end(`${result} = ${b} + ${a}`);
  }

  if (path === "/subtract") {
    const result = b - a;
    res.statusCode = 200;
    return res.end(`${result} = ${b} - ${a}`);
  }

  if (path === "/multiply") {
    const result = b * a;
    res.statusCode = 200;
    return res.end(`${result} = ${b} × ${a}`);
  }

  if (path === "/divide") {
    if (a === 0) {
      res.statusCode = 400;
      return res.end("Division by zero is not allowed (a cannot be 0).");
    }
    const result = b / a;
    res.statusCode = 200;
    return res.end(`${result} = ${b} ÷ ${a}`);
  }

  if (path === "/power") {
    const result = b ** a; 
    res.statusCode = 200;
    return res.end(`${result} = ${b}^${a}`);
  }

  res.statusCode = 404;
  return res.end("404 - صفحه مورد نظر یافت نشد");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
