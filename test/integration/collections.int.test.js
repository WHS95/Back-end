require("dotenv").config(); // 환경변수 적용
const request = require("supertest"); // http 요청을 보낼 수 있는 라이브러리
const app = require("../../app"); // app express 객체에 요청을 보냄

const { newVideosSources, commentsToInsert } = require("../../_mock-data/initialize-data_forTest.js");
const DatabaseInitializer = require("../../_mock-data/mockdata_initializer.js");
const databaseInitializer = new DatabaseInitializer();

const Collections = require("../../d_schemas/collection");
const Comments = require("../../d_schemas/comment");
const Videos = require("../../d_schemas/video");
const Users = require("../../d_schemas/user");
const authorizationCode =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2luIjp0cnVlLCJ1c2VyX2lkIjoiNjMyOTk0MDhmZDFkNmMyYWM0MWQ2NGM1IiwiaWF0IjoxNjYzODMxMzA5LCJleHAiOjE2NjM5MTc3MDl9.8jHH1MKclb1pW0vuvbbynM_47EQlrDsMbXqbk8Xd8pw";

// before All, DB 초기화 : 검증에 필요한 초기데이터를 DB에 넣고 시작
beforeAll(async () => {
  // 2. DB에 등록된 유저 아이디들을 가지고 컬렉션 목록 생성
  await databaseInitializer.createCollections(newVideosSources);
  // 3. Users_Comments_Collections
  await databaseInitializer.userCommentsOnCollections(commentsToInsert);
  // 4. Users_likes_Collections
  await databaseInitializer.userlikesCollections();
  // 5. Users_follows_Users
  await databaseInitializer.userfollowsUsers();
}, 100000);

