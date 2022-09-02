const Collection = require("../d_schemas/collection");
const User = require("../d_schemas/user")

class CollectionRepository {
  // user_id를 받아 작성된 모든 컬렉션 조회 (기본값 날짜 내림차순)
  getAllCollectionsByUserId = async (_id) => {
    const collections = await Collection.find({ user_id: _id }).sort({
      createdAt: -1,
    });

    return collections;
  };

  // category_id를 받아 작성된 모든 컬렉션 조회 (기본값 날짜 내림차순)
  getAllCollectionsByCategoryId = async (_id) => {
    const collections = await Collection.find({ category_id: _id }).sort({
      createdAt: -1,
    });

    return collections;
  };

  // 작성된 컬렉션 상세 조회
  getCollection = async (_id) => {
    const collection = await Collection.findOne({ _id: _id });

    return collection;
  };

  // 전달된 내용으로 새로운 컬렉션 생성. returns 작성한 컬렉션 정보
  createCollection = async (
    user_id,
    category_id,
    collectionTitle,
    description,
    videos,
    likes,
    createdAt
  ) => {
    const collection = await Collection.create({
      user_id,
      category_id,
      collectionTitle,
      description,
      videos,
      likes,
      createdAt,
    });
    return collection;
  };

  // _id에 해당하는 컬렉션 삭제. returns 삭제한 컬렉션 정보
  deleteCollection = async (_id) => {
    const deleteCollection = await Collection.deleteOne({ _id: _id });
    return deleteCollection;
  };

  // 유저가 보유한 좋아요 리스트
  getCollectionsByLikedArray = async (likeCollectionsArr) => {
    const allCollectionsUserLiked = await User.find({ likeCollectionsArr })
    return allCollectionsUserLiked;
  };

  // _id에 해당하는 컬렉션의 좋아요를 1개 올린다. return 좋아한 컬렉션의 현재 좋아요 수
  likeCollection = async (_id) => {
    const likeCollection = await Collection.findOneAndUpdate(
      { _id: _id },
      { $set: { likes: +1 } }
    );

    return likeCollection.likes;
  };

  // _id에 해당하는 컬렉션의 좋아요를 1개 내린다. returns 좋아요 취소한 컬렉션의 현재 좋아요 수
  disLikeCollection = async (_id) => {
    const disLikeCollection = await Collection.findOneAndUpdate(
      { _id: _id },
      { $set: { likes: -1 } }
    );
    return disLikeCollection.likes;
  };

  // 검색어에 맞는 컬렉션 리스트
  getCollectionsBySearch = async (keyword) => {
    const searchCollections = await Collection.find({
      $or: [
        { collectionTitle: new RegExp(keyword, "i") }, // 대소문자를 구분하지 않는 일치 i수행 옵션
        { description: new RegExp(keyword, "i") },
      ],
    });

    return searchCollections;
  };

  // 컬렉션에 영상 추가
  addVideoOnCollection = async () => {};
}

module.exports = CollectionRepository;
