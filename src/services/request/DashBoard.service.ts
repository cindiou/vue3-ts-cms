import Request from "../index";

enum DashBoardAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale",

  goodsSaleTop10 = "/goods/sale/top10",
  amountList = "/goods/amount/list",
}

export function getGoodsCountRequest() {
  return Request.get({
    url: DashBoardAPI.categoryGoodsCount,
  });
}

export function getGoodsSaleRequest() {
  return Request.get({
    url: DashBoardAPI.categoryGoodSale,
  });
}

export function getGoodsFavorRequest() {
  return Request.get({
    url: DashBoardAPI.categoryGoodsFavor,
  });
}

export function getAddressSaleRequest() {
  return Request.get({
    url: DashBoardAPI.addressGoodsSale,
  });
}

export function getAmountList() {
  const res1 = Request.get({
    url: DashBoardAPI.amountList,
  });
  console.log("res1=", res1);
  return res1;
}

export function getGoodsSaleTop10() {
  const res2 = Request.get({
    url: DashBoardAPI.goodsSaleTop10,
  });
  console.log("res2=", res2);
  return res2;
}
