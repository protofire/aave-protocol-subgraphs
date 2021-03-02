import { BigInt, BigDecimal, Bytes, ByteArray } from '@graphprotocol/graph-ts';

export function zeroBD(): BigDecimal {
  return BigDecimal.fromString('0');
}

export function zeroBI(): BigInt {
  return BigInt.fromI32(0);
}

export function zeroAddress(): Bytes {
  return Bytes.fromHexString('0x0000000000000000000000000000000000000000') as Bytes;
}

// @ts-ignore
export function exponentToBigDecimal(decimals: i32): BigDecimal {
  let bd = BigDecimal.fromString('1');
  let bd10 = BigDecimal.fromString('10');
  for (let i = 0; i < decimals; i++) {
    bd = bd.times(bd10);
  }
  return bd;
}

// @ts-ignore
export function exponentToBigInt(decimals: i32): BigInt {
  let bi = BigInt.fromI32(1);
  let bi10 = BigInt.fromI32(10);
  for (let i = 0; i < decimals; i++) {
    bi = bi.times(bi10);
  }
  return bi;
}
// @ts-ignore
export function convertTokenAmountToDecimals(amount: BigInt, decimals: i32): BigDecimal {
  return amount.toBigDecimal().div(exponentToBigDecimal(decimals));
}

export function convertValueFromRay(value: BigInt): BigDecimal {
  return convertTokenAmountToDecimals(value, 27);
}

export function format18(price: BigInt): BigInt {
  // IF the price is 0
  if (price == BigInt.fromI32(0)) return price;
  return exponentToBigInt(18).div(price);
}

export function formatUsdEthChainlinkPrice(price: BigInt): BigInt {
  // IF the price is 0
  if (price == BigInt.fromI32(0)) return price;
  return exponentToBigInt(18 + 8).div(price);
}

export const BORROW_MODE_STABLE = 'Stable';
export const BORROW_MODE_VARIABLE = 'Variable';
export const BORROW_MODE_NONE = 'None';

export function getBorrowRateMode(_mode: BigInt): string {
  let mode = _mode.toI32();
  if (mode == 0) {
    return BORROW_MODE_NONE;
  } else if (mode == 1) {
    return BORROW_MODE_STABLE;
  } else if (mode == 2) {
    return BORROW_MODE_VARIABLE;
  }
  throw new Error('invalid borrow rate mode');
}

export function getBorrowRateModeFromString(_mode: string): BigInt {
  if (_mode == BORROW_MODE_NONE) {
    return zeroBI();
  } else if (_mode == BORROW_MODE_STABLE) {
    return BigInt.fromI32(1);
  } else if (_mode == BORROW_MODE_VARIABLE) {
    return BigInt.fromI32(2);
  }
  throw new Error('invalid borrow rate mode');
}

export const PRICE_ORACLE_ASSET_TYPE_SIMPLE = 'Simple';
export const PRICE_ORACLE_ASSET_TYPE_COMPOSITE = 'Composite';

export function getPriceOracleAssetType(_type: BigInt): string {
  let type = _type.toI32();

  if (type == 1) {
    return PRICE_ORACLE_ASSET_TYPE_SIMPLE;
  } else if (type == 2) {
    return PRICE_ORACLE_ASSET_TYPE_COMPOSITE;
  }
  throw new Error('invalid price oracle asset type');
}

export const PRICE_ORACLE_ASSET_PLATFORM_SIMPLE = 'Simple';
export const PRICE_ORACLE_ASSET_PLATFORM_UNISWAP = 'Uniswap';

export function getPriceOracleAssetPlatform(_type: BigInt): string {
  let type = _type.toI32();

  if (type == 1) {
    return PRICE_ORACLE_ASSET_PLATFORM_SIMPLE;
  } else if (type == 2) {
    return PRICE_ORACLE_ASSET_PLATFORM_UNISWAP;
  }
  throw new Error('invalid price oracle asset platform');
}

export function byteArrayFromHex(s: string): ByteArray {
  if (s.length % 2 !== 0) {
    throw new TypeError('Hex string must have an even number of characters');
  }
  let out = new Uint8Array(s.length / 2);
  for (var i = 0; i < s.length; i += 2) {
    out[i / 2] = parseInt(s.substring(i, i + 2), 16) as u32;
  }
  return out as ByteArray;
}
