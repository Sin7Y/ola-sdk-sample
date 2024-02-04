import BigNumber from 'bignumber.js/bignumber.mjs'
import dayjs from 'dayjs'
import { Bignumberish } from '~~/types'

export function formatUnits(value: Bignumberish | BigInt, decimals = 18, digits = decimals, simple = false) {
  value = new BigNumber(value.toString())
  // is 0 ?
  if (value.eq(0)) {
    return '0'
  }

  const units = toFixed(value.div(10 ** decimals), digits)
  if (digits < decimals && Number(units) < 1 / 10 ** digits && simple) {
    return '<' + `0.${'1'.padStart(digits, '0')}`
  }
  return units
}

export function formatEther(value: any) {
  return formatUnits(value)
}

export function formatEstimatePercent(value: any) {
  return (new BigNumber(value).lt(0.0001) ? '<0.01' : new BigNumber(value).times(100).toFixed(2)) + '%'
}

export function formatTime(timestamp: number, formatter = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs.unix(timestamp).format(formatter)
}

export function toFixed(value: number | string | BigNumber, digits = 0) {
  if (value < 1 && value > 0) {
    return new BigNumber(value)
      .toFixed()
      .replace(new RegExp(`^(0.0*[1-9][0-9]{${digits - 1}}).*`), '$1')
      .replace(/0+$/, '')
  }
  return new BigNumber(value)
    .times(10 ** digits)
    .dp(0, BigNumber.ROUND_DOWN)
    .div(10 ** digits)
    .toFixed()
}

export function formatAssetValue(
  balance: string | number | BigInt,
  price: string | number,
  decimals = 18,
  digits = decimals
) {
  if (balance === undefined) {
    return '0'
  }

  return new BigNumber(balance.toString())
    .div(10 ** decimals)
    .times(price)
    .times(10 ** digits)
    .dp(0)
    .div(10 ** digits)
    .toFixed(digits)
}
