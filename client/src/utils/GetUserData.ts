import axiosInstance from "./axios";

export default async function getProfileData(id: string) {
  try {
    const [profileData, matchHistory] = await Promise.all([
      axiosInstance.get(`/profile/${id}`),
      axiosInstance.get(`/matches/${id}`),
    ]);

    // Check for errors in profileData and matchHistory
    const hasProfileDataError = !!profileData.data.message;
    const hasMatchHistoryError = !!matchHistory.data.message;

    if (hasProfileDataError) {
      await axiosInstance.put(`/profile/${id}`);
    }

    if (hasMatchHistoryError) {
      await axiosInstance.put(`/matches/${id}`);
    }

    // Return the updated data using ternary operators to determine which needs to be refetched
    return {
      profileData: hasProfileDataError
        ? await axiosInstance.get(`/profile/${id}`)
        : profileData,
      matchHistory: hasMatchHistoryError
        ? await axiosInstance.get(`/matches/${id}`)
        : matchHistory,
    };
  } catch (error) {
    // Handle and propagate errors
    throw new Error("Failed to fetch profile and match data");
  }
}
