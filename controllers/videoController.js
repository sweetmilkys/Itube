import { videos } from "../db";
import routers from "../routers";
import Video from "../models/Video";

export const home = async(req, res) => {
  try{
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch(error){
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: []});
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });


export const postUpload = async(req, res) => {
  const {
    body: { title, description },
    file:{ path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  res.redirect(routers.videoDetail(newVideo.id));
}

export const videoDetail = async(req, res) => {
  //console.log(req.params);
  const {
    params: { id }
  } = req;
  try{
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch(error) {
    console.log(error);
    res.redirect(routers.home);
  }
};

export const getEditVideo = async(req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routers.home);
  }
};

  export const postEditVideo = async(req, res) => {
    const {
      params: { id },
      body: { title, description }
    } = req;
    try {
      await Video.findByIdAndUpdate({ _id: id }, { title, description });
      res.redirect(routers.videoDetail(id));
    } catch (error) {
      console.log(error);
      res.redirect(routers.home);
    }
  };

export const deleteVideo = async(req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Video.findByIdAndDelete({_id: id});
  } catch (error) {
  }
  res.redirect(routers.home);
};
