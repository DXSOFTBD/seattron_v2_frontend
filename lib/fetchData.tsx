import axios from '@/axios/config';

// Events handlers
export const upcomingEvents: any = async () => {
  const { data } = await axios.get('events/upcoming', {});

  return data.data;
};

export const featuredEvents: any = async () => {
  const { data } = await axios.get('events/upcoming');
  return data.data;
};
export const eventBySlug: any = async (slug: any) => {
  const { data } = await axios.get(`events/upcoming/${slug}`, {});

  return data.data;
};
export const PrivateEventBySlug: any = async (slug: any) => {

  const { data } = await axios.get(`events/private/upcoming/${slug}`, {});
  return data.data;
};
// past Events
export const pastEvents: any = async () => {
  const { data } = await axios.get('events/past', {});
  return data.data;
};
export const pastEventById: any = async (id: string) => {
  const { data } = await axios.get('events/past/' + id, {});
  return data.data;
};

