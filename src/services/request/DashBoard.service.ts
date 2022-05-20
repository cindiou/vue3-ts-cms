import Request from "../index";

enum DashBoardAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale",
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
