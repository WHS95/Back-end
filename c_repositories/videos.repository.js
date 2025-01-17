const Video = require("../d_schemas/video");
const axios = require("axios");

class VideoRepository {
  //비디오 조회
  getVideoById = async (_id) => {
    const thisVideo = await Video.findOne({ _id });
    return thisVideo;
  };

  //작성된 비디오들 조회
  getAllVideos = async (orderBy = "DESC") => {
    const allVideos = await Video.find({
      order: [["createdAt", orderBy]],
    });

    return allVideos;
  };

  //생성
  createVideo = async (videoId, videoTitle, category_id, channelTitle, channel_id, thumbnails) => {
    const createdVideo = await Video.create({
      videoId,
      videoTitle,
      category_id,
      channelTitle,
      channel_id,
      thumbnails,
    });

    return createdVideo;
  };

  createVideosByIds = async (videos) => {
    try {
      const axiosResult = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&part=snippet&regionCode=kr&id=${videos}`
      );

      const array = axiosResult.data.items.map((e) => {
        return {
          videoId: e.id,
          videoTitle: e.snippet.title,
          category_id: e.snippet.categoryId,
          channelTitle: e.snippet.channelTitle,
          channelId: e.snippet.channelId,
          thumbnails: e.snippet.thumbnails.medium.url,
          description: e.snippet.description ? e.snippet.description : "-",
        };
      });

      let returnArr = await Promise.all(
        array.map(async (e) => {
          const foundVideo = await Video.findOne({ videoId: e.videoId });
          if (foundVideo) {
            return foundVideo;
          } else {
            const createdVideo = await Video.create(e);
            return createdVideo;
          }
        })
      );

      console.log("returnArr", returnArr);
      return returnArr;
    } catch (err) {
      console.log(err);
    }
  };

  //수정
  // updateVideo = async (
  //   video_id,
  //   videoTitle,
  //   category_id,
  //   channelTitle,
  //   channel_id,
  //   thumbnails
  // ) => {
  //   const updatedVideo = await Video.updateOne(
  //     { _id: video_id },
  //     { $set:{videoTitle, category_id, channelTitle, thumbnails} }
  //
  //   );
  //   return updatedVideo;
  // };

  //삭제
  deleteVideo = async (_id) => {
    const deletedVideo = await Video.deleteOne({ _id: _id });

    return deletedVideo;
  };
}

module.exports = VideoRepository;
