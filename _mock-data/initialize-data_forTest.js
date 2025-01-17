const users = [
  {
    displayName: "Bohyeon Kim",
    email: "bohyeon.kim@creatrip.com",
    firstName: "Bohyeon",
    googleId: "100616319075678080000",
    lastName: "Kim",
    profilePicUrl: "https://lh3.googleusercontent.com/a/AItbvmkSJ_xTohZASxEYTNzTumaAkOEK36BQqs38Q60V=s96-c",
    myLikingCollectionsArr: [],
    myCollections: [],
    myInterestingCategories: [],
    myKeepingCollections: [],
    Followings: [],
  },
  {
    displayName: "Bohyeon Kim",
    email: "love.free.work@gmail.com",
    firstName: "Bohyeon",
    googleId: "114468525483681450000",
    lastName: "Kim",
    profilePicUrl: "https://lh3.googleusercontent.com/a/AItbvmmUdDch2QKNWgijUsMvskVPeT9WDqEiABVBdIme=s96-c",
    myLikingCollectionsArr: [],
    myCollections: [],
    myInterestingCategories: [],
    myKeepingCollections: [],
    Followings: [],
  },
  {
    displayName: "김승민",
    email: "apod123@naver.com",
    firstName: "승민",
    googleId: "116283305152524710000",
    lastName: "김",
    profilePicUrl: "https://lh3.googleusercontent.com/a/AItbvmm-deZJTslcxU7fDYb_sjfF4QzZVT2C6YXtsmc=s96-c",
    myLikingCollectionsArr: [],
    myCollections: [],
    myInterestingCategories: [],
    myKeepingCollections: [],
    Followings: [],
  },
  {
    displayName: "김혜미",
    email: "hemi33379@gmail.com",
    firstName: "혜미",
    googleId: "113490520324722500000",
    lastName: "김",
    profilePicUrl: "https://lh3.googleusercontent.com/a/AItbvml_ySVSzUsDoVOQmADwCbMTCR_8vtAgEGCmy0qy=s96-c",
    myLikingCollectionsArr: [],
    myCollections: [],
    myInterestingCategories: [],
    myKeepingCollections: [],
    Followings: [],
  },
  {
    displayName: "minji jeon",
    email: "minji799@gmail.com",
    firstName: "minji",
    googleId: "101016712867465310000",
    lastName: "jeon",
    profilePicUrl: "https://lh3.googleusercontent.com/a/AItbvml37SSBx3o0P6bj2LLaukBX_zF3g9AkxMShux70=s96-c",
    myLikingCollectionsArr: [],
    myCollections: [],
    myInterestingCategories: [],
    myKeepingCollections: [],
    Followings: [],
  },
  {
    displayName: "김보현",
    email: "bh.kim@nemolab.co.kr",
    firstName: "보현",
    googleId: "102769972251218740000",
    lastName: "김",
    profilePicUrl: "https://lh3.googleusercontent.com/a/AItbvmkN5T19KzoVP8PibD-oYmuumzRYetnovwkZqf_q=s96-c",
    myLikingCollectionsArr: [],
    myCollections: [],
    myInterestingCategories: [],
    myKeepingCollections: [],
    Followings: [],
  },
  {
    displayName: "Hyo c.",
    email: "0612hyo@gmail.com",
    firstName: "Hyo",
    googleId: "104694908366357950000",
    lastName: "c.",
    profilePicUrl: "https://lh3.googleusercontent.com/a-/AFdZucoR5PD1h8BTkMwTERbM8HoNXSfDLenrN0dttjGq=s96-c",
    myLikingCollectionsArr: [],
    myCollections: [],
    myInterestingCategories: [],
    myKeepingCollections: [],
    Followings: [],
  },
  {
    displayName: "지나(Gina)",
    email: "jinhahyung@gmail.com",
    firstName: "지나",
    googleId: "105043932044972690000",
    lastName: "",
    profilePicUrl: "https://lh3.googleusercontent.com/a/AItbvmmTDoFzhZMQ55PkxoR-b7IgOS_s4pgkNl2g0GAW=s96-c",
    myLikingCollectionsArr: [],
    myCollections: [],
    myInterestingCategories: [],
    myKeepingCollections: [],
    Followings: [],
  },
  {
    displayName: "Gginaa",
    email: "india.gginaa@gmail.com",
    firstName: "Gginaa",
    googleId: "114464190465489300000",
    lastName: "",
    profilePicUrl: "https://lh3.googleusercontent.com/a/ALm5wu2lrJJvv-ezQsed1o4nJZkizOBfS5dwXN72MpDN=s96-c",
    myLikingCollectionsArr: [],
    myCollections: [],
    myInterestingCategories: [],
    myKeepingCollections: [],
    Followings: [],
  },
];

