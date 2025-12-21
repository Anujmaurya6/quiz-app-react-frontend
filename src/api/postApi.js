const BASE_URL = "http://localhost:8080/posts";

const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const createPost = async (content) => {
  await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ content }),
  });
};

export const getMyPosts = async () => {
  const res = await fetch(`${BASE_URL}/my`, { headers: authHeader() });
  return res.json();
};

export const getOtherPosts = async () => {
  const res = await fetch(`${BASE_URL}/others`, { headers: authHeader() });
  return res.json();
};

export const getPendingPosts = async () => {
  const res = await fetch(`${BASE_URL}/pending`, { headers: authHeader() });
  return res.json();
};

export const approvePost = async (id) => {
  await fetch(`${BASE_URL}/approve/${id}`, {
    method: "PUT",
    headers: authHeader(),
  });
};

export const rejectPost = async (id) => {
  await fetch(`${BASE_URL}/reject/${id}`, {
    method: "PUT",
    headers: authHeader(),
  });
};
