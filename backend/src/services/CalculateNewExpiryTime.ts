export default function calculateNewExpiryTime(h: number) {
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + h); // Assuming 1 hour expiry
  return currentTime;
}
