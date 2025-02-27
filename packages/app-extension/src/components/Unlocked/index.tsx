import { useBootstrapFast } from "@coral-xyz/recoil";

import { Router } from "../common/Layout/Router";
import { WithTabs } from "../common/Layout/Tab";
import { WalletDrawerProvider } from "../common/WalletList";

import { ApproveTransactionRequest } from "./ApproveTransactionRequest";
import { WithVersion } from "./WithVersion";

//
// The main nav persistent stack.
//
export function Unlocked() {
  useBootstrapFast();

  return (
    <WithVersion>
      <WithTabs>
        <WalletDrawerProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Router />
            <ApproveTransactionRequest />
          </div>
        </WalletDrawerProvider>
      </WithTabs>
    </WithVersion>
  );
}
