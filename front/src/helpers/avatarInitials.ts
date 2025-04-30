const getInitials = (name: string): string => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  const initials = parts.map((part) => part[0]).slice(0, 2).join('');
  return initials.toUpperCase();
};

export default getInitials;
