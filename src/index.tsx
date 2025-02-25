import React from "https://esm.sh/react@19.0.0";
import { createRoot } from "https://esm.sh/react-dom@19.0.0/client";
import WebPhone from "https://esm.sh/ringcentral-web-phone@2.0.9";
import waitFor from "https://esm.sh/wait-for-async@0.7.13";
import CallSession from "https://esm.sh/ringcentral-web-phone@2.0.9/dist/esm/call-session/index.d.ts";
import InboundCallSession from "https://esm.sh/ringcentral-web-phone@2.0.9/dist/esm/call-session/inbound.d.ts";
import RingCentral from "https://esm.sh/@rc-ex/core@1.6.16";
import WsExtension from "https://esm.sh/@rc-ex/ws@1.3.16";
import DetailedExtensionPresenceWithSIPEvent from "https://esm.sh/@rc-ex/core@1.6.16/dist/esm/definitions/DetailedExtensionPresenceWithSIPEvent.d.ts";

const root = createRoot(document.getElementById("root")!);
root.render(<h1>Hello world!</h1>);

const webPhone = new WebPhone({
  sipInfo: JSON.parse(import.meta.env.VITE_SIP_INFO),
  debug: true,
});
webPhone.start();

webPhone.on("inboundCall", async (inbundCallSession: InboundCallSession) => {
  // answer inbound call
  await waitFor({ interval: 3000 });
  await inbundCallSession.answer();

  // setup subscription
  const rc = new RingCentral({
    server: import.meta.env.VITE_RINGCENTRAL_SERVER_URL,
    clientId: import.meta.env.VITE_RINGCENTRAL_CLIENT_ID,
    clientSecret: import.meta.env.VITE_RINGCENTRAL_CLIENT_SECRET,
  });
  await rc.authorize({ jwt: import.meta.env.VITE_RINGCENTRAL_JWT_TOKEN });
  const wsExt = new WsExtension();
  await rc.installExtension(wsExt);
  await wsExt.subscribe([
    `/restapi/v1.0/account/~/extension/${import.meta.env.VITE_PARK_LOCATION_ID}/presence?detailedTelephonyState=true&sipData=true`,
  ], async (event) => {
    await rc.revoke();

    // pick up the call from private park location
    await waitFor({ interval: 3000 });
    const activeCall =
      (event as DetailedExtensionPresenceWithSIPEvent).body!.activeCalls![0];
    const telephonySessionId = activeCall.telephonySessionId;
    const toTag = activeCall.sipData!.toTag;
    const fromTag = activeCall.sipData?.fromTag;
    await webPhone.call(
      `prk${import.meta.env.VITE_PARK_LOCATION_ID}`,
      undefined,
      {
        headers: {
          Replaces:
            `${telephonySessionId};to-tag=${toTag};from-tag=${fromTag};early-only`,
        },
      },
    );
  });

  // private park the call
  await waitFor({ interval: 3000 });
  await (inbundCallSession as CallSession).transfer(
    `prk${import.meta.env.VITE_PARK_LOCATION_ID}`,
  );
});
