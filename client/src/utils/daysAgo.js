import { formatDistanceToNow } from "date-fns";

/**
 * Function to calculate how long ago a date was (e.g., "3 days ago", "2 months ago").
 * @param {Date} createdAt - The createdAt date from MongoDB.
 * @returns {string} A formatted string indicating how long ago the date was.
 */
const daysAgo = (createdAt) => {
  if (!createdAt) return "Invalid date";

  return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
};

export default daysAgo;
