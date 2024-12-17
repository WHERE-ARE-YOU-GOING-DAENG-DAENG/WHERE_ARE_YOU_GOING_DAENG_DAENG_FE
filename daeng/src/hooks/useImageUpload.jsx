import { useState } from "react";
import axios from "axios";

const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImageToS3 = async (file) => {
    setIsUploading(true);
    try {
      const presignResponse = await axios.post(
        "https://api.daengdaeng-where.link/api/v1/S3",
        {
          prefix: "PET",
          fileNames: [file.name],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const presignedUrl = presignResponse.data?.data?.[file.name];
      if (!presignedUrl) {
        throw new Error("Presigned URL을 가져오지 못했습니다.");
      }

      const response = await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status === 200) {
        return presignedUrl.split("?")[0];
      } else {
        throw new Error("이미지 업로드 실패");
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImageToS3, isUploading };
};

export default useImageUpload;
