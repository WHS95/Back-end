const User = require("../d_schemas/user");

class UsersRepository {
  // id로 유저 정보 조회
  getUserById = async (user_id) => {
    const returnUserInfo = await User.findOne({ _id: user_id });
    return returnUserInfo;
  };

  // 유저 삭제
  deleteUser = async (_id) => {
    const deletedUser = await User.destroy({ where: { _id } });
    return deletedUser;
  };

  updateUserInterest = async (user_id, myInterestingCategories) => {
    const updatedUser = await User.updateOne({ _id: user_id }, { myInterestingCategories });

    return updatedUser;
  };

  // 담기
  keepCollection = async (_id, myKeepingCollections) => {
    const updateDatail = await User.updateOne({ _id }, { myKeepingCollections });
    return updateDatail;
  };

  // 유저가 보유한 담기 리스트
  getCollectionsByKeepingArray = async (keepCollectionsArr) => {
    const allCollectionsUserKept = await User.find({ keepCollectionsArr });
    return allCollectionsUserKept;
  };

  // 좋아요
  likeCollection = async (user_id, collection_id) => {
    // 기존 likedArr 찾아서,
    const { myLikingCollections } = await User.findOne({ _id: user_id });

    // 새로 좋아한 컬렉션 하나 넣어서
    myLikingCollections.push(collection_id);

    // 업데이트
    const updatedDetail = await User.updateOne({ _id: user_id }, { myLikingCollections: myLikingCollections });
    return updatedDetail;
  };

  // 좋아요 취소
  disLikeCollection = async (user_id, collection_id) => {
    // 기존 likedArr 찾아서,
    const { myLikingCollections } = await User.findOne({ _id: user_id });

    // 새로 좋아한 컬렉션 하나 넣어서
    const filteredArr = myLikingCollections.filter((e) => e !== collection_id);

    // 업데이트
    const updatedDetail = await User.updateOne({ _id: user_id }, { myLikingCollections: filteredArr });
    return updatedDetail;
  };

  createMyCollection = async (user_id, collection_id) => {
    // 기존 likedArr 찾아서,
    const { myCollections } = await User.findOne({ _id: user_id });

    // 새로 생성한 컬렉션 하나 넣어서
    myCollections.push(collection_id);

    // 업데이트
    const updatedDetail = await User.updateOne({ _id: user_id }, { myCollections: myCollections });
    return updatedDetail;
  };

  //관심사 등록
  setInterestCategories = async (user_id, myInterestingCategories) => {
    const updatedInterest = await User.updateOne({ _id: user_id }, { myInterestingCategories });
    return updatedInterest;
  };

  deleteMyCollection = async (user_id, collection_id) => {
    // 기존 likedArr 찾아서,
    const { myCollections } = await User.findOne({ _id: user_id });

    // 새로 좋아한 컬렉션 하나 넣어서
    const filteredArr = myCollections.filter((e) => e !== collection_id);

    // 업데이트
    const updatedDetail = await User.updateOne({ _id: user_id }, { myCollections: filteredArr });
    return updatedDetail;
  };

  followUser = async (user_id, userToFollow) => {
    const { followings } = await User.findOne({ _id: user_id });
    followings.push(userToFollow.toString());

    // 업데이트
    const updatedDetail = await User.updateOne({ _id: user_id }, { followings });
    return updatedDetail;
  };

  unfollowUser = async (user_id, userToFollow) => {
    const { followings } = await User.findOne({ _id: user_id });

    // 새로 좋아한 컬렉션 하나 넣어서
    const filteredArr = followings.filter((e) => e !== userToFollow);

    // 업데이트
    const updatedDetail = await User.updateOne({ _id: user_id }, { followings: filteredArr });
    return updatedDetail;
  };

  // 유저가 보유한 좋아요 리스트
  getCollectionsByLikedArray = async (likeCollectionsArr) => {
    const allCollectionsUserLiked = await User.find({ likeCollectionsArr });
    return allCollectionsUserLiked;
  };
}

module.exports = UsersRepository;
