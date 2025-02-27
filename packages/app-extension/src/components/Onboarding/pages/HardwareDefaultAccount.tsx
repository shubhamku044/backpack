// This component gets the first wallet from a hardware wallet using the
// default derivation path.

import { useEffect } from "react";
import type { WalletDescriptor } from "@coral-xyz/common";
import { Blockchain, getIndexedPath } from "@coral-xyz/common";
import { Loading } from "@coral-xyz/react-common";
import Ethereum from "@ledgerhq/hw-app-eth";
import Solana from "@ledgerhq/hw-app-solana";
import type Transport from "@ledgerhq/hw-transport";
import { ethers } from "ethers";

export const HardwareDefaultAccount = ({
  blockchain,
  transport,
  onNext,
  onError,
}: {
  blockchain: Blockchain;
  transport: Transport;
  onNext: (walletDescriptor: WalletDescriptor) => void;
  onError?: (error: Error) => void;
}) => {
  useEffect(() => {
    (async () => {
      const ledger = {
        [Blockchain.SOLANA]: new Solana(transport),
        [Blockchain.ETHEREUM]: new Ethereum(transport),
      }[blockchain];

      // The default path for newly created wallets
      const derivationPath = getIndexedPath(blockchain).toString();
      // Get the public key for the default path from the hardware wallet
      let ledgerAddress;
      try {
        ledgerAddress = (
          await ledger.getAddress(derivationPath.replace("m/", ""))
        ).address;
      } catch (error) {
        if (onError) {
          console.debug("hardware default account transport error", error);
          onError(error as Error);
          return;
        } else {
          throw error;
        }
      }

      const publicKey =
        blockchain === Blockchain.SOLANA
          ? ethers.utils.base58.encode(ledgerAddress as Buffer)
          : ledgerAddress.toString();

      onNext({
        derivationPath,
        publicKey,
      });
    })();
  }, [blockchain]);

  return <Loading />;
};
