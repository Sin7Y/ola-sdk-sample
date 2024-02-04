<template>
  <div class="flex flex-col items-center justify-center gap-4 py-24">
    <p>{{ account }}</p>
    <button @click="connect" class="rounded-lg border bg-white px-4 py-2 transition hover:bg-slate-50">Connect</button>
  </div>
</template>

<script setup lang="ts">
import { ethers, toBeArray } from 'ethers'
import { OlaWallet, encodeAbi, poseidonHash } from '@sin7y/ola-js-sdk'

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
  console.log(olaWallet.address)
}

onMounted(() => {})
</script>
