const trimTrxId = (trxId: string) => {
  return trxId.slice(0, 10) + ". . ." + trxId.slice(trxId.length - 10);
};

export default trimTrxId;
