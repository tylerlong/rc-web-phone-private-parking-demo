import { createRoot } from "react-dom/client";
import WebPhone from "ringcentral-web-phone";

const root = createRoot(document.getElementById("root")!);
root.render(<h1>Hello world!</h1>);

const webPhone = new WebPhone({
  sipInfo: JSON.parse(import.meta.env.VITE_SIP_INFO),
});
console.log(webPhone);
