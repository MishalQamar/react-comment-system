export const getInitials = (username: string): string => {
  return username.slice(0, 2).toUpperCase();
};
