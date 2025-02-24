import React from "https://esm.sh/react@19.0.0";
import { createRoot } from "https://esm.sh/react-dom@19.0.0/client";
import WebPhone from "https://esm.sh/ringcentral-web-phone@2.0.9";
import waitFor from "https://esm.sh/wait-for-async@0.7.13";
import CallSession from "https://esm.sh/ringcentral-web-phone@2.0.9/dist/esm/call-session/index.d.ts";
import InboundCallSession from "https://esm.sh/ringcentral-web-phone@2.0.9/dist/esm/call-session/inbound.d.ts";

const root = createRoot(document.getElementById("root")!);
root.render(<h1>Hello world!</h1>);

const webPhone = new WebPhone({
  sipInfo: JSON.parse(import.meta.env.VITE_SIP_INFO),
  debug: true,
});
webPhone.start();

webPhone.on("inboundCall", async (inbundCallSession: InboundCallSession) => {
  // do something with the inbound call session
  await waitFor({ interval: 3000 });
  await (inbundCallSession as CallSession).transfer(
    `prk${import.meta.env.VITE_PARK_LOCATION_ID}`,
  );
});
