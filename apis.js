import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-evv6.onrender.com/api",
});

export const fetchArticles = (topic, sortBy, order) => {
  return newsApi
    .get("/articles", {
      params: { topic: topic, sort_by: sortBy, order: order },
    })
    .then((response) => {
      return response.data;
    });
};

export const fetchArticlesByTopic = (topic) => {
  return newsApi.get(`/articles?topic=${topic}`).then((response) => {
    return response.data;
  });
};

export const fetchUsers = () => {
  return newsApi.get("/users").then((response) => {
    return response.data;
  });
};

export const fetchTopics = () => {
  return newsApi.get("/topics").then((response) => {
    return response.data;
  });
};

export const fetchArticleById = (id) => {
  return newsApi.get(`/articles/${id}`).then((response) => {
    return response.data;
  });
};

export const fetchCommentsByArticleId = (id) => {
  return newsApi.get(`/articles/${id}/comments`).then((response) => {
    return response.data;
  });
};

export const changeVotesByArticleId = (id, increment) => {
  return newsApi
    .patch(`/articles/${id}`, {
      inc_votes: increment,
    })
    .then((response) => {
      return response.data;
    });
};

export const addNewCommentByArticleId = (id, newComment) => {
  return newsApi
    .post(`/articles/${id}/comments`, newComment)
    .then((response) => {
      return response.data;
    });
};

export const deleteCommentById = (id) => {
  return newsApi.delete(`/comments/${id}`).then((response) => {
    return response.data;
  });
};
