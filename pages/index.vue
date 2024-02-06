<template>
  <div class="flex flex-col items-center justify-center gap-4 py-24">
    <p>{{ account }}</p>
    <button @click="connect" class="rounded-lg border bg-white px-4 py-2 transition hover:bg-slate-50">Connect</button>
  </div>
</template>

<script setup lang="ts">
import { ethers, toBeArray } from 'ethers'
import { OlaWallet, encodeAbi, poseidonHash, OlaAddress } from '@sin7y/ola-js-sdk'

import * as olaCrypto from '@sin7y/ola-crypto'
import * as olaAbi from '@sin7y/ola-abi-wasm'
import { poseidon_u64_bytes_for_bytes_wrapper } from '@sin7y/ola-crypto'
import { encode_input_from_js } from '@sin7y/ola-abi-wasm'

let olaCryptoLoaded = false
let olaAbiLoaded = false

async function loadCryptoWasm(wasmFileUrl: string) {
  if ((olaCrypto as any).default) {
    if (!olaCryptoLoaded) {
      await (olaCrypto as any).default(wasmFileUrl)
      console.log(olaCrypto.default)
      olaCryptoLoaded = true
      console.log(olaCryptoLoaded)
    }
  }
}

async function loadAbiWasm(wasmFileUrl: string) {
  if ((olaAbi as any).default) {
    if (!olaAbiLoaded) {
      await (olaAbi as any).default(wasmFileUrl)
      console.log(olaAbi.default)
      olaAbiLoaded = true
      console.log(olaAbiLoaded)
    }
  }
}

const account = ref('')

const connect = async () => {
  // @note: test #1
  await loadCryptoWasm('/mini-goldilocks-web_bg.wasm')
  await loadAbiWasm('/ola-lang-abi-web_bg.wasm')

  const wallet = new ethers.BrowserProvider(window.ethereum)
  account.value = (await wallet.send('eth_requestAccounts', []))[0]
  const signer = await wallet.getSigner()
  const olaWallet = await OlaWallet.fromETHSignature(signer)
  olaWallet.connect("https://pre-alpha-api.olavm.com:443", 1027)
  console.log("pubkey: ", olaWallet.signer.publicKey);
  console.log("ola address: ", olaWallet.address)

  // try {
  //   const setKeyHash = await olaWallet.setPubKey();
  //   console.log("setKeyHash: ", setKeyHash);
  // } catch (error) {
  //   console.log("error: ", error);
  // }
  

  // const contracAddress = "0x6b2bce884dbab3b4a1ef0c7adc039a4ce93c4e291318218c9280f06bed052662";
  // const setAbi = [
  //   { name: "set", type: "function", inputs: [{ name: "d", type: "u32" }], outputs: [] },
  // ];
  // const params = [{ U32: 5789 }];

  // const txHash = await olaWallet.invoke(setAbi, "set(u32)", contracAddress, params);
  // console.log("invoke txHash", txHash);

  // const getCallerAbi = [{"name":"getCaller","type":"function","inputs":[],"outputs":[{"name":"","type":"address"}]}];

  // let result = await olaWallet.call<string>(getCallerAbi, "getCaller()", contracAddress, []);
  // console.log("result: ", result);
  // const abi = [{
  //   "name": "getPubkey",
  //   "type": "function",
  //   "inputs": [
  //     {
  //       "name": "_address",
  //       "type": "address"
  //     }
  //   ],
  //   "outputs": [
  //     {
  //       "name": "",
  //       "type": "fields"
  //     }
  //   ]
  // }];
  // const aa = "0x0000000000000000000000000000000000000000000000000000000000008006";
  // const params = [
  //   {Address: Array.from(OlaAddress.toBigintArray(olaWallet.address))}
  // ];
  // let result = await olaWallet.call<string>(abi, "getPubkey(address)", aa, params);
  // console.log("result: ", result);


  const proposalAbi = [
    {
      "name": "createProposal",
      "type": "function",
      "inputs": [
        {
          "name": "_contentHash",
          "type": "hash"
        },
        {
          "name": "_deadline",
          "type": "u32"
        },
        {
          "name": "_votingType",
          "type": "u32"
        },
        {
          "name": "_proposalType",
          "type": "u32"
        }
      ],
      "outputs": []
    },
    {
      "name": "getProposalsByOwner",
      "type": "function",
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "hash[]"
        }
      ]
    },
    {
      "name": "getProposal",
      "type": "function",
      "inputs": [
        {
          "name": "_contentHash",
          "type": "hash"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "components": [
            {
              "name": "proposer",
              "type": "address"
            },
            {
              "name": "deadline",
              "type": "u32"
            },
            {
              "name": "totalSupport",
              "type": "u32"
            },
            {
              "name": "totalAgainst",
              "type": "u32"
            },
            {
              "name": "votingType",
              "type": "u32"
            },
            {
              "name": "proposalType",
              "type": "u32"
            }
          ]
        }
      ]
    }
  ];

  const contracAddress = "0x1fa12c6c27a44cbe8996a030d218b3082e6300b259576b6c91c7cc4fdd2e6bf9";

  // const _contentHash = new Uint8Array(32);
  // _contentHash.fill(1);
  // const _deadline = 8234567890;
  // // const _deadline = 1707180476;
  // const _votingType = 0;
  // const _proposalType = 1;
  
  // const params = [
  //   {Hash: Array.from(_contentHash)},
  //   {U32: _deadline},
  //   {U32: _votingType},
  //   {U32: _proposalType}
  // ];
  // console.log("params: ", params);
  // try {
  //   const txHash = await olaWallet.invoke(abi, "createProposal(hash,u32,u32,u32)", contracAddress, params);
  //   console.log("invoke txHash", txHash);
  // } catch (error) {
  //   console.log("error:", error);
  // }

  const params = [
      {Address: Array.from(OlaAddress.toBigintArray(olaWallet.address))}
    ];
    try {
      const ret = await olaWallet.call(proposalAbi, "getProposalsByOwner(address)", contracAddress, params);
      console.log("call result", ret);
    } catch (error) {
      console.log("error:", error);
    }
}

onMounted(() => {})
</script>
