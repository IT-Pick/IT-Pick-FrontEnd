import axios from 'axios';

export const editProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.patch('/user/profile-img', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};