const newVideosSources = [
  {
    keyword: "축구",
    addDescription: "재밌게 봐주세요.",
    category_id: "6319aeebd1e330e86bbade8f",
    howmanyVideos: 8,
  },
  {
    keyword: "NBA",
    addDescription: "모두 함께 해요.",
    category_id: "6319aeebd1e330e86bbade8f",
    howmanyVideos: 5,
  },
  {
    keyword: "BTS",
    addDescription: "댓글로 비슷한 영상 추천해주세요.",
    category_id: "6319aeebd1e330e86bbade9e",
    howmanyVideos: 4,
  },
  {
    keyword: "LofiHiphop",
    addDescription: "너무너무 좋아요",
    category_id: "6319aeebd1e330e86bbade9e",
    howmanyVideos: 9,
  },
  {
    keyword: "런닝맨",
    addDescription: "재미있어요.",
    category_id: "6319aeebd1e330e86bbade95",
    howmanyVideos: 8,
  },
  {
    keyword: "지구오락실",
    addDescription: "너무너무 재밌어요.",
    category_id: "6319aeebd1e330e86bbade95",
    howmanyVideos: 10,
  },
  {
    keyword: "토스PO",
    addDescription: "재밌게 봐주세요.",
    category_id: "6319aeebd1e330e86bbade80",
    howmanyVideos: 12,
  },
];

const commentsToInsert = [
  {
    comments: "또 들를게요!",
  },
  {
    comments: "너무너무 좋습니다.",
  },
  {
    comments: "이 컬렉션 좋습니다!",
  },
  {
    comments: "짱짱 튜닝 너무 좋네요",
  },
  {
    comments: "좋아요~~~",
  },
  {
    comments: "감성 터져요",
  },
  {
    comments: "좋아요~~",
  },
  {
    comments: "내 감성~~~ 우어우어",
  },
  {
    comments: "오 이런 컬렉션 좋은 것 같아요!!",
  },
  {
    comments: "오 이런 컬렉션도 좋은 것 같아요!!",
  },
  {
    comments: "진짜 좋아요 짱짱짱 !",
  },
  {
    comments: "퍼가요",
  },
  {
    comments: "오 짱!!",
  },
  {
    comments: "너무너무 좋습니다.",
  },
  {
    comments: "저도 이거 진짜 좋아하는데",
  },
  {
    comments: "딱 제스타일! 너무 좋아요. 퍼갑니다!",
  },
  {
    comments: "오",
  },
  {
    comments: "오오오오 딱 내가 찾던 컬렉션!",
  },
  {
    comments: "좋아요~~~",
  },
  {
    comments: "진짜 좋아요 짱짱짱 !",
  },
  {
    comments: "또 들를게요!",
  },
  {
    comments: "오오오오",
  },
  {
    comments: "짱짱 튜닝 너무 좋네요",
  },
  {
    comments: "오오오오",
  },
  {
    comments: "오오오오 딱 내가 찾던 컬렉션!",
  },
  {
    comments: "감성 터져요",
  },
  {
    comments: "오 이런 컬렉션 좋은 것 같아요!!",
  },
  {
    comments: "내 감성~~~ 우어우어",
  },
  {
    comments: "좋아요~~",
  },
  {
    comments: "이런 컬렉션 만들어주셔서 정말 감사합니다!!",
  },
  {
    comments: "이런 컬렉션 만들어주셔서 정말 감사합니다!!",
  },
  {
    comments: "딱 제스타일! 너무 좋아요. 퍼갑니다!",
  },
  {
    comments: "오",
  },
  {
    comments: "오 짱!!",
  },
  {
    comments: "또 들를게요!",
  },
  {
    comments: "퍼가요",
  },
  {
    comments: "너무너무 좋습니다.",
  },
  {
    comments: "좋아요~~~",
  },
  {
    comments: "저도 이거 진짜 좋아하는데",
  },
  {
    comments: "퍼가요",
  },
  {
    comments: "이 컬렉션 좋습니다!",
  },
  {
    comments: "담아갑니다",
  },
  {
    comments: "진짜 좋아요 짱짱짱 !",
  },
  {
    comments: "오 이런 컬렉션도 좋은 것 같아요!!",
  },
  {
    comments: "딱 내가 찾던 콜렉션이네요!",
  },
  {
    comments: "우와 눈물이 납니다. ㅠ",
  },
];

module.exports = {
  users,
  newVideosSources,
  commentsToInsert,
};