// --------------- 여기서부터 검증(Test) 시작 -------------- //
describe("전체 통합테스트", () => {
  beforeEach(async () => {});

  it("24	PUT	/api/collections/:collection_id : 컬렉션 수정", async () => {
    // 내가 쓴 글의 id 하나를 찾는다.
    const { _id } = await Collections.findOne({ user_id: "63299408fd1d6c2ac41d64c5" });

    // 그 id로 API를 적용, 로그인 유저로 정보를 보내본다.
    const response = await request(app)
      .put(`/api/collections/${_id}`)
      .set("authorization", authorizationCode)
      .send({
        category_id: "6319aeebd1e330e86bbade88",
        collectionTitle: "mbti",
        description: "mbti 신기행짱",
        videos: ["5yiMd2lGQJo", "PmGs8I7qetY"],
      });

    // 바뀐 정보 확인
    const { collectionTitle } = await Collections.findOne({ user_id: "63299408fd1d6c2ac41d64c5" });

    expect(response.statusCode).toBe(200);
    expect(collectionTitle).toEqual("mbti");
  });

  it("25	PUT	/api/user/interest/:category_id : 관심사 등록 및 수정", async () => {
    // API에 경제, 게임, 교육의 카테고리 아이디 넣어줌, 로그인 유저로 정보를 보내본다.
    const response = await request(app)
      .put(`/api/user/interest/6319aeebd1e330e86bbade7c,6319aeebd1e330e86bbade7b,6319aeebd1e330e86bbade80`)
      .set("authorization", authorizationCode);

    // 바뀐 정보 확인
    const { myInterestingCategories } = await Users.findOne({ _id: "63299408fd1d6c2ac41d64c5" });

    expect(response.statusCode).toBe(200);
    expect(myInterestingCategories).toContain("6319aeebd1e330e86bbade7c");
  });

  it("26	GET	/api/user/interest : 내 관심사 리스트 확인", async () => {
    const response = await request(app).get("/api/user/interest").set("authorization", authorizationCode);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.categories[0].categoryName).toContain("게임");
  });

  it("27	DELETE	/api/user/interest/:category_id : 관심사 삭제", async () => {
    const response = await request(app)
      .delete("/api/user/interest/6319aeebd1e330e86bbade7c")
      .set("authorization", authorizationCode);

    // 바뀐 정보 확인
    const { myInterestingCategories } = await Users.findOne({ _id: "63299408fd1d6c2ac41d64c5" });

    expect(response.statusCode).toBe(200);
    expect(myInterestingCategories).not.toContain("6319aeebd1e330e86bbade7c");
  });

  it("28	PUT	/api/user/keep/:collection_id : 컬렉션 담기", async () => {
    // 내가 올린 거 아닌 컬렉션을 하나 선택
    const { _id } = await Collections.findOne({ $not: { user_id: "63299408fd1d6c2ac41d64c5" } });

    const response = await request(app).put(`/api/user/keep/${_id.toString()}`).set("authorization", authorizationCode);

    const { myKeepingCollections } = await Users.findOne({ _id: "63299408fd1d6c2ac41d64c5" });

    expect(response.statusCode).toBe(200);
    expect(myKeepingCollections[0] + "").toEqual(_id + "");
  });

  it("29	DELETE	/api/user/keep/:collection_id : 컬렉션 담기제외", async () => {
    const { myKeepingCollections } = await Users.findOne({ _id: "63299408fd1d6c2ac41d64c5" });
    const response = await request(app)
      .delete(`/api/user/keep/${myKeepingCollections[0]}`)
      .set("authorization", authorizationCode);

    const { myKeepingCollections: myKeepingCollections_after } = await Users.findOne({ _id: "63299408fd1d6c2ac41d64c5" });

    expect(response.statusCode).toBe(200);
    expect(myKeepingCollections_after).not.toContain(myKeepingCollections[0]);
  });

  it("30	GET	/api/user/keep : 내가 담은 컬렉션 확인 ", async () => {
    const response = await request(app).get("/api/user/keep").set("authorization", authorizationCode);
    expect(response.statusCode).toBe(200);
  });

  it("31	GET	/api/collections/whokeep/:collection_id : 이 컬렉션이 담긴 유저 확인", async () => {
    // 내가 올린 거 아닌 컬렉션을 하나 선택
    const { _id } = await Collections.findOne({ $not: { user_id: "63299408fd1d6c2ac41d64c5" } });
    const response = await request(app).get(`/api/collections/whokeep/${_id}`);

    expect(response.statusCode).toBe(200);
  });

  it("32	PUT	/api/user/follow/:user_id : 팔로우하기", async () => {
    const response = await request(app).put("/api/user/follow/6329191a69d8145d2cb4988a").set("authorization", authorizationCode);
    expect(response.statusCode).toBe(200);
  });

  it("33	GET	/api/user/follow/:user_id : 이 유저가 팔로우 하는 사람", async () => {
    const response = await request(app).get("/api/user/follow/6329191a69d8145d2cb4988a").set("authorization", authorizationCode);
    expect(response.statusCode).toBe(200);
  });

  it("34	POST	/api/collections/recommendation", async () => {
    const response = await request(app)
      .post("/api/collections/recommendation")
      .type("application/json")
      .send({ category_ids: ["6319aeebd1e330e86bbade7c", "6319aeebd1e330e86bbade7b"] });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(2);
  });

  it("35	DELETE	/api/collections/remove/:collection_id?video_id=", async () => {
    // 내가 쓴 글의 id 하나를 찾는다.
    const { _id, videos } = await Collections.findOne({ user_id: "63299408fd1d6c2ac41d64c5" });

    // 그 id로 API를 적용, 로그인 유저로 정보를 보내본다.
    const response = await request(app)
      .delete(`/api/collections/remove/${_id}?video_id=${videos[0]}`)
      .set("authorization", authorizationCode);

    const { videos: videos_after } = await Collections.findOne({ user_id: "63299408fd1d6c2ac41d64c5" });

    expect(response.statusCode).toBe(200);
    expect(videos_after[0]).not.toEqual(videos[0]);
  });
});

// 테스트가 끝난 후 데이터베이스 강제 초기화 (아무 데이터도 없는 상태로 만들기)
afterAll(async () => {
  await Collections.remove().catch((err) => console.log(err));
  await Comments.remove().catch((err) => console.log(err));
  await Videos.remove().catch((err) => console.log(err));

  const users = await Users.find();
  const user_ids = users.map((e) => e._id);
  for (let i = 0; i < user_ids.length; i++) {
    await Users.findOneAndUpdate(
      { _id: user_ids[i] },
      {
        $set: {
          myCollections: [],
          myKeepingCollections: [],
          myLikingCollections: [],
          myInterestingCategories: [],
          followings: [],
        },
      }
    );
  }
});
