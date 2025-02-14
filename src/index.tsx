import { createRoot } from "react-dom/client";
import WebPhone from "https://esm.sh/ringcentral-web-phone@2.0.9";

const root = createRoot(document.getElementById("root")!);
root.render(<h1>Hello world!</h1>);

const webPhone = new WebPhone({
  sipInfo: JSON.parse(import.meta.env.VITE_SIP_INFO),
  debug: true,
});
console.log(webPhone);
// webPhone.start();
